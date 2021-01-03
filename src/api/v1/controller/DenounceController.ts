import { Denounces } from "../../../entity";
import { DenounceObject } from "../../../interfaces/entity/Interface";
import { BaseController } from "./AbstractBaseController";

export class DenounceController extends BaseController {
    entity: Denounces;

    constructor(data: DenounceObject) {
        super(new Denounces(data));
    }
}