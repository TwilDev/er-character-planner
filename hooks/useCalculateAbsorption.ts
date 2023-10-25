import { armourProtectorParams } from '@/data/armour/armourParamProtector.json'
import { ArmourContext } from '@/context/armourContext'
import { useState, useContext, useEffect } from 'react'

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
  
  const [phsyicalAbsorption, setPhysicalAbsorption] = useState<string>('0.000')

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

    let neutralDamageCutRates: number[] = [] 

    // iterate through armour pieces and fetch neutralDamageCutRate 
    for (const [key, value] of Object.entries(armour)) {
      if(value) {
        const armourPiece = armourProtectorParams.find((armourPiece) => armourPiece.ID === value.value.id)
        let neutralDamageCutRate = armourPiece?.neutralDamageCutRate ?? 1
        neutralDamageCutRates.push(neutralDamageCutRate)
      } else {
        console.log('no armour piece')
      }
    }

    if (!neutralDamageCutRates.length) {
      setPhysicalAbsorption('0.000')
    } else {

      console.log("there is an armour piece")

      // If length is 1 return the first element
      if (neutralDamageCutRates.length === 1) { 
        console.log("Only 1 armour piece")

        let total = neutralDamageCutRates[0]
        total = 100 * (1 - total)
        // setPhysicalAbsorption(Number((100 * (1 - total)).toFixed(3)))
        setPhysicalAbsorption(total.toFixed(3))
      }

      // If more than 1 value multiple each element in array and return the sum
      if (neutralDamageCutRates.length > 1) {
        console.log("More than 1 armour piece length is " + neutralDamageCutRates.length)

        neutralDamageCutRates.forEach((element) => {
          console.log(element)
        })

        let total = neutralDamageCutRates.reduce((a, b) => a * b)
        total = 100 * (1 - total)
        // setPhysicalAbsorption(Number((100 * (1 - total)).toFixed(3)))
        setPhysicalAbsorption(total.toFixed(3))
      }
    }

  }, [armour])


  return { phsyicalAbsorption }
}