import { ScalingConstants, ScalingType } from "../scaling/ScalingType";
import _ from 'lodash';
import { Castable, CastResult, IAppliedAbilityAffect } from "./Castable";
import { Creature, ICreature } from "../characters/Creature";
import { IAbilityEffectDefinition } from "./AbilityEffectDefinition";

export interface AbilityOptions {
    safeId: string;
    name: string;
    targeting_range: number | null;
    targeting_type: 'self' | 'friendly' | 'hostile' | 'anyone'; // 'ally' works for self too; 'anyone' also includes neutrals (which usually shouldn't be attacked! but can be.......)
    target_limit: number;
    baseValue: any; // damage or heals - base input to be scaled up
    manaCost?: {
        type: 'percentage' | 'fixed';
        value: number;
    };
    scaling: {
        [skill: string]: ScalingType;
    }
    staminaCost?: {
        type: 'percentage' | 'fixed',
        value: number;
    };
    diceOptions: {
        stat: string; // can be the name of a supported skill or stat 'strength', 'defense', 'sleight' etc
        amount: number; // the number of dice to roll (5d6 means 5 dice with 6 fs) >= 1
        faces: number;  // the number of faces of each dice >= 4
        versusStat: string;
    };
    effects?: IAppliedAbilityAffect[]; // names of ability effect definitions
}

type AbilityOptionsKeys = keyof AbilityOptions;

const DEFAULT_ABILITY_OPTS: AbilityOptions = {
    safeId: 'unnamed-ability',
    name: 'Unnamed Ability',
    targeting_range: null, // self cast only
    targeting_type: 'self',
    target_limit: 1,
    baseValue: 0,
    manaCost: {
        type: 'fixed',
        value: 0,
    },
    staminaCost: {
        type: 'fixed',
        value: 1,
    },
    diceOptions: {
        stat: 'unknown',
        amount: 1,
        faces: 20,
        versusStat: 'unknown',
    },
    scaling: {}
}

export class Ability extends Castable {
    readonly opts: AbilityOptions | null = null;
    readonly name: string;
    constructor(name: string, opts: Partial<AbilityOptions>, protected readonly creature: Creature) {
        super();

        const options = _.merge(_.merge({}, DEFAULT_ABILITY_OPTS), {
            ...opts,
            safeId: opts.safeId ? Ability.cleanSafeId(opts.safeId) : undefined
        });

        if (Ability.validateOpts(options))
            this.opts = options;
        this.name = name;

        if (!this.opts) {
            throw new Error('invalid options passed to ability: ' + this.name)
        }
    }

    static cleanSafeId(str: string): string {
        return str
            .trim()
            .replace('\w', '-')
            .toLowerCase()
    }

    static validateOpts(options: any): boolean {
        if (!options) return false;

        const keys = Object.keys(options);
        for (const key in DEFAULT_ABILITY_OPTS) {
            if (!keys.includes(key))
                throw new ReferenceError(`Ability option ${key} not found in configuration for ability: ${this.name}`)

            if (typeof (keys as any)[key] !== typeof (DEFAULT_ABILITY_OPTS as any)[key])
                throw new TypeError(`Ability option ${key} does not match type required. ${typeof (keys as any)[key]} != ${(DEFAULT_ABILITY_OPTS as any)[key]}`)
        }

        return true;
    }

    private rollDie(faces: number): number {
        return Math.floor(Math.random() * faces) + 1;
    }

    async cast(caster: Creature, ...targets: Creature[]): Promise<CastResult> {
        // Perform initial rolls
        // let totalPossible = Math.floor(this.opts!.diceOptions.amount * this.opts!.diceOptions.faces);
        let casterRolls = [];
        let casterTotal = 0;

        let targetRolls: { [idx: number]: number } = {};
        let targetTotals: number[] = [];

        // process all rolling up front
        for (let i = 0; i < this.opts!.diceOptions.amount; i++) {
            // caster rolls
            const c_roll = this.rollDie(this.opts!.diceOptions.faces);
            casterTotal += c_roll;

            // target rolls
            for (let j = 0; j < targets.length - 1; j++) {
                const t_roll = this.rollDie(this.opts!.diceOptions.faces);
                targetTotals.push(t_roll);
                if (!targetRolls[j]) {
                    targetRolls[j] = 0;
                }

                targetRolls[j] += t_roll;

                // apply bonuses from stats
                targetRolls[j] += targets[j].getStatManager().getStatBonus(targets[j].getStatManager().get(this.opts!.diceOptions.stat));
            }

            casterRolls.push(c_roll);
        }

        // v1: scale up with stats
        // for (let scalingOption in this.opts!.scaling) {
        //     if (this.opts!.scaling[scalingOption] === ScalingType.RAW) continue;
        //     casterRolls = casterRolls.map((val: number) => Math.floor(val * (ScalingConstants as any)[this.opts!.scaling[scalingOption]]));
        // }

        // v2: scale up with stats
        // TODO


        // calculate damage
        const diffs = Object.keys(targetTotals).map(k => ((targetTotals as number[])[(k as any)] as number) - casterTotal);

        // commit effects and stuff - apply damage
        const hits = targetTotals.filter((t,i) => t < casterTotal)
        const damages: number[] = [];
        let totalDamage = 0;
        
        hits.forEach((val: number, idx: number) => {
            try {
            // TODO: combat manager deals with this
                const targ = targets[idx];
                const adjustedDamage = this.opts!.baseValue + (this.creature.getStatManager().get(this.opts!.diceOptions.stat) * ScalingConstants[this.opts!.scaling[this.opts!.diceOptions.stat]]);
                const actualDamage = this.creature.getCombatManager().calculateActualDamage(adjustedDamage);
                damages.push(actualDamage);
                totalDamage += actualDamage;
                targ.getCombatManager().applyDamage(actualDamage);
            } catch {

            }
             // commits damage
        }); // clean hits which deal damage

        const misses = targetTotals.filter(t => t >= casterTotal);
        
        misses.forEach((val: number, idx: number) => {
            // TODO: combat manager deals with this
        }); // misses (>) and deflections (=)

        // report results once commits are done
        return {
            ability: this,
            attacker: caster,
            targets: targets,
            result: {
                caster: {
                    hit_rolls: hits,
                    damage_rolls: damages,
                    damage_dealt: totalDamage,
                    isCritical: false, // TODO: implement critical hits for abilities
                },
                targets: {

                },
            },
            totals: {
                caster: [],
                targets: {

                }
            },
            effects: {
                caster: {
                    name: 'test',
                    args: [
                        1,
                        0,
                        false, // TODO: implement passing an ability crit down to effect crit
                    ]
                },
                targets: [], // TODO: implement effects -> target (this is used to update the character)
            }
        }
    }
}
