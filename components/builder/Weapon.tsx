import Select from 'react-select'
import EquipParamWeapon from '@/data/weapons/EquipParamWeapon.json'

interface IWeaponProps {
  dataSet: any
  placeholder: string
  weaponSlot: string
}

export default function Weapon(props: IWeaponProps) {
  const { dataSet, placeholder, weaponSlot  } = props
  const selectId = `weapon-${weaponSlot}`

  const handleSelectWeapon = (selectedOption: any) => {
    console.log(selectedOption)
  }

  return (
    <div>
      <Select 
        id={selectId}
        className="w-full mb-2"
        options={dataSet}
        placeholder={placeholder}
        onChange={handleSelectWeapon}
      />
      <label htmlFor="requirements"></label>
    </div>
  )
}