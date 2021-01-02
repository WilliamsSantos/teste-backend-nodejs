import { address, denounce, denounciator } from "../../../entity/Interface";

export interface requestDenounce {
    latitude: number,
    longitude: number,
    denunciator: denounciator,
    denounces: denounce
}

export interface responseDenounce {
    id: number,
    latitude: number,
    longitude: number,
    denunciator: denounciator,
    denounces: denounce,
    address: address
}