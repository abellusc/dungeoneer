import { Creature, ICreature } from "../characters/Creature";
import { ScalingType } from "../scaling/ScalingType";
import { ITargetable } from "./ITargetable";

export abstract class Castable implements ICastable {
    abstract cast(caster: Creature, versus: ITargetable): Promise<CastResult>;
}

export interface ICastable {
    cast(caster: ICreature, versus: ITargetable): Promise<CastResult>;
}

export interface CastResult {
    attacker: ICreature;
    targets: ICreature[];
    ability: ICastable;
    result: {
        caster: {
            hit_rolls: number[];
            damage_rolls: number[];
            damage_dealt: number;
            isCritical: boolean;
        },
        targets: {
            [targetId: number]: {
                adjusted_rolls: number[];
                damage_taken: number;
                isDead: boolean;
                isDisabled: boolean;
                apply_effects: IAppliedAbilityAffect[]; // list of effect names 
            }
        }
    };
    totals: {
        caster: number[];
        targets: {
            [targetId: number]: number[];
        }
    }
    effects: {
        caster: IAppliedAbilityAffect;
        targets: {
            [targetId: number]: IAppliedAbilityAffect;
        }
    };
}

/**
 * An Ability Effect is the result of a successful cast. the damage has been dealt by this point, now additional long-term
 * effects can be applied like poison, etc. as an added bonus to a successful hit.
 * 
 * Some effect definitions will only be processed when there is a critical, as defined by the class
 */
export interface IAppliedAbilityAffect {
    name: string; // name of the ability so it can be found - must be the same as the ability effect name.
    args: [
        baseDamage: number, // to determine uh... base damage?...
        skillLevel: number, // to determine scaled damage
        isCritical: boolean, // scale up if critical; also used as activation criteria for some effects (only apply if crit happened)
    ];
}

export enum CombatRole {
    ATTACKER = 'attacker',
    TARGET = 'target',
    BLOCKER = 'blocker'
}

export interface RollResult {
    seed: number;
    faces: number;
    value: number;
}
