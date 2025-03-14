import { competitor } from "./competitor";
import { events } from "./events";

export type result = {
    id: number;
    event: events;
    competitor: competitor;
    result: number;
}