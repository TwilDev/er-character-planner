import React, { useState, useEffect } from 'react'
import CoreBuilder from '@/components/builder/CoreBuilder'
import CoreStats from '@/components/stats/CoreStats'

export default function Home() {
  //Base stats currently hardcoded for Vagabond
  const [baseStats, setBaseStats] = useState<IStats>({
    vigor: 15,
    mind: 10,
    endurance: 11,
    strength: 14,
    dexterity: 13,
    intelligence: 9,
    faith: 9,
    arcane: 7,
  })
  // Current User Build
  const [stats, setStats] = useState<IStats>(baseStats)

  //placeholder for stats that are changed
  const [changeStats, setChangeStats] = useState<IStats>(stats)

  //Stat Total for calculating specific defences and resistances
  const [total, setTotal] = useState<number>(Object.values(baseStats).reduce((acc, val) => acc + val, 0))

  //Current User Level
  const [level, setLevel] = useState(total - 79)

  const updateClassOnChange = (newClass: IStats) => {
    setBaseStats(newClass)
  }

  return (
    <main>
      <h1>Elden Ring Character Builder</h1>
      <div className="flex">
        <div className='flex w-[300px] flex-col items-center justify-center gap-4'>
          <CoreBuilder 
            // baseStats={baseStats}
            // setBaseStats={setBaseStats}
            // stats={stats}
            // setStats={setStats}
            // total={total}
            // setTotal={setTotal}
            // level={level}
            // setLevel={setLevel}
            // changeStats={changeStats}
            // setChangeStats={setChangeStats}
            // updateOnChangeClass={updateClassOnChange}
          />
        </div>
        <div className="flex w-[300px] flex-col items-center justify-center gap-4">
          <CoreStats 
            stats={stats}
            total={total}
          />
        </div>
      </div>


    </main>
  );
}

