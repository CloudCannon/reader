#!/usr/bin/env node

import { mkdir, writeFile } from 'fs/promises';

import { buildObject } from './generator';
import { readLocalJSONFile } from './helper/read-local-file';
import { IUserInfo } from './interfaces/user-info.interface';

//This file now creates and saves the info files.
async function start(): Promise<void> {
    const userInput: IUserInfo = await readLocalJSONFile('.cloudcannon.json');
    const details = await buildObject(userInput);

    await mkdir('./_cloudcannon', { recursive: true });
    await writeFile('./_cloudcannon/info.json', JSON.stringify(details, null, 2));
}

start();
