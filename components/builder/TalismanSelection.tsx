import Select from 'react-select'
import { useState, useEffect, useContext } from 'react'
import { talismans } from '@/data/talismans/talismanData.json'

interface ITalisman {
  value: {
    Talisman: string
    ID: number
    accessoryGroup: number
  }
  label: string
}

export default function TalismanSelection() {

  // Values for each dropdown - all talismans in the ggame
  const [talismanOptions, setTalismanOptions] = useState<ITalisman[]>([])

  useEffect(() => {
    talismans.forEach((talismanData) => { 
      if (talismanData && talismanData.Talisman) {
        const talismanParams: ITalisman = { value: talismanData, label: talismanData.Talisman }
        talismanOptions.push(talismanParams)
      }
    })
  }, [])

  return (
    <div className="w-full p-4">
      <h1>Talismans</h1>
      <Select 
        id='talisman-1'
        options={talismanOptions ?? []}
        // onChange={(selectedOption: any) => selectArmour(selectedOption)}
      />
      <Select 
        id='talisman-2'
        options={talismanOptions ?? []}
      />
      <Select 
        id='talisman-3'
        options={talismanOptions ?? []}
      />
      <Select 
        id='talisman-4'
        options={talismanOptions ?? []}
      />
    </div>
  )
}