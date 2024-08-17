import {BaseService} from "@/app/service/BaseService";

import {apiData} from "@/app/service/module/Group";


export class ApiService extends BaseService<apiData> {
    getBaseUrl(): string {
        return `api`;
    }

}