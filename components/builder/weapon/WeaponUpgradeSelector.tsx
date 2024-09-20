import { useEffect, useState, useContext } from 'react'
import { CharacterContext } from '@/context/characterContext'
import Select from 'react-select'

interface IWeaponUpgradeSelectorProps {
  weaponSlot: string
  setUpgradeLevel: React.Dispatch<React.SetStateAction<number>>
  upgradeLevel: number
}
export default function WeaponUpgradeSelector(
  props: IWeaponUpgradeSelectorProps
) {
  const { weaponSlot, setUpgradeLevel, upgradeLevel } = props
  const { rh1, rh2, rh3, lh1, lh2, lh3 } = useContext(CharacterContext)

  // Dynamically obtain the weapon data based on the weaponSlot prop
  const weaponData = {
    rh1,
    rh2,
    rh3,
    lh1,
    lh2,
    lh3,
  }[weaponSlot]

  const [upgradeOptions, setUpgradeOptions] = useState<
    { value: number; label: string }[]
  >([])

  useEffect(() => {
    if (weaponData && weaponData.isReinforce) {
      setUpgradeLevel(0)
      const maxUpgradeLevel = weaponData.isInfuse ? 26 : 11
      const options = Array.from({ length: maxUpgradeLevel }, (_, i) => i)
      // Format the options for React Select
      const formattedOptions = options.map((option) => ({
        value: option,
        label: `+${option}`,
      }))

      setUpgradeOptions(formattedOptions)
    }
  }, [weaponData, setUpgradeLevel])

  return (
    <div className="w-2/5">
      <Select
        isDisabled={!weaponData || !weaponData.isReinforce}
        options={upgradeOptions}
        onChange={(selectedOption) => setUpgradeLevel(selectedOption!.value)}
        value={
          upgradeOptions.find((option) => option.value === upgradeLevel) ?? null
        }
        placeholder="+0"
      />
    </div>
  )
}
