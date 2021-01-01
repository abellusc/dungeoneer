import { EffectDefinition } from "../effects/EffectDefinition";

export abstract class AbilityEffectDefinition extends EffectDefinition {
    constructor(protected readonly opts: IAbilityEffectDefinition) {
        super();
    }
}

export interface IAbilityEffectDefinition {
    opts: {
        name: string; // must be the same as what is used programatically
        label: string; // "friendly" name shown to the player in their character screen

        require_critical?: boolean;

        duration: number; // -1 is permanent, 0 will happen once and not persist, any other int will persist for that many turns AFTER the current turn (will release at end of that turn); 1 turn in combat = 1 minute out of combat
        frequency: number; // period between procs of this ability; 1 means 1 turn in-combat or 1 minutes out-of-combat
        max_procs: number; // 0 will never proc, -1 will proc infinitely

        poison?: number; // amount of bleed to apply 
        bleed?: number;
        health?: number; // amount to change health
        stamina?: number; // amount to change stamina
        mana?: number; // amount to change mana
        skills?: {
            [skillName: string]: number;
        };
        stats?: {
            [statName: string]: number;
        }

        max_stacks: number; // amount of stacks this ability can reach or -1 for infinite

        /**
         * formula to use for calculating damage for this ability
         * variables that will be replaced in this formula:
         * s = scaling multiplier
         * l = skill level
         * u = upgrade level for the ability
         * c = upgrade level for the catalyst being used (if applicable: a staff, wand, etc. being used to cast)
         */
        damage_formula: string;
    }
}

export enum ProcRule {
    PROC_ON_COMBAT_TURN,
    PROC_ON_COMBAT_END,
}
