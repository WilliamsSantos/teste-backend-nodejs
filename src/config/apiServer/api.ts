import * as Axios from "axios";
import { log } from "../../utils/Util";
import { apiConfig } from "./api.client";
import { Config, ParamsItens } from "../../interfaces/apiService/Interface";

export class ApiService {
    axios
    config: Config;

    constructor() {
        this.axios = Axios.default;
        this.setConfig();
    }

    setParams(params: ParamsItens = { lat: 0, lng: 0 }): void {
        Object.keys(params).forEach(item => {
            this.config.params[item] = params[item];
        })
    }

    async get(params: ParamsItens = { lat: 0, lng: 0 }) {
        try {
            this.setParams(params);

            const response = await this.axios.create(this.config).get();

            return response.status != 200
                ? this.errorResponseTreatment(response)
                : response.data;

        } catch (error) {
            return error;
        }
    }

    errorResponseTreatment(error: Error): Error {
        log('error', `Error in GeoController: ${error.message}`);
        throw error;
    }

    setConfig(): void {
        this.config = apiConfig;
    }
}