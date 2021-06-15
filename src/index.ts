#!/usr/bin/env node

import { mkdir, writeFile } from 'fs/promises';
import { buildObject } from './generator';
import { cosmiconfig } from 'cosmiconfig';

//This file now creates and saves the info files.
async function start(): Promise<void> {
    let details;
    const moduleName = 'cloudcannon';
    const explorer = cosmiconfig(moduleName);

    let configFile = await explorer.search()

    if(configFile) {

        try {
            details = await buildObject(configFile.config.cloudcannonConfig);
            await mkdir('./_cloudcannon', { recursive: true });
            await writeFile('./_cloudcannon/info.json', JSON.stringify(details, null, 2));
        } catch(error) {
            throw new Error(`${error}`)
        }
    }
    else {
        throw new Error("can not find config file")

    }
}

start();
