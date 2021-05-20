import { writeFile, readdir } from 'fs/promises';
import * as path from 'path';

import { IParsersEnum, Parsers } from './enum/parser.enum'
import { IUserInfo, ILoader } from './interfaces/user-info.interface';
import { IInfo, IGeneratedInfo } from './interfaces/info.interface'
import { readLocalJSONFile } from './helper/read-local-file';
import { parseFromGrayMatter } from './parse-from-gray-matter'; 

export async function buildObject(userInput: IUserInfo): Promise<IInfo> {

    // TODO: Validate the userInput object is correct..?? 
    let configObject: IInfo;
    let generatedInfo = await basicGeneratedInfo();
    let collections = await getCollections(userInput.loader, userInput.collections);

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

async function getCollections(loader?: ILoader, collectionsConfig: any = {} ): Promise<any> {
    const keys = Object.keys(collectionsConfig);

    let collections: any = {}
    for (let key of keys) {
        const collectionPath = collectionsConfig[key].path;
        let collection = await getCollection(collectionPath, key, loader);
        collections[key] = collection;
    }
    return collections;
}

async function getCollection(collectionPath: string, key: string, loader?: ILoader) {
    let files;
    let result: any = {}

    try {
        files = await readdir(path.join('.', collectionPath));

        result[key] = await Promise.all(files.map(async file => {
    
            const filePath = path.join('.', collectionPath, file);
            const fileType = path.extname(filePath);
            const loaderType = getLoaderType(fileType, loader);
            
            let frontMatter = await returnFrontMatterFromLoaderType(loaderType, filePath)

            return {
                path: filePath,
                collection: key,
                ext: fileType,
                ...frontMatter
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
    switch(loaderType) {
        case Parsers.md:
                frontMatter = await parseFromGrayMatter(filePath);
            break;
        case Parsers.html:
            frontMatter = await parseFromGrayMatter(filePath);
            break;
    }
}
