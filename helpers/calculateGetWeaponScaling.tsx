import EquipParamWeapon from '@/data/weapons/EquipParamWeapon.json'
import ReinforceParamWeapon from '@/data/weapons/ReinforceParamWeapon.json'

export default function calculateGetWeaponScaling(weaponData: any, affinity: number, upgradeLevel: number, stats: IStats) {

    const affinityConst = affinity
    const upgradeLevelConst = upgradeLevel

    // Lookup ID for common lookups in EquipParams
    const lookupId = weaponData.id + affinityConst

    // Typing for lookup tables
    const EquipParamWeaponData: EquipParamWeapon[] = EquipParamWeapon as EquipParamWeapon[]

    // Weapon Params from Lookup
    const weaponParams: EquipParamWeapon | undefined = EquipParamWeaponData.find((item) => item.ID === lookupId)

    // type of reinforcement for lookup
    const reinforcementTypeId = weaponParams ? weaponParams?.reinforceTypeId + upgradeLevelConst : 0

    // reinforcement data for weapon with specific reinforcment type
    const reinforceParamForAffinity = ReinforceParamWeapon.find((item) => item.ID === reinforcementTypeId)

    if (!weaponParams || !reinforceParamForAffinity) return null
    
    const strengthScaling = weaponParams.correctStrength * reinforceParamForAffinity.correctStrengthRate ?? 0
    const dexerityScaling = weaponParams.correctAgility * reinforceParamForAffinity.correctAgilityRate ?? 0
    const intelligenceScaling = weaponParams.correctMagic * reinforceParamForAffinity.correctMagicRate ?? 0
    const faithScaling  = weaponParams.correctFaith * reinforceParamForAffinity.correctFaithRate ?? 0
    const arcaneScaling = weaponParams.correctLuck * reinforceParamForAffinity.correctLuckRate ?? 0

    const scalingValues = {
        strength: {
          trueVal: strengthScaling,
          letter: calculateWeaponScalingLetter(strengthScaling)
        },
        dexterity: { 
          trueVal: dexerityScaling,
          letter: calculateWeaponScalingLetter(dexerityScaling)
        },
        intelligence: {
          trueVal: intelligenceScaling,
          letter: calculateWeaponScalingLetter(intelligenceScaling)
        },
        faith: {
          trueVal: faithScaling,
          letter: calculateWeaponScalingLetter(faithScaling)
        },
        arcane: {
          trueVal: arcaneScaling,
          letter: calculateWeaponScalingLetter(arcaneScaling)
        }
    }

    return scalingValues
}

function calculateWeaponScalingLetter (scaling: number) {
  if (scaling >= 175) return "S"
  else if (scaling >= 140) return "A"
  else if (scaling >= 90) return "B"
  else if (scaling >= 60) return "C"
  else if (scaling >= 25) return "D"
  else if (scaling < 1) return "E"
  else return "-"
}