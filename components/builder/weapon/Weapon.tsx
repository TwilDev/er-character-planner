import Select from 'react-select'
import EquipParamWeapon from '@/data/weapons/EquipParamWeapon.json'
import calculateWeaponDamage from '@/helpers/calculateWeaponDamage'
import { useState, useEffect, useContext } from 'react'
import { ClassContext } from '@/context/classContext'
import { EquipmentContext } from '@/context/equipmentContext'
import calculateGetWeaponScaling from '@/helpers/calculateGetWeaponScaling'
import getWeaponStatRequirements from '@/helpers/getWeaponStatRequirements'
import AffinitySelection from './AffinitySelection'

interface IWeaponProps {
  dataSet: any
  placeholder: string
  weaponSlot: string
}

export default function Weapon(props: IWeaponProps) {
  const { dataSet, placeholder, weaponSlot } = props
  // Obtain final Stats after all modifiers from equipment, runes, etc.

  const { selectWeapon } = useContext(EquipmentContext)
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

  const [scalingValues, setScalingValues] = useState<any>(null)
  const [weaponStatRequirements, setWeaponStatRequirements] = useState<any>(null)
  const [affinity, setAffinity] = useState<number>(0)

  useEffect(() => {
    if (selectedWeapon) {
      // Update context with selected weapon
      selectWeapon(selectedWeapon, weaponSlot, affinity)

      // Get weapon damage values
      const weaponDamageValues = calculateWeaponDamage(selectedWeapon, totalStats, affinity)
      // Set weapon damage values to state
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

      // Get weapon scaling values
      const weaponScalingValues = calculateGetWeaponScaling(selectedWeapon, 0, 0, totalStats)
      setScalingValues(weaponScalingValues)

      // Get weapon stat requirements
      const weaponStatRequirements = getWeaponStatRequirements(selectedWeapon, 0) 
      setWeaponStatRequirements(weaponStatRequirements)
    }
  }, [selectedWeapon, totalStats, affinity]);

  const handleSelectWeapon = (selectedOption: any) => {
    setSelectedWeapon(selectedOption)
  }

  return (
    <div className="relative">
      <Select
        id={selectId}
        className="w-full mb-0 pb-0"
        options={dataSet}
        placeholder={placeholder}
        onChange={handleSelectWeapon}
      />
      <div className="flex justify-between mb-4">
        <p className="text-xs">
          { 
            // If weaponStatRequirements is not null, show the stat requirements like this STRNumber/DEXNumber/INTNumber/FAINumber/ARCNumber
            weaponStatRequirements &&
            `${weaponStatRequirements.strength}/${weaponStatRequirements.dexterity}/${weaponStatRequirements.intelligence}/${weaponStatRequirements.faith}/${weaponStatRequirements.arcane}` 
          }
        </p>
        <p 
          onMouseEnter={() => setToggleShowDamageStats(true)}
          onMouseLeave={() => setToggleShowDamageStats(false)}
          className="text-xs"
        >
          Total AR: {totalAttackRating.toFixed(0)}
        </p>
      </div>

      {
        toggleShowDamageStats &&
        <div className="absolute right-[-115px] z-10 top-0">
          <div className="flex flex-col bg-white p-3 shadow-lg">
            <span>Physical: {`${physicalBaseAttackRating.toFixed(0)} + ${physicalScalingAttackRating.toFixed(0)}`}</span>
            <span>Magical: {`${magicalBaseAttackRating.toFixed(0)} + ${magicalScalingAttackRating.toFixed(0)}`}</span>
            <span>Fire: {`${fireBaseAttackRating.toFixed(0)} + ${fireScalingAttackRating.toFixed(0)}`}</span>
            <span>Lightning: {`${lightningBaseAttackRating.toFixed(0)} + ${lightningScalingAttackRating.toFixed(0)}`}</span>
            <span>Holy: {`${holyBaseAttackRating.toFixed(0)} + ${holyScalingAttackRating.toFixed(0)}`}</span>

            <div className="flex flex-col">
              <p>Scaling</p>
              {/* iterate through object and check if scaling true val is above 0 and if so show the letter */}
              {
                scalingValues &&
                Object.keys(scalingValues).map((key: string, index: number) => {
                  const scaling = scalingValues[key]
                  if (scaling.trueVal > 0) 
                    return (
                      <span key={index}>
                        <span className="capitalize">{key} </span>
                        <span>{scaling.trueVal > 0 ? scaling.letter : '---'}</span>
                      </span>
                    )
                })
              }
            </div>
          </div>
        </div>
      }
      <AffinitySelection 
        weaponSlot={weaponSlot}
        setAffinity={setAffinity}
        affinity={affinity}
      />
    </div>
  )
}

