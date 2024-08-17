import { DELETE, GET } from "./Http";
import { ref, set ,update } from "firebase/database";
import {app,dataApp} from "@/app/lib/firebase";
import {ApiResponse} from "@/app/service/module/Respons";
import {isArray} from "util";
import {getCookieServer} from "@/app/actions/CookieServar";
import {apiData, Group} from "@/app/service/module/Group";


export class BaseService<T> {
    protected static instance?: BaseService<any>;
    public baseUrl = "/";

    constructor() {}

    public static make<Service extends BaseService<any>>(): Service {
        if (!this.instance) {
            this.instance = new this();
        }

        this.instance.baseUrl = this.instance.getBaseUrl();

        return this.instance as Service;
    }
    public getBaseUrl() {
        return "/";
    }



    //--------------------------
    public async ReadDataBase(): Promise<ApiResponse<T | null>> {

        try {
            const response = await GET(`${this.baseUrl}.json`);
            const cleanedData = isArray(response.data)? (response.data as (T | null)[]).filter(item => item !== null):response.data

            // @ts-ignore
            const res: ApiResponse<(T | null)[]> = {
                data: cleanedData,
                code:response.code,
                status: response.status,
                statusText: response.statusText,
                headers: response.headers,
                request: response.request,
                message:response.message
            };
            return this.errorHandler(res);
        } catch (error) {
            return this.errorHandler(error);
        }
    }

    public async store(id: number | string,dataSend:any): Promise<ApiResponse<T>> {
        const token = await getCookieServer('token');

        const res = await set(ref(dataApp,`${token}/${this.baseUrl}/${id}`), dataSend);
        return await this.errorHandler(res);
    }
    public async storeApi(idGroup: number | string,dataSend:any,idApi:number): Promise<ApiResponse<T>> {
        const token = await getCookieServer('token');

        const res = await set(ref(dataApp,`${token}/group/${idGroup}/${this.baseUrl}/${idApi}`), dataSend);
        return await this.errorHandler(res);
    }
    public async delete(id: number):  Promise<ApiResponse<T>> {

        try {
            const response = await DELETE(`${this.baseUrl}/${id}.json`);
            return this.errorHandler(response);
        } catch (error) {
            return this.errorHandler(error);
        }
    }

    public async update(id: number, dataSend: any):Promise<ApiResponse<T>> {

        const res = await update(ref(dataApp,`${this.baseUrl}/${id}`),dataSend)
        return await this.errorHandler(res);
    }

    public async limitToLast(limit:number,idGroup?:number):Promise<any> {
        const token = await getCookieServer('token');
        const url = this.baseUrl == "group" ? this.baseUrl :`/group/${idGroup}/api`
        const dataRef =await app.database().ref(`${token}/${url}`).limitToLast(limit);

        const snapshot = await dataRef.once('value');

        if (snapshot.exists() ) {
            const rawData: Group[] | apiData[] = snapshot.val();
            const cleanedData = Object.values(rawData).filter((item): item is T => item !== null);

            return this.errorHandler(cleanedData);
        }

    }

    // ---------------------------------------

    public async errorHandler(res: any): Promise<ApiResponse<T>>{
        if (res instanceof Error) {
            // Handle error
            throw res;
        }

        return res;
    }
}