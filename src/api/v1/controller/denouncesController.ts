import { 
    ErrorCodesModel, 
    DenunciatorModel, 
    DenouncesModel, 
    AddressModel 
} from "../models";

import { Log } from "../../../utils/log";
import { requestDenounce, responseDenounce } from "./interfaces";
import { address } from "../entity/interface";

export class DenounceController {
    logs: Log;
    addessModel: AddressModel;
    errorCodes: ErrorCodesModel;
    denunciatorModel: DenunciatorModel;
    denounceModel: DenouncesModel;

    constructor(){
        this.addessModel = new AddressModel();
        this.denunciatorModel = new DenunciatorModel();
        this.errorCodes = new ErrorCodesModel();
        this.denounceModel = new DenouncesModel();

        this.logs = new Log();
    }

    register = async (data: requestDenounce): Promise<responseDenounce> => {

        let { denunciator, denounces, latitude, longitude } = data;

        try {
            const denunciatorSave = this.denunciatorModel.save(denunciator),
                  denouncesSave = this.denounceModel.save(denounces);

            const address: address = {
                street: '',
                neightborhood: '',
                city: '',
                state: '',
                country: '',
                postal_code: ''
            }

            const addressSave = this.addessModel.save(address);

            // getAddressInformation();


            // const errorCodes = {};
        } catch (error) {
            // aqui vai uma função que trata o erro
            console.log(error);
        }
        // return { id: '1' }
        return 
    }
}