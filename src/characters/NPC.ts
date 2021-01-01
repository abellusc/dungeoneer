import { Creature, CreatureOptions } from "./Creature";

export interface INPC {
    name: string;
    title?: string;
    isNPC: true;
}

export class NPC extends Creature implements INPC {
    isNPC: true = true;
    constructor(readonly name: string, opts: CreatureOptions) {
        super({
            ...opts,
            isNPC: true,
        })
    }
}
