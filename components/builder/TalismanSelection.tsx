import Select from 'react-select'
import useTalismans from '@/hooks/equipment/useTalismans'

export default function TalismanSelection() {
  const { talismanOptions, selectTalisman } = useTalismans()

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