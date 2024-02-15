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
  const [totalAttackRating, setTotalAttackRating] = useState<number>(0)
  const [physicalBaseAttackRating, setPhysicalBaseAttackRating] = useState<number>(0)
  const [physicalScalingAttackRating, setPhysicalScalingAttackRating] = useState<number>(0)
  const [magicalBaseAttackRating, setMagicalBaseAttackRating] = useState<number>(0)
  const [magicalScalingAttackRating, setMagicalScalingAttackRating] = useState<number>(0)
  const [fireBaseAttackRating, setFireBaseAttackRating] = useState<number>(0)
  const [fireScalingAttackRating, setFireScalingAttackRating] = useState<number>(0)
  const [lightningBaseAttackRating, setLightningBaseAttackRating] = useState<number>(0)
  const [lightningScalingAttackRating, setLightningScalingAttackRating] = useState<number>(0)
  const [holyBaseAttackRating, setHolyBaseAttackRating] = useState<number>(0)
  const [holyScalingAttackRating, setHolyScalingAttackRating] = useState<number>(0)

  const [toggleShowDamageStats, setToggleShowDamageStats] = useState<boolean>(false)

  useEffect(() => {
    if (selectedWeapon) {
      // console.log(selectedWeapon)
      const weaponDamageValues = calculateWeaponDamage(selectedWeapon, totalStats)
      const { totalAttack, physicalBaseAttackRating, physicalScalingAttackRating, magicalBaseAttackRating, magicalScalingAttackRating, fireBaseAttackRating, fireScalingAttackRating, lightningBaseAttackRating, lightningScalingAttackRating, holyBaseAttackRating, holyScalingAttackRating } = weaponDamageValues
      setTotalAttackRating(totalAttack)
      setPhysicalBaseAttackRating(physicalBaseAttackRating)
      setPhysicalScalingAttackRating(physicalScalingAttackRating)
      setMagicalBaseAttackRating(magicalBaseAttackRating)
      setMagicalScalingAttackRating(magicalScalingAttackRating)
      setFireBaseAttackRating(fireBaseAttackRating)
      setFireScalingAttackRating(fireScalingAttackRating)
      setLightningBaseAttackRating(lightningBaseAttackRating)
      setLightningScalingAttackRating(lightningScalingAttackRating)
      setHolyBaseAttackRating(holyBaseAttackRating)
      setHolyScalingAttackRating(holyScalingAttackRating)
    }
  }, [selectedWeapon, totalStats]);

  const handleSelectWeapon = (selectedOption: any) => {
    setSelectedWeapon(selectedOption)
  }

  return (
    <div className="relative">
      <Select
        id={selectId}
        className="w-full mb-2"
        options={dataSet}
        placeholder={placeholder}
        onChange={handleSelectWeapon}
      />
      <p 
        onClick={() => setToggleShowDamageStats(!toggleShowDamageStats)}
        className="text-xs"
      >
        Total AR: {totalAttackRating.toFixed(0)}
      </p>
      {
        toggleShowDamageStats &&
        <div className="absolute right-[-115px] z-10 top-0">
          <div className="flex flex-col bg-white p-3 shadow-lg">
            <span>Physical: {`${physicalBaseAttackRating.toFixed(0)} + ${physicalScalingAttackRating.toFixed(0)}`}</span>
            <span>Magical: {`${magicalBaseAttackRating.toFixed(0)} + ${magicalScalingAttackRating.toFixed(0)}`}</span>
            <span>Fire: {`${fireBaseAttackRating.toFixed(0)} + ${fireScalingAttackRating.toFixed(0)}`}</span>
            <span>Lightning: {`${lightningBaseAttackRating.toFixed(0)} + ${lightningScalingAttackRating.toFixed(0)}`}</span>
            <span>Holy: {`${holyBaseAttackRating.toFixed(0)} + ${holyScalingAttackRating.toFixed(0)}`}</span>
          </div>
        </div>
      }

      <label htmlFor="requirements"></label>
    </div>
  )
}
