import EquipParamWeapon from '@/data/weapons/EquipParamWeapon.json'

/**
 * Returns an object with stat requirements for each main stat (Strength, Dexterity, Intelligence, Faith. Arcane) 
 * Uses the weaponID + Affinity as key for lookup in EquipParamWeapon
 * @param weaponData - Weapon data from the weapon object
 * @param affinity - Affinity of the weapon
 * @returns - Object with stat requirements for each main stat
 */
export default function getWeaponStatRequirements(weaponData: any, affinity: number) {
  // Typing for lookup table
  const EquipParamWeaponData: EquipParamWeapon[] = EquipParamWeapon as EquipParamWeapon[]

  if(!weaponData || affinity === null || !EquipParamWeaponData) { 
    console.log("Missing data")
    return null
  }

  // Format lookup ID from parameters
  const lookupId = weaponData.id + affinity

  // Weapon Params from Lookup
  const weaponParams: EquipParamWeapon | undefined = EquipParamWeaponData.find((item) => item.ID === lookupId)

  if (!weaponParams) { 
    console.log("weaponParams not found")
    return null
  }

  const statRequirements = {
    strength: weaponParams.properStrength,
    dexterity: weaponParams.properAgility,
    intelligence: weaponParams.properMagic,
    faith: weaponParams.properFaith,
    arcane: weaponParams.properLuck
  }

  return statRequirements
}