import { 
    ErrorCodesModel, 
    DenunciatorModel, 
    DenouncesModel, 
    AddressModel 
} from "../models";

import { Log } from "../../../utils/log";
import { requestDenounce, responseDenounce } from "./interfaces";

export class DenounceController {
    logs: Log;
    address: AddressModel;
    errorCodes: ErrorCodesModel;
    denunciatorModel: DenunciatorModel;
    denounceModel: DenouncesModel;

    constructor(){
        this.address = new AddressModel();
        this.denunciatorModel = new DenunciatorModel();
        this.errorCodes = new ErrorCodesModel();
        this.denounceModel = new DenouncesModel();

        this.logs = new Log();
    }

    register = async (data: requestDenounce): Promise<responseDenounce> => {

        let { denunciator, denounces, latitude, longitude } = data;

        try {
            const denunciatorSave = this.denunciatorModel.save(denunciator); 
            const denouncesSave = this.denounceModel.save(denounces);
            
            // getAddressInformation();

            // const address = {};

            // const errorCodes = {};
        } catch (error) {
            // aqui vai uma função que trata o erro
            console.log(error);
        }
        // return { id: '1' }
        return 
    }
}