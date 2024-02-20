import Weapon from './Weapon'
import AffinitySelection from './AffinitySelection'
import { useState } from 'react'

interface IWeaponProps {
  dataSet: any
  placeholder: string
  weaponSlot: string
}

export default function WeaponWrapper(props: IWeaponProps) {
  const [affinity, setAffinity] = useState<number>(0)
  const [selectedWeapon, setSelectedWeapon] = useState<any>(null)

  return (
    <div className="weapon-wrapper">
      <Weapon 
        {...props} 
        setAffinity={setAffinity} 
        affinity={affinity}
        selectedWeapon={selectedWeapon}
        setSelectedWeapon={setSelectedWeapon}
      />
      <AffinitySelection 
        affinity={affinity}
        setAffinity={setAffinity}
        weaponSlot={props.weaponSlot} 
      />
    </div>
  )
}