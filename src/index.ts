#!/usr/bin/env node

import { mkdir, readFile } from 'fs/promises';
import { userInfo } from 'os';
import { generateInfo } from './generateInfo';
import { readLocalJSONFile } from './helper/read-local-file'

import { IUserInfo } from './interfaces/user-info.interface';

async function start(): Promise<void> {
    const userInput: IUserInfo = await readLocalJSONFile('.cloudcannon.json');
    
    await mkdir('./_cloudcannon', { recursive: true });
    await generateInfo(userInput)
}

start();
