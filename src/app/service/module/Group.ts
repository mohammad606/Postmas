

export interface Group {
    id:number
    name:string,
    api?:apiData[],
    type:string
}

export interface apiData{
    id:number,
    name:string,
    api:string,
    method:string,
    headers?:any
    group_id:number
    params:any
    auth_log?:boolean,
    auth?:string
    token?:string
    body:string

}