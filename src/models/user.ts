import { Stranger } from "./stranger";

export interface User {
    username: string,
    password: string,
    latitude: number,
    longitude: number,
    hiddenFrom: Stranger[]
}