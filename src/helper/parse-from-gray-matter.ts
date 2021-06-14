import matter from 'gray-matter';
import { readFile } from 'fs/promises';

export async function parseFromGrayMatter(filePath: string): Promise<Object> {
        
        const readDataFile = await readFile(filePath, 'utf8');
        const frontMatter = matter(readDataFile);

        return frontMatter.data;

}