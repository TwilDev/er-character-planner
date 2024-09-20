import Select from 'react-select'
import { useState } from 'react'
import AffinitySelection from './AffinitySelection'
import WeaponUpgradeSelector from './WeaponUpgradeSelector'
import useWeapons from '@/hooks/equipment/useWeapons'

interface IWeaponProps {
  dataSet: any
  placeholder: string
  weaponSlot: string
}

export default function Weapon(props: IWeaponProps) {
  const { dataSet, placeholder, weaponSlot } = props

  const {
    handleSelectWeapon,
    weaponStatRequirements,
    meetsStatRequirements,
    weaponAttackRatings,
    scalingValues,
    affinity,
    setAffinity,
    upgradeLevel,
    setUpgradeLevel
  } = useWeapons(weaponSlot)
  const selectId = `weapon-${weaponSlot}`
  
  // Toggle to show damage stats
  const [toggleShowDamageStats, setToggleShowDamageStats] = useState<boolean>(false)
  
  return (
    <div className="relative">
      <Select
        id={selectId}
        className="w-full mb-0 pb-0"
        options={dataSet}
        placeholder={placeholder}
        onChange={() => handleSelectWeapon}
      />
      <div className="flex justify-between mb-4">
        <p className="text-xs">
          { 
            // If weaponStatRequirements is not null, show the stat requirements like this STRNumber/DEXNumber/INTNumber/FAINumber/ARCNumber
            weaponStatRequirements &&
              
            `${meetsStatRequirements ? '' : 'Req'} ${weaponStatRequirements.strength}/${weaponStatRequirements.dexterity}/${weaponStatRequirements.intelligence}/${weaponStatRequirements.faith}/${weaponStatRequirements.arcane}` 
          }
        </p>
        {
          // If weaponStatRequirements is not null, check if the character has the required stats to wield the weapon
          weaponStatRequirements && meetsStatRequirements &&
          <p 
            onMouseEnter={() => setToggleShowDamageStats(true)}
            onMouseLeave={() => setToggleShowDamageStats(false)}
            className="text-xs"
          >
            Total AR: {weaponAttackRatings.totalAttackRating.toFixed(0)}
          </p>
        }
      </div>
      {
        toggleShowDamageStats &&
        <div className="absolute right-[-115px] z-10 top-0">
          <div className="flex flex-col bg-white p-3 shadow-lg">
            <span>Physical: {`${weaponAttackRatings.physicalBaseAttackRating.toFixed(0)} + ${weaponAttackRatings.physicalScalingAttackRating.toFixed(0)}`}</span>
            <span>Magical: {`${weaponAttackRatings.magicalBaseAttackRating.toFixed(0)} + ${weaponAttackRatings.magicalScalingAttackRating.toFixed(0)}`}</span>
            <span>Fire: {`${weaponAttackRatings.fireBaseAttackRating.toFixed(0)} + ${weaponAttackRatings.fireScalingAttackRating.toFixed(0)}`}</span>
            <span>Lightning: {`${weaponAttackRatings.lightningBaseAttackRating.toFixed(0)} + ${weaponAttackRatings.lightningScalingAttackRating.toFixed(0)}`}</span>
            <span>Holy: {`${weaponAttackRatings.holyBaseAttackRating.toFixed(0)} + ${weaponAttackRatings.holyScalingAttackRating.toFixed(0)}`}</span>

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
      <div className="w-full flex">
        <AffinitySelection 
          weaponSlot={weaponSlot}
          setAffinity={setAffinity}
          affinity={affinity}
  
        />
        <WeaponUpgradeSelector 
          weaponSlot={weaponSlot}
          setUpgradeLevel={setUpgradeLevel}
          upgradeLevel={upgradeLevel}
        />
      </div>
    </div>
  )
}

