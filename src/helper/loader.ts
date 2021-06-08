
import { IParsersEnum, Parsers } from '../enum/parser.enum'
import { ILoader } from '../interfaces/user-info.interface';

export function getLoaderType(fileType: string, loader?: ILoader): Parsers {

    let matchFileType = fileType.substring(1);

    let parser = loader 
        ? loader[matchFileType] 
        : Object.values(Parsers)[Object.keys(Parsers).indexOf(matchFileType)];
    
    return IParsersEnum.parse(parser);
}


