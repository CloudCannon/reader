import { readFile } from 'fs';
import { writeFile, readdir } from 'fs/promises';
import * as path from 'path';
import { readLocalFile } from './helper.mjs';

export async function generateCloudCannonDetails(userInput) {
    //TODO: Needs to change - path won't be this
    const packageJsonFile = await readLocalFile('../package.json');
    const collections = await getCollections(userInput.collections, userInput.loader);

    const details = {
        time: new Date().toISOString(),
        cloudcannon: {
            name: packageJsonFile.name,
            version: packageJsonFile.version
        },
        generator: userInput.generator ?? {},
        collections: collections,
        pages: [],
        static: []
    };

    await writeFile('./_cloudcannon/details.json', JSON.stringify(details, null, 2));
}

async function getCollections(collectionsConfig = {}, loader) {
    const keys = Object.keys(collectionsConfig);

    const result = {};
    for (const key of keys) {
        const files = await readdir(path.join('.', collectionsConfig[key].path));
        result[key] = files.map((file) => {
            const filePath = path.join('.', collectionsConfig[key].path, file);
            const fileType = path.extname(filePath);
            const loaderType = getLoaderType(loader, filePath);
            return {
                path: filePath,
                collection: key,
                ext: fileType,
                loader: loaderType
            };
        });
    }
    console.log(result)
    return result;
}

function getLoaderType(loader, filetype) {
    return "hello"
}