import { DELETE, GET } from "./Http";
import { ref, set ,update } from "firebase/database";
import {app,dataApp} from "@/app/lib/firebase";
import {ApiResponse} from "@/app/service/module/Respons";
import {isArray} from "util";


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

        const res = await set(ref(dataApp,`${this.baseUrl}/${id}`), dataSend);
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

    public async limitToLast(limit:number):Promise<any> {

        const dataRef =await app.database().ref(`${this.baseUrl}`).limitToLast(limit);

        const snapshot = await dataRef.once('value');

        if (snapshot.exists() ) {
            const rawData = snapshot.val();
            const cleanedData = Object.values(rawData).filter((item): item is T => item !== null);

            return this.errorHandler(cleanedData);
        }else       console.log(`${this.baseUrl}`)

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