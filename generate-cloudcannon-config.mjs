import { writeFile } from 'fs/promises';

export async function generateCloudCannonConfig(userInput) {
    const details = buildDetailsObject(userInput);
    // console.log(details);
    await writeFile('./_cloudcannon/config.json', JSON.stringify(userInput, null, 2));
}

function buildDetailsObject(userInput) {
    const keys = Object.keys(userInput);
    // console.log(keys)

    return {
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
}