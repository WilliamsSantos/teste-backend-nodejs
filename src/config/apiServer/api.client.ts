import * as qs from "qs";
import { PathLike } from "fs";
import { Config } from "../../interfaces/apiService/Interface";
import { requestApiServiceConfig } from "../Configurations";

export const apiConfig: Config = {
    "returnRejectedPromiseOnError": true,
    "withCredentials": true,
    "timeout": requestApiServiceConfig.timeoutRequest,
    "baseURL": requestApiServiceConfig.baseURL,
    "headers": {
        "common": {
            "Cache-Control": "no-cache, no-store, must-revalidate",
            "Pragma": "no-cache",
            "Content-Type": requestApiServiceConfig.contentType,
            "Accept": requestApiServiceConfig.accept,
        },
    },
    "params": {
        "key": requestApiServiceConfig.key,
        "lng": 0,
        "lat": 0,
    },
    paramsSerializer: (params: PathLike) => qs.stringify(params, { indices: false }),
}
