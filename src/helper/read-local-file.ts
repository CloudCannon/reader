import { readFile } from 'fs/promises';

export async function readLocalJSONFile(file: string): Promise<any> {
    try {
        const contents = await readFile(file);
        return JSON.parse(contents.toString());
    }
    catch(error) {
        throw new Error(`${error}`);
    }
}
