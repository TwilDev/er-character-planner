import Select from 'react-select'
import { useState, useEffect, useContext } from 'react'
import { EquipmentContext } from '@/context/equipmentContext'
import { armour } from '@/data/armour/armourData.json'

export default function ArmourSelection() {

  // Values for each dropdown - all Armour pieces in the game
  const [headOptions, setHeadOptions] = useState<IArmourPiece[] | null>(null)
  const [chestOptions, setChestOptions] = useState<IArmourPiece[] | null>(null)
  const [handsOptions, setHandsOptions] = useState<IArmourPiece[] | null>(null)
  const [legsOptions, setLegsOptions] = useState<IArmourPiece[] | null>(null)

  const { selectArmour } = useContext(EquipmentContext)

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
    <div className="w-full p-2 px-4">
      <h1>Armour Selection</h1>
      <Select 
        id='head-armour'
        className="w-full mb-2"
        options={headOptions ?? []}
        placeholder='Head'
        onChange={(selectedOption: any) => selectArmour(selectedOption)}
      />
      <Select 
        id='chest-armour'
        className="w-full mb-2"
        options={chestOptions ?? []}
        placeholder='Chest'
        onChange={(selectedOption: any) => selectArmour(selectedOption)}
      />
      <Select 
        id='hands-armour'
        className="w-full mb-2"
        options={handsOptions ?? []}
        placeholder='Hands'
        onChange={(selectedOption: any) => selectArmour(selectedOption)}
      />
      <Select 
        id='legs-armour'
        className="w-full mb-2"
        options={legsOptions ?? []}
        placeholder='Legs'
        onChange={(selectedOption: any) => selectArmour(selectedOption)}
      />
    </div>
  )
}