import { IEquipment } from "./IEquipment";

export interface IBaseEquipment {
    [slotName: EquipmentSlot]: IEquipment;
}