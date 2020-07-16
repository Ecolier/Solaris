import { Stranger } from "./stranger";

export interface User {
    username: string,
    latitude: number,
    longitude: number,
    hiddenFrom: Stranger[]
}