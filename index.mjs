#!/usr/bin/env node

// import { Command } from 'commander/esm.mjs';
// const program = new Command();
import { readFile, writeFile, mkdir, readdir } from 'fs/promises';

import * as path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function readUserInput(filePath) {
    const contents = await readFile(filePath);

    return JSON.parse(contents.toString());
}

const userInput = await readUserInput('.cloudcannon.json');

async function generateCloudCannonConfig(userInput) {
    const details = {
        time: new Date().toISOString(),
        cloudcannon: {
            //TODO: Get name and version from package.json file
            name: "ssg-reader",
            version: "0.0.1"
        },
        source: userInput.source ?? '',
        timezone: userInput.timezone ?? 'Etc/UTC',
        'base-url': userInput['base-url'] ?? '',
        collections: userInput.collections ?? {},
        comments: userInput.comments ?? {},
        'input-options': userInput['input-options'] ?? {},
        editor: userInput.editor ?? {},
        'source-editor': userInput['source-editor'] ?? {},
        paths: {
            uploads: userInput.paths?.uploads ?? '',
            data: userInput.paths?.data ?? '',
            pages: userInput.paths?.pages ?? '',
            collections: userInput.paths?.collections ?? '',
            includes: userInput.paths?.includes ?? '',
            layouts: userInput.paths?.layouts ?? ''
        },
        'array-structures': userInput['array-structures'] ?? {},
        'select-data': userInput['select-data'] ?? {}
    };

    await writeFile('./_cloudcannon/config.json', JSON.stringify(userInput, null, 2));
}

async function generateCloudCannonDetails(userInput) {
    const collections = await getCollections(userInput.collections);
    const details = {
        time: new Date().toISOString(),
        cloudcannon: {
            //TODO: Get name and version from package.json file
            name: "ssg-reader",
            version: "0.0.1"
        },
        generator: userInput.generator ?? {},
        collections: collections,
        pages: [],
        static: []
    };

    await writeFile('./_cloudcannon/details.json', JSON.stringify(details, null, 2));
}


async function getCollections(collectionsConfig = {}) {
    const keys = Object.keys(collectionsConfig);
    // "drafts": [{"path": "_drafts/incomplete.md","url": "/business/2016/08/10/incomplete.html","collection": "posts","id": "/business/2016/08/10/incomplete","draft": true,"categories": ["Business"],"title": "WIP","date": "2016-08-10 00:00:00 +0000","tags": ["hello"],"author_staff_member": "jane-doe","image": null,"large_header": false,"slug": "incomplete","ext": ".md"},{"path": "other/_drafts/testing-for-category.md","url": "/other/business/2021/02/22/testing-for-category.html","collection": "posts","id": "/other/business/2021/02/22/testing-for-category","draft": true,"categories": ["other","Business"],"title": "Testing for category drafts","tags": ["hello"],"author_staff_member": "jane-doe","image": "https://unsplash.it/600/450?image=737&a=.png","large_header": false,"slug": "testing-for-category","ext": ".md","date": "2021-02-22 02:04:29 +0000"}],"posts": [{"path": "_posts/2016-08-10-business-mergers.md","url": "/business/2016/08/10/business-mergers.html","collection": "posts","id": "/business/2016/08/10/business-mergers","draft": false,"categories": ["Business"],"title": "Business Mergers","date": "2016-08-10 00:00:00 +0000","tags": ["hello"],"author_staff_member": "jane-doe","image": "https://unsplash.it/600/450?image=737&a=.png","large_header": false,"slug": "business-mergers","ext": ".md"},{"path": "_posts/2016-11-11-real-estate-flipping.md","url": "/property/2016/11/11/real-estate-flipping.html","collection": "posts","id": "/property/2016/11/11/real-estate-flipping","draft": false,"categories": ["Property"],"title": "Real Estate Flipping","date": "2016-11-11 00:00:00 +0000","tags": ["hi"],"author_staff_member": "john-doe","image": "https://unsplash.it/600/450?image=448&a=.png","large_header": false,"slug": "real-estate-flipping","ext": ".md"},{"path": "other/_posts/2020-08-10-category-test.md","url": "/other/business/2020/08/10/category-test.html","collection": "posts","id": "/other/business/2020/08/10/category-test","draft": false,"categories": ["other","Business"],"title": "Category test","tags": ["hello"],"author_staff_member": "jane-doe","image": "https://unsplash.it/600/450?image=737&a=.png","large_header": false,"date": "2020-08-10 00:00:00 +0000","slug": "category-test","ext": ".md"}]},

    const result = {};
    
    for (const key of keys) {
        const files = await readdir(path.join('.', collectionsConfig[key].path));
        result[key] = files.map((file) => {
            return {
                path: path.join('.', collectionsConfig[key].path, file),
                collection: key
            };
        });
    }
    return result;
}

await mkdir('./_cloudcannon', { recursive: true });
await generateCloudCannonConfig(userInput);
await generateCloudCannonDetails(userInput);
