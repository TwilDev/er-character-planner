import Select from 'react-select'
import { useState, useEffect } from 'react'
import { armour } from '@/data/armour/armourData.json'

export default function ArmourSelection() {

  const [headArmour, setHeadArmour] = useState<{label: string, value: object }[] | null>(null)
  const [chestArmour, setChestArmour] = useState<{label: string, value: object }[] | null>(null)
  const [handsArmour, setHandsArmour] = useState<{label: string, value: object }[] | null>(null)
  const [legsArmour, setLegsArmour] = useState<{label: string, value: object }[] | null>(null)

  useEffect(() => {
    // Iterate through armour and set the states based upon armourType
    let headOptions: {label: string, value: object }[] = []
    let chestOptions: {label: string, value: object }[] = []
    let handsOptions: {label: string, value: object }[] = []
    let legsOptions: {label: string, value: object }[] = []

    armour.forEach((armourData) => {
      if (armourData && armourData.armourType) {

        const armourParams = { value: armourData, label: armourData.armourPiece }
        console.log(armourData.armourType)
        switch (armourData.armourType) {
          case 'Head':
            headOptions.push(armourParams)
            break;
          case 'Body':
            chestOptions.push(armourParams)
            break;
          case 'Hands':
            handsOptions.push(armourParams)
            break;
          case 'Legs':
            legsOptions.push(armourParams)
            break
          default: 
            break;
        }
      }
    })

    // Push arrays to states
    setHeadArmour(headOptions)
    setChestArmour(chestOptions)
    setHandsArmour(handsOptions)
    setLegsArmour(legsOptions)

  }, [])

  return (
    <div>
      <h1>Armour Selection</h1>
      <Select 
        id='head-armour'
        options={headArmour ?? []}
      />
      <Select 
        id='chest-armour'
        options={chestArmour ?? []}
      />
      <Select 
        id='hands-armour'
        options={handsArmour ?? []}
      />
      <Select 
        id='legs-armour'
        options={legsArmour ?? []}
      />
    </div>
  )
}