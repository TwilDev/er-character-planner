import { useState, useEffect, useContext } from 'react'
import { EquipmentContext } from '@/context/equipmentContext'
import { ClassContext } from '@/context/classContext'
import EquipParamWeapon from '@/data/weapons/EquipParamWeapon.json'
import ReinforceParamWeapon from '@/data/weapons/ReinforceParamWeapon.json'
import AttackElementCorrectParam from '@/data/weapons/AttackElementCorrectParam.json'
import CalcCorrectGraphEZ from '@/data/weapons/CalcCorrectGraphEZ.json'
import weaponData from '@/data/weapons/weaponData.json'

interface EquipParamWeapon {
  ID: number;
  Name: string;
  sortId: number;
  weight: number;
  correctStrength: number;
  correctAgility: number;
  correctMagic: number;
  correctFaith: number;
  physGuardCutRate: number;
  magGuardCutRate: number;
  fireGuardCutRate: number;
  thunGuardCutRate: number;
  spEffectBehaviorId0: number;
  spEffectBehaviorId1: number;
  spEffectBehaviorId2: number;
  residentSpEffectId: number;
  residentSpEffectId1: number;
  residentSpEffectId2: number;
  originEquipWep: number;
  originEquipWep1: number;
  originEquipWep11: number;
  weakA_DamageRate: number;
  weakB_DamageRate: number;
  weakC_DamageRate: number;
  weakD_DamageRate: number;
  attackBasePhysics: number;
  attackBaseMagic: number;
  attackBaseFire: number;
  attackBaseThunder: number;
  staminaGuardDef: number;
  reinforceTypeId: number;
  correctType_Physics: number;
  properStrength: number;
  properAgility: number;
  properMagic: number;
  properFaith: number;
  poisonGuardResist: number;
  diseaseGuardResist: number;
  bloodGuardResist: number;
  curseGuardResist: number;
  enableMagic: boolean;
  enableMiracle: boolean;
  isEnhance: boolean;
  disableGemAttr: boolean;
  isDualBlade: boolean;
  correctType_Magic: number;
  correctType_Fire: number;
  correctType_Thunder: number;
  darkGuardCutRate: number;
  attackBaseDark: number;
  correctType_Dark: number;
  correctType_Poison: number;
  sleepGuardResist: number;
  madnessGuardResist: number;
  correctType_Blood: number;
  properLuck: number;
  freezeGuardResist: number;
  correctLuck: number;
  staminaConsumptionRate: number;
  attackElementCorrectId: number;
  correctType_Sleep: number;
  correctType_Madness: number;
  gemMountType: number;
}

