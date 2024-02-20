import { useEffect, useState, useContext } from 'react'
import { EquipmentContext } from '@/context/equipmentContext'
import Select from 'react-select'


interface IWeaponUpgradeSelectorProps {
  weaponSlot: string
  setUpgradeLevel: React.Dispatch<React.SetStateAction<number>>
  upgradeLevel: number
}
export default function WeaponUpgradeSelector(props: IWeaponUpgradeSelectorProps) {
  const { weaponSlot, setUpgradeLevel, upgradeLevel } = props
  const { weapons } = useContext(EquipmentContext)
  const weaponData = weapons[weaponSlot]

  const [upgradeOptions, setUpgradeOptions] = useState<{ value: number; label: string; }[]>([])

  useEffect(() => {
    if (weaponData && weaponData.isReinforce) {
      setUpgradeLevel(0)
      const maxUpgradeLevel = weaponData.isInfuse ? 26 : 11
      const options = Array.from({ length: maxUpgradeLevel }, (_, i) => i)
      // Format the options for React Select
      const formattedOptions = options.map((option) => ({
        value: option,
        label: `+${option}`
      }))

      setUpgradeOptions(formattedOptions)
    }
  }, [weaponData])

  return (
    <div>
      <Select
        isDisabled={!weaponData || !weaponData.isReinforce}
        options={upgradeOptions}
        onChange={(selectedOption) => setUpgradeLevel(selectedOption!.value)}
        value={upgradeOptions.find((option) => option.value === upgradeLevel) ?? null}
        placeholder="+0"
      />
    </div>
  )
}