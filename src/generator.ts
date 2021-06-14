import { writeFile, readdir } from 'fs/promises';
import * as path from 'path';

import { Parsers } from './enum/parser.enum'
import { IUserInfo, ILoader } from './interfaces/user-info.interface';
import { IInfo, IGeneratedInfo } from './interfaces/info.interface'
import { readLocalJSONFile } from './helper/read-local-file';
import { parseFromGrayMatter } from './parse-from-gray-matter'; 
import { getUrlFromFrontMatter } from './url-builder';

import { getLoaderType } from './helper/loader';

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

// Does the stuff we don't want to think about
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

async function getCollections(userInput: IUserInfo): Promise<any> {
    const { collections: collectionsConfig } = userInput;
    // const collectionsConfig: any = {} 
    const keys = Object.keys(collectionsConfig);
    let collections: any = {}
    for (let key of keys) {
        
        // const collectionPath = collectionsConfig[key].path;
        let loader = collectionsConfig[key].loader || null;
        let collection = await getCollection(collectionsConfig[key], key, loader);
        collections[key] = collection;
    }
    return collections;
}

async function getCollection(collectionConfig: any, key: string, loader?: Parsers) {

    let files;
    let result: any = {}

    const defaultTheme = collectionConfig.default ?? null;
    
    try {
        files = await readdir(path.join('.', collectionConfig.path));

        result[key] = await Promise.all(files.map(async file => {
            const fileWithoutExtention = file.replace(/\.[^/.]+$/, "");
            if(fileWithoutExtention == defaultTheme) {
                return;
            }

            if(collectionConfig.default) {
                const defaultWithoutFileExtention = collectionConfig.default.replace(/\.[^/.]+$/, "")
                if(file === collectionConfig.default.replace(/\.[^/.]+$/, "") ) {
                }

            }
            const filePath = path.join('.', collectionConfig.path, file);
            const fileType = path.extname(filePath);
            const loaderType = getLoaderType(fileType, loader);
            
            const frontMatter = await returnFrontMatterFromLoaderType(loaderType, filePath);
            let url = getUrlFromFrontMatter(frontMatter, collectionConfig.url);

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


async function returnFrontMatterFromLoaderType(loaderType: string, filePath: string): Promise<any> {

    // TODO: Allow people to parse JSON, YAML and TOML
    switch(loaderType) {
        case Parsers.md:
            return await parseFromGrayMatter(filePath);
        case Parsers.html:
            return await parseFromGrayMatter(filePath);
    }
}

