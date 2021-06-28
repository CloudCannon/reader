import matter from 'gray-matter';
import { readFile } from 'fs/promises';
import toml from 'toml';
import path from 'path';

export async function parseFromGrayMatter(filePath: string): Promise<Object> {
    const readDataFile = await readFile(filePath, 'utf8');
    const fileExt = path.extname(filePath);
    
    if(fileExt === '.toml') {
        const file = matter(readDataFile, {
            engines: {
                toml: toml.parse.bind(toml)
            }
        });
        return file.data;
    }

    const frontMatter = matter(readDataFile);
    return frontMatter.data;
}