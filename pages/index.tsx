import React, { useState, useEffect } from 'react'
import CoreStats from '@/components/builder/CoreStats'

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

  //Stat Total for calculating specific defences and resistances
  const [total, setTotal] = useState<number>(Object.values(baseStats).reduce((acc, val) => acc + val, 0))

  //Current User Level
  const [level, setLevel] = useState(total - 79)

  const validateStat = (stat: number) => {
    if (stat < 1 || isNaN(stat)) {
      return 1;
    }
    if (stat > 99) {
      return 99;
    }
    return stat;
  }

  return (
    <main>
      <h1>Elden Ring Character Builder</h1>
      <div className='flex w-[300px] flex-col items-center justify-center gap-4'>
        <CoreStats 
          baseStats={baseStats}
          stats={stats}
          setStats={setStats}
          total={total}
          setTotal={setTotal}
          level={level}
          setLevel={setLevel} 
        />
      </div>
    </main>
  );
}

