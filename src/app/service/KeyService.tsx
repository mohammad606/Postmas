import {BaseService} from "@/app/service/BaseService";



export class keyService extends BaseService<{ name:string,value:string }> {
    getBaseUrl(): string {
        return `group/${this.actor}/auth`;
    }

}