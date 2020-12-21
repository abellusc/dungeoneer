import { Creature, ICreature } from './Creature';
import { INPC } from './INPC';

export abstract class BaseCharacter extends Creature implements INPC {

}

export interface IBaseCharacter extends ICreature {

}