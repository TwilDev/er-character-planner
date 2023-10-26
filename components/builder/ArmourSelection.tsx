import Select from 'react-select'
import { useState, useEffect, useContext } from 'react'
import { ArmourContext } from '@/context/armourContext'
import { armour } from '@/data/armour/armourData.json'

export default function ArmourSelection() {

  // Values for each dropdown - all Armour pieces in the game
  const [headOptions, setHeadOptions] = useState<IArmourPiece[] | null>(null)
  const [chestOptions, setChestOptions] = useState<IArmourPiece[] | null>(null)
  const [handsOptions, setHandsOptions] = useState<IArmourPiece[] | null>(null)
  const [legsOptions, setLegsOptions] = useState<IArmourPiece[] | null>(null)

  const { selectArmour } = useContext(ArmourContext)

  useEffect(() => {
    // Iterate through armour and set the states based upon armourType
    let headOptions: IArmourPiece[] = []
    let chestOptions: IArmourPiece[] = []
    let handsOptions: IArmourPiece[] = []
    let legsOptions: IArmourPiece[] = []

    armour.forEach((armourData) => {
      if (armourData && armourData.armourType) {

        const armourParams = { value: armourData, label: armourData.armourPiece }
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
    setHeadOptions(headOptions)
    setChestOptions(chestOptions)
    setHandsOptions(handsOptions)
    setLegsOptions(legsOptions)

  }, [])

  return (
    <div className="w-full p-4">
      <h1>Armour Selection</h1>
      <Select 
        id='head-armour'
        className="w-full"
        options={headOptions ?? []}
        onChange={(selectedOption: any) => selectArmour(selectedOption)}
      />
      <Select 
        id='chest-armour'
        options={chestOptions ?? []}
        onChange={(selectedOption: any) => selectArmour(selectedOption)}
      />
      <Select 
        id='hands-armour'
        options={handsOptions ?? []}
        onChange={(selectedOption: any) => selectArmour(selectedOption)}
      />
      <Select 
        id='legs-armour'
        options={legsOptions ?? []}
        onChange={(selectedOption: any) => selectArmour(selectedOption)}
      />
    </div>
  )
}