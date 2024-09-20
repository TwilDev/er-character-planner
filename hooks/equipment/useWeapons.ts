import { CharacterContext } from '@/context/characterContext'
import calculateWeaponDamage from '@/helpers/calculateWeaponDamage'
import calculateGetWeaponScaling from '@/helpers/calculateGetWeaponScaling'
import getWeaponStatRequirements from '@/helpers/getWeaponStatRequirements'
import checkWeaponRequirements from '@/helpers/checkWeaponRequirements'
import { ClassContext } from '@/context/classContext'
import { useContext, useState, useCallback, useEffect } from 'react'

export default function useWeapons(weaponSlot: string) {
  const {
    rh1,
    setRh1,
    rh2,
    setRh2,
    rh3,
    setRh3,
    lh1,
    setLh1,
    lh2,
    setLh2,
    lh3,
    setLh3,
  } = useContext(CharacterContext)

  const weaponSlotSetters: { [key: string]: (value: any) => void } = {
    rh1: setRh1,
    rh2: setRh2,
    rh3: setRh3,
    lh1: setLh1,
    lh2: setLh2,
    lh3: setLh3,
  }

  /* Select weapon based upon weapon slot provided */
  const selectWeapon = (
    weapon: any,
    affinity: number,
    upgradeLevel: number,
    isReinforce: boolean,
    isInfuse: boolean
  ) => {
    const setter = weaponSlotSetters[weaponSlot]
    if (setter) {
      setter({
        ID: weapon.id,
        weapon: weapon.weapon,
        weaponSlot: weaponSlot,
        affinity: affinity,
        upgradeLevel: upgradeLevel,
        isReinforce,
        isInfuse
      })
    } else {
      console.error(`Invalid weapon slot: ${weaponSlot}`)
    }
  }

  const { totalStats } = useContext(ClassContext)

  const [selectedWeapon, setSelectedWeapon] = useState<any>(null)
  const [meetsStatRequirements, setMeetsStatRequirements] =
    useState<boolean>(false)
  const [scalingValues, setScalingValues] = useState<any>(null)
  const [weaponStatRequirements, setWeaponStatRequirements] =
    useState<any>(null)
  const [affinity, setAffinity] = useState<number>(0)
  const [upgradeLevel, setUpgradeLevel] = useState<number>(0)
  const [weaponAttackRatings, setWeaponAttackRatings] = useState<any>({
    totalAttackRating: 0,
    physicalBaseAttackRating: 0,
    physicalScalingAttackRating: 0,
    magicalBaseAttackRating: 0,
    magicalScalingAttackRating: 0,
    fireBaseAttackRating: 0,
    fireScalingAttackRating: 0,
    lightningBaseAttackRating: 0,
    lightningScalingAttackRating: 0,
    holyBaseAttackRating: 0,
    holyScalingAttackRating: 0,
  })

  const handlePassUpgradeLevel = (selectedWeapon: IWeaponData) => {
    if (!selectedWeapon.isReinforce) return 0
    if (!selectedWeapon.isInfuse && upgradeLevel > 10) return 0
    return upgradeLevel
  }

  const updateWeaponDamage = useCallback((
    selectedWeapon: IWeaponData,
    affinity: number,
    upgradeLevel: number
  ) => {
    // Calculate weapon damage
    if (selectedWeapon) {
      const validateUpgradeLevel = handlePassUpgradeLevel(selectedWeapon)

      const weaponDamageValues = calculateWeaponDamage(
        selectedWeapon,
        totalStats,
        selectedWeapon.isInfuse ? affinity : 0,
        validateUpgradeLevel
      )

      const {
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
        holyScalingAttackRating,
      } = weaponDamageValues

      setWeaponAttackRatings({
        totalAttackRating: totalAttack,
        physicalBaseAttackRating: physicalBaseAttackRating,
        physicalScalingAttackRating: physicalScalingAttackRating,
        magicalBaseAttackRating: magicalBaseAttackRating,
        magicalScalingAttackRating: magicalScalingAttackRating,
        fireBaseAttackRating: fireBaseAttackRating,
        fireScalingAttackRating: fireScalingAttackRating,
        lightningBaseAttackRating: lightningBaseAttackRating,
        lightningScalingAttackRating: lightningScalingAttackRating,
        holyBaseAttackRating: holyBaseAttackRating,
        holyScalingAttackRating: holyScalingAttackRating,
      })

      // Get weapon scaling values
      const weaponScalingValues = calculateGetWeaponScaling(
        selectedWeapon, 
        selectedWeapon.isInfuse ? affinity : 0, 
        validateUpgradeLevel ?? 0,
        totalStats
      )
      setScalingValues(weaponScalingValues)

      // Get weapon stat requirements
      const weaponStatRequirements = getWeaponStatRequirements(selectedWeapon, selectedWeapon.isInfuse ? affinity : 0) 
      setWeaponStatRequirements(weaponStatRequirements)
      setMeetsStatRequirements(checkWeaponRequirements({ weaponStatRequirements, stats: totalStats }))
    }
  }, [handlePassUpgradeLevel])

  const handleSelectWeapon = (selectedWeapon: IWeaponData) => {
    console.log(selectedWeapon)
    setSelectedWeapon(selectedWeapon)
    selectWeapon(
      selectedWeapon,
      affinity,
      upgradeLevel,
      selectedWeapon.isReinforce,
      selectedWeapon.isInfuse
    )
    updateWeaponDamage(selectedWeapon, affinity, upgradeLevel)
  }

  useEffect(() => {
    updateWeaponDamage(selectedWeapon, affinity, upgradeLevel)
  }, [totalStats, selectedWeapon, affinity, upgradeLevel])

  return {
    handleSelectWeapon,
    weaponStatRequirements,
    meetsStatRequirements,
    weaponAttackRatings,
    scalingValues,
    affinity,
    setAffinity,
    upgradeLevel,
    setUpgradeLevel
  }
}
