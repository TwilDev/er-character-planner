import Select from 'react-select'
import { useState, useEffect, useContext } from 'react'
import { talismans } from '@/data/talismans/talismanData.json'
import { EquipmentContext } from '@/context/equipmentContext'

export default function TalismanSelection() {

  const { selectTalisman } = useContext(EquipmentContext)

  // Values for each dropdown - all talismans in the ggame
  const [talismanOptions, setTalismanOptions] = useState<ITalisman[]>([])

  useEffect(() => {
    talismans.forEach((talismanData) => { 
      if (talismanData && talismanData.Talisman) {
        const talismanParams: ITalisman = { value: talismanData, label: talismanData.Talisman }
        setTalismanOptions(talismanOptions => [...talismanOptions, talismanParams])
      }
    })
  }, [])

  return (
    <div className="w-full px-4">
      <h1>Talismans</h1>
      <Select 
        id='talisman-1'
        className="w-full mb-2"
        options={talismanOptions ?? []}
        onChange={(selectedOption: any) => selectTalisman(selectedOption, 'slot1')}
      />
      <Select 
        id='talisman-2'
        className="w-full mb-2"
        options={talismanOptions ?? []}
        onChange={(selectedOption: any) => selectTalisman(selectedOption, 'slot2')}
      />
      <Select 
        id='talisman-3'
        className="w-full mb-2"
        options={talismanOptions ?? []}
        onChange={(selectedOption: any) => selectTalisman(selectedOption, 'slot3')}
      />
      <Select 
        id='talisman-4'
        className="w-full mb-2"
        options={talismanOptions ?? []}
        onChange={(selectedOption: any) => selectTalisman(selectedOption, 'slot4')}
      />
    </div>
  )
}