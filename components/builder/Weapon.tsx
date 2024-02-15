import Select from 'react-select'
import EquipParamWeapon from '@/data/weapons/EquipParamWeapon.json'
import calculateWeaponDamage from '@/helpers/calculateWeaponDamage'
import { useState, useEffect, useContext } from 'react'
import { ClassContext } from '@/context/classContext'


interface IWeaponProps {
  dataSet: any
  placeholder: string
  weaponSlot: string
}

export default function Weapon(props: IWeaponProps) {
  const { dataSet, placeholder, weaponSlot } = props
  // Obtain final Stats after all modifiers from equipment, runes, etc.
  const { totalStats } = useContext(ClassContext)

  const selectId = `weapon-${weaponSlot}`

  const [selectedWeapon, setSelectedWeapon] = useState<any>(null)
  const [weaponDamage, setWeaponDamage] = useState<number>(0)



  useEffect(() => {
    if (selectedWeapon) {
      // console.log(selectedWeapon)
      const damage = calculateWeaponDamage(selectedWeapon, totalStats)
      console.log(damage)
    }
  }, [selectedWeapon, totalStats]);

  const handleSelectWeapon = (selectedOption: any) => {
    setSelectedWeapon(selectedOption)
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
