import { Logs } from "../entity"

export class Log {
    logs:Logs;

    constructor(){ 
        this.logs = new Logs(); 
    }

    sucess(): Error {
        return
    }
    error(){
        return
    }
}