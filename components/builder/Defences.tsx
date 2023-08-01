// Get lookup tables from JSON files
const defTable = require('@/data/defence.json')
const { defFlat, defStrAdj, defIntAdj, defFire, defHoly } = defTable
const resistancesTable = require('@/data/resistances.json')
const { imFlat, imAdj, robFlat, robAdj, focFlat, focAdj, vitFlat, vitAdj } = resistancesTable

interface IDefenceProps {
  total: number,
  stats: IStats
}

export default function Defences({total, stats}: IDefenceProps) {
  return (
    <div>
      <div className="mt-2">
        <div>
          <label htmlFor="physicalDefence">Physical Defence</label>
          <label className='ml-2'>{Math.floor(defFlat[total - 1] + defStrAdj[stats.strength - 1])}</label>
        </div>
        <div>
          <label htmlFor="magicDefence">Magic Defence</label>
          <label className='ml-2'>{Math.floor(defFlat[total - 1] + defIntAdj[stats.intelligence - 1])}</label>
        </div>
        <div>
          <label htmlFor="fireDefence">Fire Defence</label>
          <label className='ml-2'>{Math.floor(defFlat[total - 1] + defFire[stats.vigor - 1])}</label>
        </div>
        <div>
          <label htmlFor="lightningDefence">Lightning Defence</label>
          <label className='ml-2'>{Math.floor(defFlat[total - 1])}</label>
        </div>
        <div>
          <label htmlFor="holyDefence">Holy Defence</label>
          <label className='ml-2'>{Math.floor(defFlat[total - 1] + defHoly[stats.arcane - 1])}</label>
        </div>
      </div>
      <div className="mt-2">
        <div>
          <label htmlFor="immunityResistance">Immunity</label>
          <label className='ml-2'>{Math.floor(imFlat[total - 1] + imAdj[stats.vigor - 1])}</label>
        </div>
        <div>
          <label htmlFor="robustnessResistance">Robustness</label>
          <label className='ml-2'>{Math.floor(robFlat[total - 1] + robAdj[stats.endurance - 1])}</label>
        </div>
        <div>
          <label htmlFor="focusResistance">Focus</label>
          <label className='ml-2'>{Math.floor(focFlat[total - 1] + focAdj[stats.mind - 1])}</label>
        </div>
        <div>
          <label htmlFor="vitalityResistance">Vitality</label>
          <label className='ml-2'>{Math.floor(vitFlat[total - 1] + vitAdj[stats.arcane - 1])}</label>
        </div>
      </div> 
    </div>
  )
}