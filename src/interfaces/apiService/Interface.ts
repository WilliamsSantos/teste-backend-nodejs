import { PathLike } from "fs";

export interface Config { 
    returnRejectedPromiseOnError: boolean; 
    withCredentials: boolean; 
    timeout: number; 
    baseURL: string; 
    headers: { 
        common: { 
            "Cache-Control": string; 
            Pragma: string; 
            "Content-Type": string; 
            Accept: string; 
        };
    }; 
    params: { 
        key: string; 
        lat: number, 
        lng: number 
    }; 
    paramsSerializer: (params: PathLike) => string; 
};

export interface AxiosFunction { 
    create?: Function; 
    default: Function; 
};

export interface ParamsItens {
    lat:number,
    lng:number
}