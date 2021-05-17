import { writeFile } from 'fs/promises';
import { readLocalFile } from './helper.mjs';

export async function generateCloudCannonConfig(userInput) {
    const details = buildConfigObject(userInput);
    await writeFile('./_cloudcannon/config.json', JSON.stringify(details, null, 2));
}

//TODO: Needs to change - path won't be this.
const packageJsonFile = await readLocalFile('../package.json');

//Still not convinced this is the way to go.
const defaultConfigObj = {
    time: new Date().toISOString(),
    cloudcannon: {
        name: packageJsonFile.name,
        version: packageJsonFile.version
    },
    source: '',
    timezone: 'Etc/UTC',
    'base-url': '',
    collections: {},
    comments: {},
    'input-options': {},
    editor: {},
    'source-editor': {},
    'array-structures': {},
    'select-data': {},
    paths: {
        uploads: '',
        data: '',
        pages: '',
        collections: '',
        includes: '',
        layouts: ''
    }
};

function buildConfigObject(userInput) {

    const result = {};

    const getNestedObject = (parentKey, valueObj) => {

        let newObject = {}
        for (const [key, value] of Object.entries(valueObj)) {
            newObject[key] = userInput?.[parentKey]?.[key] ?? defaultConfigObj?.[parentKey]?.[key]
        }
        return newObject
    }

    for (const [key, value] of Object.entries(defaultConfigObj)) {
        if(typeof value === 'object' && Object.keys(value).length != 0) {
            result[key] = getNestedObject(key, value)
        } else {
            result[key] = userInput[key] ?? defaultConfigObj[key];
        }
    }
    return result;
}