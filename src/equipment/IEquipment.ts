import { Ability, AbilityOptions } from "../abilities/Ability";
import { ScalingType } from "../scaling/ScalingType";
import { EquipmentSlot } from "./EquipmentSlot";

export interface IEquipment {
    name: string;
    slot: EquipmentSlot;
    type: WeaponType;
    baseDamage: number;
    scaling: {
        [skillName: string]: ScalingType;
    };
    weight: number;
    durability: number;
    maxDurability: number;
    poise: number; // resistance to being hit
    abilities: EquipmentAbility[];
    upgrades: {
        [upgradeNumber: number]: {
            baseDamageModifier?: number;
            scalingModifier?: {
                [skillName: string]: ScalingType;
            };
            durabilityModifier?: number;
            weightModifier?: number;
        };
    }
}

export class EquipmentAbility extends Ability {
    
}


export enum WeaponType {
    DAGGER = 'dagger',
    SHORTSWORD = 'shortsword',
    LONGSWORD = 'longsword',
    GREATSWORD = 'greatsword',
    ULTRA_GREATSWORD = 'greatsword_ultra',
    AXE = 'axe',
    GREAT_AXE = 'greataxe',
    HAMMER = 'hammer',
    GREAT_HAMMER = 'great_hammer',
    STAFF = 'staff',
    BOW = 'bow',
    CROSSBOW = 'crossbow',
    SHIELD = 'shield',
    GREATSHIELD = 'greatshield'
}
