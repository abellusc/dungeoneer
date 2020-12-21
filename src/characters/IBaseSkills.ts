export interface IBaseSkills {
    perception?: number; // perception / sight
    sleight?: number; // sleight of hand
    stealth?: number; // rolls against perception for being detected by an enemy
    investigation?: number; // used to check against dungeon clues, also gives a bonus to item discovery
    history?: number; // used to check history of items
    language?: number; // gives a bonus to language proficiency checks, but does not grant language proficiency itself (also buffs language learning speed)
}