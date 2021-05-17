#!/usr/bin/env node

import { generateCloudCannonConfig } from './generate-cloudcannon-config.mjs';
import { generateCloudCannonDetails } from './generate-cloudcannon-details.mjs';
import { readLocalFile } from './helper.mjs';
import { mkdir } from 'fs/promises';

const userInput = await readLocalFile('.cloudcannon.json');

await mkdir('./_cloudcannon', { recursive: true });
await generateCloudCannonConfig(userInput);
await generateCloudCannonDetails(userInput);
