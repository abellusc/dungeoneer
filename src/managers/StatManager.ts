import { Creature } from "../characters/Creature";

export class StatManager {
    constructor(private readonly base: Creature) {}

    get(name: string): number {
        return (this.base.opts as any)[name as string] as number;
    }

    set(name: string, val: number): void {
        (this.base.opts as any)[name as string] = val;
    }

    getStatBonus(level: number): number {
        if (level < 10) return 0;
        return Math.floor((level - 5) / 5);
    }
}