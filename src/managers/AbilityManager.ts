import { IAbilityEffectDefinition } from "../abilities/AbilityEffectDefinition";
import { ICreature } from "../characters/Creature";

export class AbilityManager implements IAbilityManager {
    constructor(private readonly base: ICreature) {}

    getEffect(name: string): IAbilityEffectDefinition {
        
    }
}

export interface IAbilityManager {

}
