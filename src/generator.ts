import { writeFile, readdir } from 'fs/promises';
import * as path from 'path';

import { IParsersEnum, Parsers } from './enum/parser.enum'
import { IUserInfo, ILoader } from './interfaces/user-info.interface';
import { IInfo, IGeneratedInfo } from './interfaces/info.interface'
import { readLocalJSONFile } from './helper/read-local-file';
import { parseFromGrayMatter } from './parse-from-gray-matter'; 
import { userInfo } from 'os';

export async function buildObject(userInput: IUserInfo): Promise<IInfo> {

    // TODO: Validate the userInput object is correct..?? 
    let configObject: IInfo;
    let generatedInfo = await basicGeneratedInfo();
    let collections = await getCollections(userInput);

    configObject = {
        ...userInput, 
        ...generatedInfo, 
        ...collections
    };
    return configObject;
}

//Does the stuff we don't want to think about
async function basicGeneratedInfo(): Promise<IGeneratedInfo> {
    const packageJsonFile = await readLocalJSONFile('../package.json');

    return {
        time: new Date().toISOString(),
        cloudcannon: {
            name: packageJsonFile.name,
            version: packageJsonFile.version
        }
    }
}

async function getCollections(userInput: IUserInfo ): Promise<any> {
    const { loader, collections: collectionsConfig } = userInput;
    // const collectionsConfig: any = {} 
    const keys = Object.keys(collectionsConfig);

    let collections: any = {}
    for (let key of keys) {
        // const collectionPath = collectionsConfig[key].path;
        let collection = await getCollection(collectionsConfig[key], key, loader);
        collections[key] = collection;
    }
    return collections;
}

async function getCollection(collectionConfig: any, key: string, loader?: ILoader) {
    let files;

    let result: any = {}

    try {
        files = await readdir(path.join('.', collectionConfig.path));

        result[key] = await Promise.all(files.map(async file => {
    
            const filePath = path.join('.', collectionConfig.path, file);
            const fileType = path.extname(filePath);
            const loaderType = getLoaderType(fileType, loader);
            
            const frontMatter = await returnFrontMatterFromLoaderType(loaderType, filePath);
            let url = getUrlFromFrontMatter(frontMatter, filePath, collectionConfig.url);

            return {
                ...frontMatter,
                path: filePath,
                collection: key,
                ext: fileType,
                url
                
            };
        }));
    } catch (e) {
        //Should set up a better error catch
        console.log("error", e);
    }
    return result
}

function getLoaderType(fileType: string, loader?: ILoader): Parsers {

    let matchFileType = fileType.substring(1);
    let parser = loader ? loader[matchFileType] : Object.values(Parsers)[Object.keys(Parsers).indexOf(matchFileType)];

    // This will throw if the response is not in the IParserEnum. Would be a good one to test.
    return IParsersEnum.parse(parser);

}

async function returnFrontMatterFromLoaderType(loaderType: string, filePath: string): Promise<any> {
    let frontMatter: Object;

    // Could do this better? But currently it is really nice and readable.
    // This needs to be built out a bunch.. Need to get some more test collections..

    // TODO: Allow people to parse JSON, YAML and TOML
    switch(loaderType) {
        case Parsers.md:
            return await parseFromGrayMatter(filePath);
        case Parsers.html:
            return await parseFromGrayMatter(filePath);
    }
}

function getUrlFromFrontMatter(frontMatter: any, filePath: string, urlTemplate?: string): string {

    if(!urlTemplate) {
        return ""
    }

    if(!urlTemplate.includes(':')) {
        return urlTemplate;
    }

    //regex out the :things
    const urlVariableArray = urlTemplate.match(/:[^/:]+/g);

    let result: string;
    urlVariableArray?.forEach(url => {
        console.log(url)
        urlTemplate = urlTemplate?.replace(url, frontMatter[url] ?? "")
    })
    return urlTemplate.replace(/\/+/g, '/')
    // extract filter types and then do the thing.
    // :name - frontmater.name exists - if it does replace it with an empty string
    // Replace all '//' with '/'

}