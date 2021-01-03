import { Denunciators } from "../../../entity";
import { BaseController } from "./AbstractBaseController";
import { DenunciatorObject } from "../../../interfaces/entity/Interface";

export class DenunciatorController extends BaseController {
    entity: Denunciators;

    constructor(data: DenunciatorObject) {
        super(new Denunciators(data));
    }
}