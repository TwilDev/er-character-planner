
export default function checkWeaponRequirements({ weaponStatRequirements, stats }: { weaponStatRequirements: any, stats: IStats }) {
  const { strength, dexterity, intelligence, faith, arcane } = stats

  if (weaponStatRequirements) {
    if (weaponStatRequirements.stength > strength || weaponStatRequirements.dexterity > dexterity || weaponStatRequirements.intelligence > intelligence || weaponStatRequirements.faith > faith || weaponStatRequirements.arcane > arcane) {
      return false 
    }
    return true
  }

  return false
}