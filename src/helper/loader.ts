
import { IParsersEnum, Parsers } from '../enum/parser.enum'

function getLoaderFromFiletype(fileType: string): Parsers {
    let matchFileType = fileType.substring(1);

    // I'm sorry...
    const parser = Object.values(Parsers)[Object.keys(Parsers).indexOf(matchFileType)];
    return parser;
}

export function getLoaderType(fileType: string, loader?: string): Parsers {
    let parser;
    if(loader) {
        parser = Parsers[loader as keyof typeof Parsers];  
    } 
    if(!parser) {
        parser = getLoaderFromFiletype(fileType);
    }
    return IParsersEnum.parse(parser);
}


