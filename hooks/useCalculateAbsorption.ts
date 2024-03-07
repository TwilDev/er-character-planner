import { armourProtectorParams } from '@/data/armour/armourParamProtector.json'
import { effectData } from '@/data/effects/effectData.json'
import { EquipmentContext } from '@/context/equipmentContext'
import { EffectContext } from '@/context/effectContext'
import { useState, useContext, useEffect } from 'react'

/* BIG TODO */

// For the entire hook
// The equation is this: 
// Calculate Armour DamageCutRate for each piece of armour and multiply them together
// Iterate throughout all armour, talismans, weapons, crystal tear effects, and great rune effects to calculate absorption in effects table and multiply them together
// Multiply the two values together and multiply the final value by 1 as a safeguard to ensure the value is a number
// Return the final absorption value

/* Need to inegrate */
// Weapon Picker - DONE
// Crystal Tear Picker
// Great Rune Picker - DONE

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
    return 1
  } else {

    // If more than 1 value multiple each element in array and return the sum
    if (damageCutRates.length) {
      let total = damageCutRates.reduce((a, b) => a * b)
      return total
    }
  }

  // If an error return 0
  return 1
}

// Generic function to calculate the absorption of effects
function calculateEffectAbsorption(effects: IEffect[], damageType: keyof IEffect) {
  let damageRates: number[] = []

  // Iterate throughout all effects and calculate the absorption
  for (const effect of effects) {
    let damageRate: any = effect ? effect[damageType] : 1;
    damageRates.push(damageRate);
  }

  // Return the sum of all effects for the specified damage rate or return 1 if no effects
  return damageRates && damageRates.length ? damageRates.reduce((a, b) => a * b) : 1
}

export default function useCalculateAbsorption() {
  const { armour } = useContext(EquipmentContext)
  const { effects } = useContext(EffectContext)

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
    
    setPhysicalAbsorption(() => {
      const armourValues = calculateAbsorption(armour, 'neutralDamageCutRate')
      const effectValues = calculateEffectAbsorption(effects, 'physCutRate')
      const sum = armourValues * effectValues
      return (100 * (1 - sum)).toFixed(3)
    })
    setStrikeAbsorption(() => {
      const armourValues = calculateAbsorption(armour, 'blowDamageCutRate')
      const effectValues = calculateEffectAbsorption(effects, 'strikeCutRate')
      const sum = armourValues * effectValues
      return (100 * (1 - sum)).toFixed(3)
    })
    setSlashAbsorption(() => {
      const armourValues = calculateAbsorption(armour, 'slashDamageCutRate')
      const effectValues = calculateEffectAbsorption(effects, 'slashCutRate')
      const sum = armourValues * effectValues
      return (100 * (1 - sum)).toFixed(3)
    })
    setPierceAbsorption(() => {
      const armourValues = calculateAbsorption(armour, 'thrustDamageCutRate')
      const effectValues = calculateEffectAbsorption(effects, 'pierceCutRate')
      const sum = armourValues * effectValues
      return (100 * (1 - sum)).toFixed(3)
    })
    setMagicalAbsorption(() => {
      const armourValues = calculateAbsorption(armour, 'magicDamageCutRate')
      const effectValues = calculateEffectAbsorption(effects, 'magCutRate')
      const sum = armourValues * effectValues
      return (100 * (1 - sum)).toFixed(3)
    })
    setFireAbsorption(() => {
      const armourValues = calculateAbsorption(armour, 'fireDamageCutRate')
      const effectValues = calculateEffectAbsorption(effects, 'fireCutRate')
      const sum = armourValues * effectValues
      return (100 * (1 - sum)).toFixed(3)
    })
    setLightningAbsorption(() => {
      const armourValues = calculateAbsorption(armour, 'thunderDamageCutRate')
      const effectValues = calculateEffectAbsorption(effects, 'lightningCutRate')
      const sum = armourValues * effectValues
      return (100 * (1 - sum)).toFixed(3)
    })
    setHolyAbsorption(() => {
      const armourValues = calculateAbsorption(armour, 'darkDamageCutRate')
      const effectValues = calculateEffectAbsorption(effects, 'holyCutRate')
      const sum = armourValues * effectValues
      return (100 * (1 - sum)).toFixed(3)
    })

  }, [armour, effects])

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