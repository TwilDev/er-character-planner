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

export default function calculateWeaponDamage(weaponData: any, totalStats: IStats) {

  // Typing for lookup tables
  const EquipParamWeaponData: EquipParamWeapon[] = EquipParamWeapon as EquipParamWeapon[]
  const CalcCorrectGraphEZData: any[] = CalcCorrectGraphEZ as any[]

  const userFinalStats = totalStats
  const affinity = 0 // TODO implement later
  const upgradeLevel = 0 // TODO implement later
  const meetsStatRequirements = true // TODO implement later

  // Lookup ID for common lookups in EquipParams
  const lookupId = weaponData.id + affinity
  
  // Weapon Params from Lookup
  const weaponParams: EquipParamWeapon | undefined = EquipParamWeaponData.find((item) => item.ID === lookupId)

  // type of reinforcement for lookup
  const reinforcementTypeId = weaponParams ? weaponParams?.reinforceTypeId + upgradeLevel : 0

  // reinforcement data for weapon with specific reinforcment type
  const reinforceParamForAffinity = ReinforceParamWeapon.find((item) => item.ID === reinforcementTypeId)


  /** 
   * Performs a lookup within weaponParams table to obtain baseAttack for a given weapon based upon a given elemental type
   * Loks up the attack value for a given weapon type at a specific reinforcement level based upon a given elemental type 
   * @param weaponParams - The weaponParams object for the weapon - currently any due to JSON import
   * @param reinforceParamForAffinity - The reinforcement parameters for the weapon - currently any due to JSON import
   * @param baseAttackElementType - The base attack element type for the weapon - currently any due to JSON import is a keyof EquiParamWeaponData
   * @param reinforceAttackElementType - The reinforcement attack element type for the weapon - currently any due to JSON import is a key of ReinforceParamWeaponData
   * @returns The base attack value for the weapon at the given reinforcement level for provided elemental type of damage
  **/
  const getBaseValue = (
    weaponParams: any, 
    reinforceParamForAffinity: any, 
    baseAttackElementType: keyof EquipParamWeapon, 
    reinforceAttackElementType: string
  ) => {

    // Obtain Base Attack
    const weaponBaseAttack = weaponParams[baseAttackElementType] ?? 0

    // Get physical attack rate for upgrade level and reinforce type
    const reinforceLevelAtkRate = reinforceParamForAffinity[reinforceAttackElementType]

    // return these two multiplied
    const baseAttackForUpgradeLevel = (weaponBaseAttack * reinforceLevelAtkRate) ?? 0
    return baseAttackForUpgradeLevel
}

  /**
   * Makes an initial check for scaling correction for a given stat and element for attack elemental type - I.e if fire should scale off of STR etc for attackElementCorrectId
   * If scaling is disabled returns 0 if there is scaling a scaling lookup is performed
   * Gets the scaling correction for a given stat and element for attack elemental type
   * @param scalingBoolCheck - A boolean value to check if scaling is enabled for the weapon
   * @param correctTypePhysics - The correct type of physics for the weapon
   * @param playerStat - The player stat to check scaling for
   * @returns The scaling correction for the given given stat level and element for attack elemental type
  */
  const checkScaling = (scalingBoolCheck: boolean, correctTypePhysics: number, playerStat: number) => {
    // If scaling is disabled return 0
    if (!scalingBoolCheck) return 0

    // Lookup the scaling correction row for the given correctTypePhysics
    const scalingCorrectionRow = CalcCorrectGraphEZData.find((item) => item.ID === correctTypePhysics)

    // If no row is found return
    if (!scalingCorrectionRow) return 
    if (!scalingCorrectionRow.hasOwnProperty(playerStat)) return console.log("Player Stat not found in scaling correction row")
    
    // Get scaling correction for given correctionType at stat level
    const scalingCorrection = scalingCorrectionRow[playerStat]

    // Return scaling correction
    return scalingCorrection ?? 0
  }

  /**
   * Generic function to handle scaling calculations for each elemental attack type for a given weapon
   * @param weaponParams - The weaponParams object for the weapon - currently any due to JSON import
   * @param reinforceParamForAffinity - The reinforcement parameters for the weapon - currently any due to JSON import
   * @param userFinalStats - The final stats for the user after any modifiers for accurate scaling calculations
   * @param baseAttack - The base attack value for the weapon at the given reinforcement level for provided elemental type of damage
   * @param correctType - The elemental type to get correction for
   * @param correctByElement - The element to get correction for
   * @returns The final calculated attack value for the weapon 
  */
  const handleScalingCalculations = (
    weaponParams: any, 
    reinforceParamForAffinity: any, 
    userFinalStats: IStats, 
    baseAttack: number, 
    correctType: string, 
    correctByElement: string
  ) => {
    if (!meetsStatRequirements) return 0// handle mutation later

    // Fetch Scaling data for checks to Str, Dex, Faith, Int, Arc
    const scalingData: any = AttackElementCorrectParam.find((item) => item.ID === weaponParams.attackElementCorrectId)

    // Calculate Str scaling for weapon at current upgrade
    const correctStr = weaponParams.correctStrength * reinforceParamForAffinity.correctStrengthRate ?? 0
    console.log("correctStr", correctStr)

    // Calculate strength scaling affect for current final str // TODO implement * 1.5 on str if two handing
    const strengthCorrectionByPhysics = checkScaling (scalingData ? scalingData["isStrengthCorrect_by" + correctByElement] : false, weaponParams[correctType], userFinalStats.strength)
    console.log("strengthCorrectionByPhysics", strengthCorrectionByPhysics)

    // Calculate Dex scaling for weapon at current upgrade
    const correctDex = weaponParams.correctAgility * reinforceParamForAffinity.correctAgilityRate ?? 0
    console.log("correctDex", correctDex)

    // Calculate Dex scaling for current final Dex
    const dexterityCorrectByPhysics = checkScaling (scalingData ? scalingData["isDexterityCorrect_by" + correctByElement] : false, weaponParams[correctType], userFinalStats.dexterity)
    console.log("dexterityCorrectByPhysics", dexterityCorrectByPhysics)

    // Calculate Int scaling for weapon at current upgrade
    const correctInt = weaponParams.correctMagic * reinforceParamForAffinity.correctMagicRate ?? 0
    console.log("correctInt", correctInt)
    
    // Calculate Int scaling for current final Int
    const magicCorrectByPhysics = checkScaling (scalingData ? scalingData["isMagicCorrect_by" + correctByElement] : false, weaponParams[correctType], userFinalStats.intelligence)
    console.log("magicCorrectByPhysics", magicCorrectByPhysics)

    // Calculate Faith scaling for weapon at current upgrade
    const correctFth = weaponParams.correctFaith * reinforceParamForAffinity.correctFaithRate ?? 0
    console.log("correctFth", correctFth)

    // Calculate Faith scaling for current final fth
    const faithCorrectByPhysics = checkScaling (scalingData ? scalingData["isFaithCorrect_by" + correctByElement] : false, weaponParams[correctType], userFinalStats.faith)
    console.log("faithCorrectByPhysics", faithCorrectByPhysics)

    // Calculate Arcane scaling for weapon at current upgrade
    const correctArc = weaponParams.correctLuck * reinforceParamForAffinity.correctLuckRate ?? 0
    console.log("correctArc", correctArc)

    // Calculate Arcane scaling for current final arc
    const luckCorrectByPhysics = checkScaling (scalingData ? scalingData["isLuckCorrect_by" + correctByElement] : false, weaponParams[correctType], userFinalStats.arcane)
    console.log("luckCorrectByPhysics", luckCorrectByPhysics)
    
    var finalCalculation;

    // Calculate final attack value based upon element type
    if (correctByElement === "Physics") {
      finalCalculation = (baseAttack + baseAttack * (correctStr * 0.01 * strengthCorrectionByPhysics * 0.01 +
        correctDex * 0.01 * dexterityCorrectByPhysics * 0.01 +
        correctInt * 0.01 * magicCorrectByPhysics * 0.01 +
        correctFth * 0.01 * faithCorrectByPhysics * 0.01 +
        correctArc * 0.01 * luckCorrectByPhysics * 0.01))
    } else {
      finalCalculation = (baseAttack + (baseAttack * (correctStr * 0.01 * strengthCorrectionByPhysics * 0.01 +
        correctDex * 0.01 * dexterityCorrectByPhysics * 0.01 +
        correctInt * 0.01 * magicCorrectByPhysics * 0.01 +
        correctFth * 0.01 * faithCorrectByPhysics * 0.01 +
        correctArc * 0.01 * luckCorrectByPhysics * 0.01)))
    }

    return finalCalculation
  }

  // CONSTANT VALUES HERE FOR REFERENCE ON LOOKUP
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

  // Grab base physical attack and corrected scaling for base physical attack
  const physicalBaseAttack = getBaseValue(weaponParams, reinforceParamForAffinity, 'attackBasePhysics', 'physicsAtkRate')
  const physicalScalingAttack = handleScalingCalculations(weaponParams, reinforceParamForAffinity, userFinalStats, physicalBaseAttack, 'correctType_Physics', 'Physics')

  // Grab base magical attack and corrected scaling for base magical attack
  const magicalBaseAttack = getBaseValue(weaponParams, reinforceParamForAffinity, 'attackBaseMagic', 'magicAtkRate')
  const magicalScalingAttack = handleScalingCalculations(weaponParams, reinforceParamForAffinity, userFinalStats, magicalBaseAttack, 'correctType_Magic', 'Magic')

  // Grab base fire attack and corrected scaling for base fire attack
  const fireBaseAttack = getBaseValue(weaponParams, reinforceParamForAffinity, 'attackBaseFire', 'fireAtkRate')
  const fireScalingAttack = handleScalingCalculations(weaponParams, reinforceParamForAffinity, userFinalStats, fireBaseAttack, 'correctType_Fire', 'Fire')

  // Grab base thunder attack and corrected scaling for base thunder attack
  const thunderBaseAttack = getBaseValue(weaponParams, reinforceParamForAffinity, 'attackBaseThunder', 'thunderAtkRate')
  const thunderScalingAttack = handleScalingCalculations(weaponParams, reinforceParamForAffinity, userFinalStats, thunderBaseAttack, 'correctType_Thunder', 'Thunder')

  // Grab base holy attack and corrected scaling for base holy attack
  const holyBaseAttack = getBaseValue(weaponParams, reinforceParamForAffinity, 'attackBaseDark', 'darkAtkRate')
  const holyScalingAttack = handleScalingCalculations(weaponParams, reinforceParamForAffinity, userFinalStats, holyBaseAttack, 'correctType_Dark', 'Dark')

  // Final total attack rating
  const totalAttack = physicalScalingAttack + magicalScalingAttack + fireScalingAttack + thunderScalingAttack + holyScalingAttack

  // Physical Attack Rating for Weapon at uphrade & additional scaling attack modifier from stats
  const physicalBaseAttackRating = physicalBaseAttack
  const physicalScalingAttackRating = physicalScalingAttack - physicalBaseAttack

  // Magical Attack Rating for Weapon at uphrade & additional scaling attack modifier from stats
  const magicalBaseAttackRating = magicalBaseAttack
  const magicalScalingAttackRating = magicalScalingAttack - magicalBaseAttack

  // Fire Attack Rating for Weapon at uphrade & additional scaling attack modifier from stats
  const fireBaseAttackRating = fireBaseAttack
  const fireScalingAttackRating = fireScalingAttack - fireBaseAttack

  // Lightning Attack Rating for Weapon at uphrade & additional scaling attack modifier from stats
  const lightningBaseAttackRating = thunderBaseAttack
  const lightningScalingAttackRating = thunderScalingAttack - thunderBaseAttack

  // Holy Attack Rating for Weapon at uphrade & additional scaling attack modifier from stats
  const holyBaseAttackRating = holyBaseAttack
  const holyScalingAttackRating = holyScalingAttack - holyBaseAttack

  return { 
    totalAttack, 
    physicalBaseAttackRating, 
    physicalScalingAttackRating, 
    magicalBaseAttackRating, 
    magicalScalingAttackRating, 
    fireBaseAttackRating, 
    fireScalingAttackRating, 
    lightningBaseAttackRating, 
    lightningScalingAttackRating, 
    holyBaseAttackRating, 
    holyScalingAttackRating 
  }
}
