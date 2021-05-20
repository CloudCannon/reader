import { writeFile, readdir } from 'fs/promises';
import * as path from 'path';
import { IParsersEnum, Parsers } from './enum/parser.enum'
import { IUserInfo, ILoader } from './interfaces/user-info.interface';
import { IInfo, IGeneratedInfo } from './interfaces/info.interface'
import { readLocalJSONFile } from './helper/read-local-file';
import { parseFromGrayMatter } from './parse-from-gray-matter'; 

let configObject: IInfo;

export async function generateInfo(userInput: IUserInfo): Promise<void> {

    const details = await buildObject(userInput);
    console.log(details)
    await writeFile('./_cloudcannon/info.json', JSON.stringify(details, null, 2));

}

async function buildObject(userInput: IUserInfo): Promise<IInfo> {

    // TODO: Validate the userInput object is correct

    // TODO: Generate the collections from the collections into collections config

    let generatedInfo = await basicGeneratedInfo();

    let collections = await getCollections(userInput.loader, userInput.collections);
    configObject = {...userInput, ...generatedInfo, ...collections};
    return configObject;
}


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
        // console.log(collection)
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
                let frontMatter;
                
                switch(loaderType) {
                    case Parsers.md:
                         frontMatter = await parseFromGrayMatter(filePath);
                        break;
                    case Parsers.html:
                        frontMatter = await parseFromGrayMatter(filePath);
                }
                return {
                    path: filePath,
                    collection: key,
                    ext: fileType,
                    loader: loaderType,
                    ...frontMatter
                };
            }));
        } catch (e) {
            console.log("error", e);
        }
        return result
    }

    function getLoaderType(fileType: string, loader?: ILoader): Parsers {

        let matchFileType = fileType.substring(1);
        let parser = loader ? loader[matchFileType] : Object.values(Parsers)[Object.keys(Parsers).indexOf(matchFileType)];

        return IParsersEnum.parse(parser);

    }

