import { ICollection } from './collections.interface';
import { IUserInfo } from './user-info.interface';

export interface IInfo extends IUserInfo, IGeneratedInfo {
    pages?: Array<object>;
    'static-pages'?: Array<object>;
    collections: Array<ICollection>
}

export interface IGeneratedInfo {
    time: String;
    cloudcannon: ICloudCannon;
}

interface ICloudCannon {
    name: String;
    version: String;
}
