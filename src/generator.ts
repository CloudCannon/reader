import { readdir } from 'fs/promises';
import * as path from 'path';

import { Parsers } from './enum/parser.enum'
import { IUserInfo } from './interfaces/user-info.interface';
import { IInfo, IGeneratedInfo } from './interfaces/info.interface'
import { parseFromGrayMatter } from './helper/parse-from-gray-matter'; 
import { getUrlFromFrontMatter } from './helper/url-builder';
const pkginfo = require('pkginfo')(module, 'version', 'name');

import { getLoaderType } from './helper/loader';

export async function buildObject(userInput: IUserInfo): Promise<IInfo> {

    let configObject: IInfo;
    let generatedInfo = await basicGeneratedInfo();
    let collections = await getCollections(userInput);

    configObject = {
        ...userInput, 
        ...generatedInfo, 
        collections: collections
    };
    return configObject;
}

async function basicGeneratedInfo(): Promise<IGeneratedInfo> {    
    return {
        time: new Date().toISOString(),
        cloudcannon: {
            name: module.exports.name,
            version: module.exports.version
        }
    }
}

async function getCollections(userInput: IUserInfo): Promise<any> {
    const { 'collections-config': collectionsConfig } = userInput;
    const keys = Object.keys(collectionsConfig);
    let collections: any = new Object();
    for (let key of keys) {
        
        let loader = collectionsConfig[key].loader || null;
        let collection = await getCollection(collectionsConfig[key], key, loader);
        collections[key] = collection;
    }
    return collections;
}

async function getCollection(collectionConfig: any, key: string, loader?: Parsers) {
    let files;
    let result;

    const defaultTheme = collectionConfig.default ?? null;
    
    try {
        files = await readdir(path.join('.', collectionConfig.path));

        result = await Promise.all(files.map(async file => {
            const fileWithoutExtention = file.replace(/\.[^/.]+$/, "");
            if(fileWithoutExtention === defaultTheme) {
                return;
            }

            const filePath = path.join('.', collectionConfig.path, file);
            const fileType = path.extname(filePath);
            const loaderType = getLoaderType(fileType, loader);
            const frontMatter = await returnFrontMatterFromLoaderType(loaderType, filePath);
            
            let url;
            if (typeof collectionConfig.url === 'function') {
                url = collectionConfig.url(filePath, frontMatter);
            } else {
                url = getUrlFromFrontMatter(frontMatter, collectionConfig.url);
            }

            return {
                ...frontMatter,
                path: filePath,
                collection: key,
                ext: fileType,
                url
                
            };
        }));
    } catch (e) {
        throw new Error(`${e}`)
    }
    return result?.filter((a: object) => !!a);
}


async function returnFrontMatterFromLoaderType(loaderType: string, filePath: string): Promise<any> {

    switch(loaderType) {
        case Parsers.md:
            return await parseFromGrayMatter(filePath);
        case Parsers.html:
            return await parseFromGrayMatter(filePath);
        case Parsers.toml:
            return await parseFromGrayMatter(filePath);
        case Parsers.yaml:
            return await parseFromGrayMatter(filePath);
        case Parsers.json:
            return await parseFromGrayMatter(filePath);
    }
}

