import Select from 'react-select'
import weaponData from '@/data/weapons/weaponData.json'
import Weapon from '@/components/builder/weapon/Weapon'

export default function WeaponSelection() {

// Function to group weapon data by weapon class, excluding "Consumable" and "Reusable"
const groupByWeaponClass = (data: any) => {
  return data.reduce((acc: any, weapon: any) => {
    if (weapon.weaponClass !== "Consumable" && weapon.weaponClass !== "Reusable") {
      if (!acc[weapon.weaponClass]) {
        acc[weapon.weaponClass] = []
      }
      acc[weapon.weaponClass].push(weapon)
    }
    return acc
  }, {})
}

  // Function to format data for React Select
  const formatForReactSelect = (data: any) => {
    return Object.keys(data).map((weaponClass) => ({
      label: weaponClass,
      options: data[weaponClass].map((weapon: any) => ({
        ...weapon,
        value: weapon.weapon,
        label: weapon.weapon,
      })),
    }))
  }

// Group the weapon data by weapon class
const groupedData = groupByWeaponClass(weaponData)

// Format the data for React Select
const formattedData = formatForReactSelect(groupedData)
console.log(formattedData)

 return (
  <div className="w-full px-4">
    <h1>Weapon Selection</h1>
      <div className="flex gap-3">
        <div className="w-1/2 flex flex-col">
          <Weapon 
            dataSet={formattedData} 
            placeholder="Left Hand 1" 
            weaponSlot="lh1" 
          />
          <Weapon 
            dataSet={formattedData} 
            placeholder="Left Hand 2" 
            weaponSlot="lh2"
          />
          <Weapon 
            dataSet={formattedData} 
            placeholder="Left Hand 3" 
            weaponSlot="lh3"
          />
        </div>
        <div className="w-1/2 flex flex-col">
          <Weapon 
            dataSet={formattedData} 
            placeholder="Right Hand 1" 
            weaponSlot="rh1"
          />
          <Weapon 
            dataSet={formattedData} 
            placeholder="Right Hand 2" 
            weaponSlot="rh2"
          />
          <Weapon 
            dataSet={formattedData} 
            placeholder="Right Hand 3" 
            weaponSlot="rh3"
          />
        </div>
      </div>
  </div>
 )
}