export default function calculateWeaponDamage(weaponData: any, totalStats: IStats): number {

  // Typing for lookup tables
  const EquipParamWeaponData: EquipParamWeapon[] = EquipParamWeapon as EquipParamWeapon[]
  const CalcCorrectGraphEZData: any[] = CalcCorrectGraphEZ as any[]

  const userFinalStats = totalStats
  const affinity = 0 // TODO implement later
  const upgradeLevel = 25 // TODO implement later
  const meetsStatRequirements = true // TODO implement later

  // Lookup ID for common lookups in EquipParams
  const lookupId = weaponData.id + affinity
  
  // Weapon Params from Lookup
  const weaponParams = EquipParamWeaponData.find((item) => item.ID === lookupId)

  // type of reinforcement for lookup
  const reinforcementTypeId = weaponParams ? weaponParams?.reinforceTypeId + upgradeLevel : 0

  // reinforcement data for weapon with specific reinforcment type
  const reinforceParamForAffinity = ReinforceParamWeapon.find((item) => item.ID === reinforcementTypeId)


  // Calculate Base attack for the weapon based on upgrade level and reinforcement type
  const getBaseValue = (weaponParams: any, reinforceParamForAffinity: any) => {
    // Obtain Base Attack
    const weaponBaseAttack = weaponParams.attackBasePhysics ?? 0
    // console.log("weapon base attack lookup", weaponBaseAttack)

    // Get physical attack rate for upgrade level and reinforce type
    const reinforceLevelAtkRate = reinforceParamForAffinity.physicsAtkRate
    // console.log("Weapon Reinforce Level Atk Rate", reinforceLevelAtkRate)
    
    // console.log(weaponBaseAttack * reinforceLevelAtkRate)
    // return these two multiplied
    const baseAttackForUpgradeLevel = (weaponBaseAttack * reinforceLevelAtkRate)
    return baseAttackForUpgradeLevel
}

// Calculate scaling for weapon based on final stats
const checkScaling = (scalingBoolCheck: boolean, correctTypePhysics: number, playerStat: number) => {
  if (!scalingBoolCheck) return 0
  // console.log("Scaling bool check", scalingBoolCheck)
  // console.log("Correct Type Physics", correctTypePhysics)
  const scalingCorrectionRow = CalcCorrectGraphEZData.find((item) => item.ID === correctTypePhysics)
  if (!scalingCorrectionRow) return 
  if (!scalingCorrectionRow.hasOwnProperty(playerStat)) return console.log("Player Stat not found in scaling correction row")
  const scalingCorrection = scalingCorrectionRow[playerStat]

  // console.log(scalingCorrectionRow)
  return scalingCorrection ?? 0
}

// Calculate Scaling for weapon  for all element types
const handleScalingCalculations = (weaponParams: any, reinforceParamForAffinity: any, userFinalStats: IStats, baseAttack: number) => {
  if (!meetsStatRequirements) return 0// handle mutation later

  // Fetch Scaling data for checks to Str, Dex, Faith, Int, Arc
  const scalingData = AttackElementCorrectParam.find((item) => item.ID === weaponParams.attackElementCorrectId)

  // Calculate Str correction for weapon upgrade
  const correctStr = weaponParams.correctStrength * reinforceParamForAffinity.correctStrengthRate ?? 0
  console.log("correctStr", correctStr)

  // Calculate strength scaling affect for current final str // TODO implement * 1.5 on str if two handing
  const strengthCorrectionByPhysics = checkScaling (scalingData ? scalingData.isStrengthCorrect_byPhysics : false, weaponParams.correctType_Physics, userFinalStats.strength)
  console.log("strengthCorrectionByPhysics", strengthCorrectionByPhysics)

  // Calculate Dex correction for weapon upgrade
  const correctDex = weaponParams.correctAgility * reinforceParamForAffinity.correctAgilityRate ?? 0
  console.log("correctDex", correctDex)

  // Calculate Dex scaling for current final Dex
  const dexterityCorrectByPhysics = checkScaling (scalingData ? scalingData.isDexterityCorrect_byPhysics : false, weaponParams.correctType_Physics, userFinalStats.dexterity)
  console.log("dexterityCorrectByPhysics", dexterityCorrectByPhysics)

  // Calculate Int correction for weapon upgrade
  const correctInt = weaponParams.correctMagic * reinforceParamForAffinity.correctMagicRate ?? 0
  console.log("correctInt", correctInt)
  
  // Calculate Int scaling for current final Int
  const magicCorrectByPhysics = checkScaling (scalingData ? scalingData.isMagicCorrect_byPhysics : false, weaponParams.correctType_Physics, userFinalStats.intelligence + 1)
  console.log("magicCorrectByPhysics", magicCorrectByPhysics)

  // Calculate Fth correction for weapon upgrade
  const correctFth = weaponParams.correctFaith * reinforceParamForAffinity.correctFaithRate ?? 0
  console.log("correctFth", correctFth)

  // Calculate Fth scaling for current final fth
  const faithCorrectByPhysics = checkScaling (scalingData ? scalingData.isFaithCorrect_byPhysics : false, weaponParams.correctType_Physics, userFinalStats.intelligence + 1)
  console.log("faithCorrectByPhysics", faithCorrectByPhysics)

  // Calculate Arc correction for weapon upgrade  
  const correctArc = weaponParams.correctLuck * reinforceParamForAffinity.correctLuckRate ?? 0
  console.log("correctArc", correctArc)

  // Calculate Arc scaling for current final arc
  const luckCorrectByPhysics = checkScaling (scalingData ? scalingData.isLuckCorrect_byPhysics : false, weaponParams.correctType_Physics, userFinalStats.arcane + 1)
  console.log("luckCorrectByPhysics", luckCorrectByPhysics)

  const finalCalculation = (baseAttack + baseAttack * (correctStr * 0.01 * strengthCorrectionByPhysics * 0.01 +
    correctDex * 0.01 * dexterityCorrectByPhysics * 0.01 +
    correctInt * 0.01 * magicCorrectByPhysics * 0.01 +
    correctFth * 0.01 * faithCorrectByPhysics * 0.01 +
    correctArc * 0.01 * correctArc * 0.01))

  return finalCalculation
}

const ELEMENTAL_TYPES = 5

// Base Attack Lookup Values
const baseAtkLookupValues = ['attackBasePhysics', 'attackBaseMagic', 'attackBaseFire', 'attackBaseThunder', 'attackBaseDark'] //Dark is holy dmg
const reinforceAtkLookupValues = ['physicsAtkRate', 'magicAtkRate', 'fireAtkRate', 'thunderAtkRate', 'darkAtkRate'] // Dark is holy dmg

// Scaling Lookup Values
const correctTypeByElement = ['correctType_Physics', 'correctType_Magic', 'correctType_Fire', 'correctType_Thunder', 'correctType_Dark'] // Dark is holy dmg
const isStatCorrectByPhysics = ['isStrengthCorrect_byPhysics', 'isDexterityCorrect_byPhysics', 'isMagicCorrect_byPhysics', 'isFaithCorrect_byPhysics', 'isLuckCorrect_byPhysics'] // Luck is Arcane
const isStatCorrectByMagic = ['isStrengthCorrect_byMagic', 'isDexterityCorrect_byMagic', 'isMagicCorrect_byMagic', 'isFaithCorrect_byMagic', 'isLuckCorrect_byMagic'] // Luck is Arcane
const isStatCorrectByFire = ['isStrengthCorrect_byFire', 'isDexterityCorrect_byFire', 'isMagicCorrect_byFire', 'isFaithCorrect_byFire', 'isLuckCorrect_byFire'] // Luck is Arcane
const isStatCorrectByThunder = ['isStrengthCorrect_byThunder', 'isDexterityCorrect_byThunder', 'isMagicCorrect_byThunder', 'isFaithCorrect_byThunder', 'isLuckCorrect_byThunder'] // Luck is Arcane
const isStatCorrectByDark = ['isStrengthCorrect_byDark', 'isDexterityCorrect_byDark', 'isMagicCorrect_byDark', 'isFaithCorrect_byDark', 'isLuckCorrect_byDark'] // Luck is Arcane

console.log(baseAtkLookupValues.length)
console.log(reinforceAtkLookupValues.length)
console.log(correctTypeByElement.length)
console.log(isStatCorrectByPhysics.length)
console.log(isStatCorrectByMagic.length)
console.log(isStatCorrectByFire.length)
console.log(isStatCorrectByThunder.length)
console.log(isStatCorrectByDark.length)


// Calculate Base Attack for weapon
const baseAttack = getBaseValue(weaponParams, reinforceParamForAffinity)

// console.log("base attack", baseAttack)

// Calculate Scaling for weapon
const scalingAttack = handleScalingCalculations(weaponParams, reinforceParamForAffinity, userFinalStats, baseAttack)
console.log(scalingAttack)

console.log("base attack", baseAttack)
console.log("scaling", scalingAttack - baseAttack)
// 
// Calculate total attack
const totalAttack = scalingAttack

return totalAttack
}
