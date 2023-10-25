import { armourProtectorParams } from '@/data/armour/armourParamProtector.json'
import { ArmourContext } from '@/context/armourContext'
import { useState, useContext, useEffect } from 'react'


function calculateAbsorption ( armour: IArmour, damageType: any ) {
  let damageCutRates: number[] = []

  // iterate through armour pieces and fetch neutralDamageCutRate 
  for (const [key, value] of Object.entries(armour)) {
    if (value) {
      const armourPiece = armourProtectorParams.find((armourPiece) => armourPiece.ID === value.value.id) as any // Use type assertion
      let damageCutRate = armourPiece ? armourPiece[damageType] : 1;
      damageCutRates.push(damageCutRate);
    } else {
      console.log('no armour piece');
    }
  }

  if (!damageCutRates.length) {
    return '0.000'
  } else {
    // If length is 1 return the first element
    if (damageCutRates.length === 1) {
      let total = damageCutRates[0]
      total = 100 * (1 - total)
      return total.toFixed(3)
    }

    // If more than 1 value multiple each element in array and return the sum
    if (damageCutRates.length > 1) {
      let total = damageCutRates.reduce((a, b) => a * b)
      total = 100 * (1 - total)
      return total.toFixed(3)
    }
  }

  // If an error return 0
  return '0.000'
}

export default function useCalculateAbsorption() {
  const { headArmour, bodyArmour, handsArmour, legsArmour } = useContext(ArmourContext)
  const [armour, setArmour] = useState<IArmour>(
    {
      head: headArmour, 
      body: bodyArmour, 
      hands: handsArmour, 
      legs: legsArmour
    }
  )
  
  const [physicalAbsorption, setPhysicalAbsorption] = useState<string>('0.000')
  const [strikeAbsorption, setStrikeAbsorption] = useState<string>('0.000')
  const [slashAbsorption, setSlashAbsorption] = useState<string>('0.000')
  const [pierceAbsorption, setPierceAbsorption] = useState<string>('0.000')
  const [magicalAbsorption, setMagicalAbsorption] = useState<string>('0.000')
  const [fireAbsorption, setFireAbsorption] = useState<string>('0.000')
  const [lightningAbsorption, setLightningAbsorption] = useState<string>('0.000')
  const [holyAbsorption, setHolyAbsorption] = useState<string>('0.000')

  // update armour state when armour pieces change
  useEffect(() => {
    setArmour({
      head: headArmour, 
      body: bodyArmour, 
      hands: handsArmour, 
      legs: legsArmour
    })
  }, [headArmour, bodyArmour, handsArmour, legsArmour])

  useEffect(() => {
    console.log(armour)
    setPhysicalAbsorption(calculateAbsorption(armour, 'neutralDamageCutRate'))
    setStrikeAbsorption(calculateAbsorption(armour, 'blowDamageCutRate'))
    setSlashAbsorption(calculateAbsorption(armour, 'slashDamageCutRate'))
    setPierceAbsorption(calculateAbsorption(armour, 'thrustDamageCutRate'))
    setMagicalAbsorption(calculateAbsorption(armour, 'magicDamageCutRate'))
    setFireAbsorption(calculateAbsorption(armour, 'fireDamageCutRate'))
    setLightningAbsorption(calculateAbsorption(armour, 'thunderDamageCutRate'))
    setHolyAbsorption(calculateAbsorption(armour, 'darkDamageCutRate'))

  }, [armour])


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