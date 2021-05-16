#!/usr/bin/env node

import { generateCloudCannonConfig } from './generate-cloudcannon-config.mjs';
import { generateCloudCannonDetails } from './generate-cloudcannon-details.mjs';
import { readFile, mkdir } from 'fs/promises';

// import * as path from 'path';
// import { fileURLToPath } from 'url';
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

async function readUserInput(filePath) {
    const contents = await readFile(filePath);

    return JSON.parse(contents.toString());
}

const userInput = await readUserInput('.cloudcannon.json');

await mkdir('./_cloudcannon', { recursive: true });
await generateCloudCannonConfig(userInput);
await generateCloudCannonDetails(userInput);
