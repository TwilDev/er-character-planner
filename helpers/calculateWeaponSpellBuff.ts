import EquipParamWeapon from '@/data/weapons/EquipParamWeapon.json'
import ReinforceParamWeapon from '@/data/weapons/ReinforceParamWeapon.json'
import CalcCorrectGraphEZ from '@/data/weapons/CalcCorrectGraphEZ.json'
import AttackElementCorrectParam from '@/data/weapons/AttackElementCorrectParam.json';

export default function calculateWeaponSpellBuff(weaponData: IWeaponData, upgradeLevel: number, userFinalStats: IStats) {
  // Typing for lookup tables
  const EquipParamWeaponData: EquipParamWeapon[] =
    EquipParamWeapon as EquipParamWeapon[]
  const CalcCorrectGraphEZData: any[] = CalcCorrectGraphEZ as any[]

  // Do not need to account for affinity as catalysts cannot be infused.
  const weaponParams: EquipParamWeapon | undefined = EquipParamWeaponData.find(
    (item) => item.ID === weaponData.id
  )
  if (!weaponParams) return 0

  // Check if weapon has valid spellbuff scaling
  const hasScaling =
    weaponParams?.enableMagic || weaponParams?.enableMiracle ? true : false
  if (!hasScaling) return 0

  // type of reinforcement for lookup
  const reinforcementTypeId = weaponParams ? weaponParams?.reinforceTypeId + upgradeLevel : 0

  const reinforceParamForAffinity = ReinforceParamWeapon.find((item) => item.ID === reinforcementTypeId)
  if (!reinforceParamForAffinity) return 0

  // Multiply correctStrength variable for selected weapon against the reinforceParam for each offensive stat for the weapons given upgraded level.
  const correctStrFinal = weaponParams.correctStrength * reinforceParamForAffinity?.correctStrengthRate
  const correctDexFinal = weaponParams.correctAgility * reinforceParamForAffinity.correctAgilityRate
  const correctIntFinal = weaponParams.correctMagic * reinforceParamForAffinity.correctMagicRate
  const correctFthFinal = weaponParams.correctFaith * reinforceParamForAffinity.correctFaithRate
  const correctArcFinal = weaponParams.correctLuck * reinforceParamForAffinity.correctLuckRate

  // Fetch Scaling data for checks to Str, Dex, Faith, Int, Arc 
  const scalingData = AttackElementCorrectParam.find((item) => item.ID === weaponParams.attackElementCorrectId)
  if (!scalingData) return 0

  const getScalingValues = (scalingCheck: boolean, stat: number) => {
    if (!scalingCheck) return 0
    const correctedByMagic = CalcCorrectGraphEZData.find((item) => item.ID === weaponParams.correctType_Magic)
    if (correctedByMagic) return correctedByMagic[stat]
    return 0
  }

  // Get Scaling values for each offensive scaling stat based upon the correctMagic param of the weapon 
  const strCorrectByMagic = getScalingValues(scalingData.isStrengthCorrect_byMagic, userFinalStats.strength)
  const dexCorrectByMagic = getScalingValues(scalingData.isDexterityCorrect_byMagic, userFinalStats.dexterity + 1)
  const intCorrectByMagic = getScalingValues(scalingData.isMagicCorrect_byMagic, userFinalStats.intelligence + 1)
  const fthCorrectByMagic = getScalingValues(scalingData.isFaithCorrect_byMagic, userFinalStats.faith + 1)
  const arcCorrectByMagic = getScalingValues(scalingData.isLuckCorrect_byMagic, userFinalStats.arcane + 1)

  // Final Spellbuff scaling formula used to display the sorcery/incant scaling
  const finalCalc = 100 + (100 * 
    correctStrFinal * 0.01 * strCorrectByMagic * 0.01 +
    correctDexFinal * 0.01 * dexCorrectByMagic * 0.01 +
    correctIntFinal * 0.01 * intCorrectByMagic * 0.01 +
    correctFthFinal * 0.01 * fthCorrectByMagic * 0.01 +
    correctArcFinal * 0.01 * arcCorrectByMagic * 0.01
  )

  return finalCalc ?? 0
}
