import { Creature, CreatureOptions, ICreature } from './Creature';

export abstract class BaseCharacter extends Creature {
    reputations = {};
    constructor(readonly name: string, opts: CreatureOptions) {
        super(opts);
    }
}

export interface IBaseCharacter extends ICreature {
    name: string;
    reputations: {
        [factionId: string]: number;
    }
}