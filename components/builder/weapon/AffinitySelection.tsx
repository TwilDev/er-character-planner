import Select from 'react-select'
import EquipParamWeapon from '@/data/weapons/EquipParamWeapon.json'
import { useState, useEffect, useContext } from 'react'
import { EquipmentContext } from '@/context/equipmentContext'
import affinityLookup from '@/data/weapons/affinityLookup.json'

interface IAffinitySelectionProps {
  weaponSlot: string
  setAffinity: React.Dispatch<React.SetStateAction<number>>
  affinity: number
}

export default function AffinitySelection(props: IAffinitySelectionProps) {
  const { weaponSlot, setAffinity, affinity } = props
  const [affinityOptions, setAffinityOptions] = useState<{ infusion: string, offset: number }[]>([])
  const { weapons } = useContext(EquipmentContext)
  const weaponData = weapons[weaponSlot]

  useEffect (() => {
    if (weaponData) {
      const isInfusable = weaponData.isInfuse
      setAffinity(0)
      if (isInfusable) {
        console.log("Weapon is infusable")
        setAffinityOptions(affinityLookup)
      } else {
        console.log("Weapon is not infusable")
        setAffinityOptions([])
      }
    }
  }, [weaponData, setAffinity])

  const handleAffinityChange = (selectedOption: any) => {
    if (selectedOption) {
      console.log(selectedOption.offset)
      setAffinity(selectedOption.offset)
    }
  }

  return (
    <div className="w-3/5">
      <Select
        isDisabled={!weaponData || !weaponData.isInfuse}
        options={affinityOptions ?? []}
        onChange={(selectedOption) => handleAffinityChange(selectedOption)}
        getOptionLabel={(option) => option.infusion}
        getOptionValue={(option) => option.offset.toString()}
        value={affinityOptions.find((option) => option.offset === affinity) ?? null}
        placeholder="Infusion"
      />
    </div>
  )
}
