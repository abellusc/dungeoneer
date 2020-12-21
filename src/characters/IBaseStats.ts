export interface IBaseStats {
    strength: number; // melee power
    dexterity: number; // finesse and ranged power
    agility: number; // movement speed
    charisma: number; // talky talk
    constitution: number; // health total
    endurance: number; // stamina total
    vitality: number; // armor/equipment carry weight - low vitality + high carry weight = high ratio = penalty to effective agility
    intelligence: number; // magic power
    spirit: number; // mana total
}
