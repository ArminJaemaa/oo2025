import { Administrator } from "./Administrator";

export type Word = {
    id: number;
    word: string;
    description: string;
    administrator: Administrator
}