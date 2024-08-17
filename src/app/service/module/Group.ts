

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
    method:string
}