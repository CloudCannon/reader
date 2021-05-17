import { readFile } from 'fs/promises';

export async function readLocalFile(file) {
    const contents = await readFile(file);
    return JSON.parse(contents.toString());
}
