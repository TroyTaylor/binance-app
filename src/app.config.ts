import { InjectionToken } from '@angular/core';

export let APP_CONFIG = new InjectionToken('app.config');

export interface IAppConfig {
    apiEndpoint: string;
}

export const TagVal_AppConfig: IAppConfig = {
    //apiEndpoint: process.env.API_URL,
    apiEndpoint: 'fdz',
};
