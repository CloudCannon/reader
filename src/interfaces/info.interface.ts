import { IUserInfo } from './user-info.interface';

export interface IInfo extends IUserInfo, IGeneratedInfo {
    pages?: Array<{}>;
    static?: Array<{}>;
    'collections-config'?: {};
}

export interface IGeneratedInfo {
    time: String;
    cloudcannon: ICloudCannon;
}

interface ICloudCannon {
    name: String;
    version: String;
}
