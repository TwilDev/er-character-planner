import Select from 'react-select'
import useArmour from '@/hooks/equipment/useArmour'

export default function ArmourSelection() {
  const { armourOptions, selectArmour } =
    useArmour()

  return (
    <div className="w-full p-2 px-4">
      <h1>Armour Selection</h1>
      <Select
        id="head-armour"
        className="w-full mb-2"
        options={armourOptions.head ?? []}
        placeholder="Head"
        onChange={(selectedOption: any) => selectArmour(selectedOption)}
      />
      <Select
        id="chest-armour"
        className="w-full mb-2"
        options={armourOptions.chest ?? []}
        placeholder="Chest"
        onChange={(selectedOption: any) => selectArmour(selectedOption)}
      />
      <Select
        id="hands-armour"
        className="w-full mb-2"
        options={armourOptions.hands ?? []}
        placeholder="Hands"
        onChange={(selectedOption: any) => selectArmour(selectedOption)}
      />
      <Select
        id="legs-armour"
        className="w-full mb-2"
        options={armourOptions.legs ?? []}
        placeholder="Legs"
        onChange={(selectedOption: any) => selectArmour(selectedOption)}
      />
    </div>
  )
}
