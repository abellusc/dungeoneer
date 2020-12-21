import { EventEmitter } from 'events';
import { EquipmentManager } from '../managers/EquipmentManager';
import { StatManager } from '../managers/StatManager';
import { CombatManager } from '../managers/CombatManager';
import { BaseSkills } from './IBaseSkills';

export abstract class Creature extends EventEmitter implements ICreature {
    public metadata = {};

    constructor(private readonly opts: Partial<CreatureOptions>) {
        super();
        // @ts-ignore
        Object.keys(opts).forEach((k: string) => { this[k] = opts[k] });
    }

    static DEFAULT_OPTS: CreatureOptions = {
        health: 100,
        maxHealth: 100,
        stamina: 100,
        maxStamina: 100,
        isNPC: false,
        isKillable: false
    };

    // metadata getter
    getMetadata(propertyName: string): any {
        // @ts-ignore
        return this.metadata[propertyName];
    }

    setMetadata(propertyName: string, val: any): void {
        // @ts-ignore
        this.metdata[propertyName] = val;
    }

    getStatManager(): StatManager {
        throw new Error('Method not implemented.');
    }
    getEquipmentManager(): EquipmentManager {
        throw new Error('Method not implemented.');
    }
    getCombatManager(): CombatManager {
        throw new Error('Method not implemented.');
    }
    
}

export interface CreatureOptions {
    health: number;
    maxHealth: number;
    stamina: number;
    maxStamina: number;
    isNPC: boolean;
    isKillable: boolean;
    skills: BaseSkills;
    stats: BaseStats;
}

export interface ICreature {
    getStatManager(): StatManager;
    getEquipmentManager(): EquipmentManager;
    getCombatManager(): CombatManager;

    level(): number;

    meta: {
        [property: string]: any;
    },
    levels: {
        stats: {
            [statName: string]: number;
        }
        skills: {
            [skillName: string]: numbers;
        }
    }
}
