import {BaseService} from "@/app/service/BaseService";

import {Group} from "@/app/service/module/Group";

export class GroupService extends BaseService<Group> {
    getBaseUrl(): string {
        return `group`;
    }

}