import {BaseService} from "@/app/service/BaseService";

import {Group} from "@/app/service/module/Group";
import {ApiResponse} from "@/app/service/module/Respons";
import {GET} from "@/app/service/Http";

export class GroupService extends BaseService<Group> {
    getBaseUrl(): string {
        return `group`;
    }

    public async getToken(
        id: number
    ): Promise<ApiResponse<any>> {
        const res = await GET(
            `group/${id}/auth`
        );
        return await this.errorHandler(res);
    }
}