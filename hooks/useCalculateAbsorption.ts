import { armourProtectorParams } from '@/data/armour/armourParamProtector.json'
import { effectData } from '@/data/effects/effectData.json'
import { EquipmentContext } from '@/context/equipmentContext'
import { useState, useContext, useEffect } from 'react'

/* BIG TODO */

// For the entire hook
// The equation is this: 
// Calculate Armour DamageCutRate for each piece of armour and multiply them together
// Iterate throughout all armour, talismans, weapons, crystal tear effects, and great rune effects to calculate absorption in effects table and multiply them together
// Multiply the two values together and multiply the final value by 1 as a safeguard to ensure the value is a number
// Return the final absorption value

/* Need to inegrate */
// Weapon Picker
// Crystal Tear Picker
// Great Rune Picker

// Leaving this for now as I need to implement everything else for all calculations to be complete

function calculateAbsorption ( armour: IArmour, damageType: any ) {
  let damageCutRates: number[] = []

  // iterate through armour pieces and fetch neutralDamageCutRate 
  for (const [key, value] of Object.entries(armour)) {
    if (value) {
      const armourPiece = armourProtectorParams.find((armourPiece) => armourPiece.ID === value.value.id) as any // Use type assertion
      let damageCutRate: number = armourPiece ? armourPiece[damageType] : 1;
      damageCutRates.push(damageCutRate);
    }
  }

  if (!damageCutRates.length) {
    return '0.000'
  } else {

    // If more than 1 value multiple each element in array and return the sum
    if (damageCutRates.length) {
      let total = damageCutRates.reduce((a, b) => a * b)
      total = 100 * (1 - total)
      return total.toFixed(3)
    }
  }

  // If an error return 0
  return '0.000'
}

// Iterate throughout all talismans and calculate the absorption
function calculateTalismanEffectAbsorption(equipment: ITalismanSlots, damageType: any) {
  let damageRates = []

  for (const [key, value] of Object.entries(equipment)) {
    if (value) {
      const equipmentPiece = effectData.find((equipmentPiece) => equipmentPiece?.Source === value.value.Talisman) as any // Use type assertion
      let damageRate: number = equipmentPiece ? equipmentPiece[damageType] : 1;
      damageRates.push(damageRate);
    }
  }
}

export default function useCalculateAbsorption() {
  const { armour, talismans } = useContext(EquipmentContext)
  
  const [physicalAbsorption, setPhysicalAbsorption] = useState<string>('0.000')
  const [strikeAbsorption, setStrikeAbsorption] = useState<string>('0.000')
  const [slashAbsorption, setSlashAbsorption] = useState<string>('0.000')
  const [pierceAbsorption, setPierceAbsorption] = useState<string>('0.000')
  const [magicalAbsorption, setMagicalAbsorption] = useState<string>('0.000')
  const [fireAbsorption, setFireAbsorption] = useState<string>('0.000')
  const [lightningAbsorption, setLightningAbsorption] = useState<string>('0.000')
  const [holyAbsorption, setHolyAbsorption] = useState<string>('0.000')

  // When user changes armour, talismans, weapons, crystal tear or great rune updated the absorption values
  useEffect(() => {
    setPhysicalAbsorption(calculateAbsorption(armour, 'neutralDamageCutRate') )
    setStrikeAbsorption(calculateAbsorption(armour, 'blowDamageCutRate'))
    setSlashAbsorption(calculateAbsorption(armour, 'slashDamageCutRate'))
    setPierceAbsorption(calculateAbsorption(armour, 'thrustDamageCutRate'))
    setMagicalAbsorption(calculateAbsorption(armour, 'magicDamageCutRate'))
    setFireAbsorption(calculateAbsorption(armour, 'fireDamageCutRate'))
    setLightningAbsorption(calculateAbsorption(armour, 'thunderDamageCutRate'))
    setHolyAbsorption(calculateAbsorption(armour, 'darkDamageCutRate'))

  }, [armour, talismans])

  return { 
    physicalAbsorption, 
    strikeAbsorption, 
    slashAbsorption, 
    pierceAbsorption, 
    magicalAbsorption, 
    fireAbsorption, 
    lightningAbsorption, 
    holyAbsorption 
  }
}