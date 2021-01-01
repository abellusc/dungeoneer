import { EventEmitter } from 'events';
import { EquipmentManager } from '../managers/EquipmentManager';
import { StatManager } from '../managers/StatManager';
import { CombatManager } from '../managers/CombatManager';
import { IBaseSkills } from './IBaseSkills';
import { IBaseStats } from './IBaseStats';
import _ from 'lodash';
import { Ability } from '../abilities/Ability';
import { IBaseEquipment } from '../equipment/IBaseEquipment';
import { AbilityManager } from '../managers/AbilityManager';

const DEFAULT_SKILL_LEVEL = 10;
const DEFAULT_STAT_LEVEL = 10;

export abstract class Creature extends EventEmitter implements ICreature {
    public metadata = {};
    public readonly opts: CreatureOptions;

    private readonly combatManager: CombatManager;
    private readonly abilityManager: AbilityManager;
    private readonly equipmentManager: EquipmentManager;
    private readonly statManager: StatManager;

    constructor(opts: Partial<CreatureOptions>) {
        super();
        
        this.opts = _.merge(_.merge({}, Creature.DEFAULT_OPTS), opts);

        this.combatManager = new CombatManager(this);
        this.abilityManager = new AbilityManager(this);
        this.equipmentManager = new EquipmentManager(this);
        this.statManager = new StatManager(this);
    }

    get level() {
        let lvl = 1;
        // stats
        for (let statName in this.opts.stats) {
            lvl += (this.opts.stats as any)[statName as string];
        }

        return lvl;
    }

    static DEFAULT_OPTS: CreatureOptions = {
        health: 100,
        maxHealth: 100,
        stamina: 100,
        maxStamina: 100,
        isNPC: false,
        isKillable: false,
        stats: {
            strength: DEFAULT_STAT_LEVEL, // melee power
            dexterity: DEFAULT_STAT_LEVEL, // finesse and ranged power
            agility: DEFAULT_STAT_LEVEL, // movement speed
            charisma: DEFAULT_STAT_LEVEL, // talky talk
            constitution: DEFAULT_STAT_LEVEL, // health total
            endurance: DEFAULT_STAT_LEVEL, // stamina total
            vitality: DEFAULT_STAT_LEVEL, // armor/equipment carry weight - low vitality + high carry weight = high ratio = penalty to effective agility
            intelligence: DEFAULT_STAT_LEVEL, // magic power
            spirit: DEFAULT_STAT_LEVEL, // mana total
        },
        skills: {
            perception: DEFAULT_SKILL_LEVEL, // perception / sight
            sleight: DEFAULT_SKILL_LEVEL, // sleight of hand
            stealth: DEFAULT_SKILL_LEVEL, // rolls against perception for being detected by an enemy
            investigation: DEFAULT_SKILL_LEVEL, // used to check against dungeon clues, also gives a bonus to item discovery
            history: DEFAULT_SKILL_LEVEL, // used to check history of items
            language: DEFAULT_SKILL_LEVEL, // gives a bonus to language proficiency checks, but does not grant language proficiency itself (also buffs language learning speed)
            athletics: DEFAULT_SKILL_LEVEL, // bonus to athletic feats
            medicine: DEFAULT_SKILL_LEVEL, // bonus to non-magical healing
            survival: DEFAULT_SKILL_LEVEL, // bonus to wilderness tasks
        },
        equipment: {
            head: null,
            chest: null,
            legs: null,
            feet: null,
            rings: [null,null,null,null],
            primary: null,
            secondary: null
        },
        abilities: []
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
        return this.statManager;
    }
    getEquipmentManager(): EquipmentManager {
        return this.equipmentManager;
    }
    getCombatManager(): CombatManager {
        return this.combatManager;
    }
    getAbilityManager(): AbilityManager {
        return this.abilityManager;
    }
    
}

export interface CreatureOptions {
    health: number;
    maxHealth: number;
    stamina: number;
    maxStamina: number;
    isNPC: boolean;
    isKillable: boolean;
    skills: IBaseSkills;
    stats: IBaseStats;
    equipment: IBaseEquipment;
    overrideLevel?: number;
    abilities: Ability[];
}

export interface ICreature {
    getStatManager(): StatManager;
    getEquipmentManager(): EquipmentManager;
    getCombatManager(): CombatManager;
    getAbilityManager(): AbilityManager;

    opts: CreatureOptions;

    metadata: {
        [property: string]: any;
    }
}
