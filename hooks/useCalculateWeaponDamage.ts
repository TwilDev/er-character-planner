import { useState, useEffect, useContext } from 'react'
import { EquipmentContext } from '@/context/equipmentContext'

export default function useCalculateWeaponDamage() {
  
const userFinalStats = ui.stats
const affinity = ui.affinity
const upgradeLevel = ui.upgradeLevel
const meetsStatRequirements = TRUE

// Lookup ID for common lookups in EquipParams
 const lookupId = weaponData.id + affinityLookup.affinity
// Weapon Params from Lookup
const weaponParams = EquipParamWeapon.find((item) => item.id === lookupId)

// type of reinforcement for lookup
const reinforcementTypeId = weaponParams.reinforcementTypeId + upgradeLevel

// reinforcement data for weapon with specific reinforcment type
const reinforceParamForAffinity = ReinforceParamWeapon.find((item) => item.ID === reinforcementTypeId)

const getBaseValue = (weaponParams, reinforceParamForAffinity) => {
  // Obtain Base Attack
  const weaponBaseAttack = weaponParams.attackBasePhysics ?? 0

  // Get physical attack rate for upgrade level and reinforce type
  const reinforceLevelAtkRate = reinforceParamForAffinity.physicsAtkRate
  
  // return these two multiplied
  const baseAttackForUpgradeLevel = weaponBaseAttack * reinforceLevelAtkRate
  return baseAttackForUpgradeLevel
}

const checkScaling = (scalingBoolCheck, correctTypePhysics, playerStat) => {
  if (!scalingBoolCheck) return 0
  const scalingCorrection = CalcCorrectGraphEZ.find((item) => item.ID === correctTypePhysics)[playerStat]
  return scalingCorrection ?? 0
}

const handleScalingCalculations = (weaponParams, reinforceParamForAffinity, userFinalStats) => {
  if (!meetStatsRequirements) // handle mutation later

  // Fetch Scaling data for checks to Str, Dex, Faith, Int, Arc
  const scalingData = AttackElementCorrectParam.find((item) => item.ID === weaponParams.attackElementCorrectId)

  // Calculate Str correction for weapon upgrade
  const correctStr = weaponParams.correctStrength * reinforceParamForAffinity.correctStrengthRate ?? 0

  // Calculate strength scaling affect for current final str // TODO implement * 1.5 on str if two handing
  const strengthCorrectionByPhysics = checkScaling (scalingData.isStrengthCorrect_byPhysics, weaponData.correctType_Physics, finalStats.strength)
  
  // Calculate Dex correction for weapon upgrade
  const correctDex = weaponParams.correctAgility * reinforceParamForAffinity.correctAgilityRate ?? 0

  // Calculate Dex scaling for current final Dex
  const dexterityCorrectByPhysics = checkScaling (scalingData.isDexterityCorrect_byPhysics, weaponData.correctTypePhysics, finalStats.dexterity + 1)
  
  // Calculate Int correction for weapon upgrade
  const correctInt = weaponParams.correctMagic * reinforceParamsForAffinity.correctMagicRate ?? 0
  
  // Calculate Int scaling for current final Int
  const magicCorrectByPhysics = checkScaling (scalingData.isMagicCorrect_byPhysics, weaponData.correctTypePhysics, finalStats.intelligence + 1)

  // Calculate Fth correction for weapon upgrade
  const correctFth = weaponData.correctFaith * reinforceParamsForAffinity.correctFaithRate ?? 0

  // Calculate Fth scaling for current final fth
  const faithCorrectByPhysics = checkScaling (scalingData.isFaithCorrect_byPhysics, weaponData.correctTypePhysics, finalStats.intelligence + 1)

  // Calculate Arc correction for weapon upgrade  
  correctArc = weaponData.correctLuck * reinforceParamsForAffinity.correctLuckRate ?? 0

  // Calculate Arc scaling for current final arc
  const luckCorrectByPhysics = checkScaling (scalingData.isLuckCorrect_byPhysics, weaponData.correctTypePhysics, finalStats.arcane + 1)

  const finalCalcuation = ((correctStr * 0.01 * strengthCorrectionByPhysics * 0.01) + (correctDex * 0.01 * dexterityCorrectByPhysics * 0.01 )+ (correctInt * 0.01 * magicCorrectByPhysics * 0.01) + (correctFth * 0.01 * faithCorrectByPhysics * 0.01) + (correctArc * 0.01 * luckCorrectByPhysics * 0.01))
  return finalCalculation
}


}
