import { Creature } from "../characters/Creature";

export class EquipmentManager {
    constructor(private readonly base: Creature) {}

    get(name: string): number {
        return (this.base.opts as any)[name as string] as number;
    }

    set(name: string, val: number): void {
        (this.base.opts as any)[name as string] = val;
    }

    // mechanically, higher poise means higher chance of deflection
    // this is only activated when there is a hit - poise can reduce it to a deflection, but never a miss
    getTotalPoise(): number {
        let poise = 0;
        for (const key in Object.keys(this.base.opts.equipment)) {
            poise += (!!(this.base.opts.equipment as any)[key as string] ? (this.base.opts.equipment as any)[key as string] : 0);
        }

        return poise;
    }
}