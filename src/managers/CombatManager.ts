import { ICreature } from "../characters/Creature";

export class CombatManager {
    constructor(private readonly base: ICreature) {}

    // calculates damage against actual defense to determine the actual damage dealt to health
    // the difference of health is dealt as durability damage to the player which must be repaired
    calculateActualDamage(rawDamage: number): number {
        return 0;
    }

    applyDamage(actualDamage: number): void {
        const dmg = Math.abs(actualDamage);
        this.base.opts.health -= dmg;
    }
}
