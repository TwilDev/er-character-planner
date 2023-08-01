import React, { useState, useEffect } from 'react';
import { HP, FP, END } from '../data/lookup';

export default function Home() {
  //Base stats currently hardcoded for Vagabond
  const [baseStats, setBaseStats] = useState<{ [key: string]: any}>({
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
  const [stats, setStats] = useState<{ [key: string]: any }>(baseStats)

  //Stat Total for calculating specific defences and resistances
  const [total, setTotal] = useState<number>(Object.values(baseStats).reduce((acc, val) => acc + val, 0))

  //Current User Level
  const [level, setLevel] = useState(total - 79)

  console.log(total)
  // useEffect(() => {
  //   setTotal(Object.values(stats).reduce((acc, val) => acc + val, 0))
  //   setLevel(Math.floor(total - 79))
  // }, [stats, total])

  const validateStat = (stat: number) => {
    if (stat < 1 || isNaN(stat)) {
      return 1;
    }
    if (stat > 99) {
      return 99;
    }
    return stat;
  }

  const updateStats = (stat: string, value: string) => {
    // Update stats on input change but don't validate yet
    const newStats = { ...stats };
    newStats[stat] = value === '' ? '' : parseInt(value);
    setStats(newStats)
  };

  const statChange = (stat: string, value: string) => {
    // Validate and update stats on input blur
    const validatedStat = validateStat(parseInt(value))
    const newStats = { ...stats }
    newStats[stat] = isNaN(validatedStat) ? '' : validatedStat
    setStats(newStats)
    setTotal(Object.values(stats).reduce((acc, val) => acc + val, 0))
    setLevel(Math.floor(total - 79))
  };

  return (
    <main>
      <h1>Elden Ring Character Builder</h1>
      <div className='flex w-[300px] flex-col items-center justify-center gap-4'>
        <div className='flex items-center w-full'>
          <label htmlFor='level'>Level</label>
          <input
            type='text'
            className='border-black border-2 ml-2'
            defaultValue={level}
          />
        </div>
        {Object.keys(baseStats).map((stat, i) => {
          const statValue = baseStats[stat];
          return (
            <div key={i} className='flex items-center w-full'>
              <label htmlFor={stat} className='capitalize mr-4'>
                {stat}
              </label>
              <small>{statValue}</small>
            </div>
          );
        })}
        {Object.keys(stats).map((stat, i) => {
          return (
            <input
              key={i}
              type='text'
              className='border-black border-2 ml-2'
              value={stats[stat]}
              onChange={(e) => updateStats(stat, e.target.value)}
              onBlur={(e) => statChange(stat, e.target.value)}
            />
          );
        })}
        <div>
          <label htmlFor='hp'>HP</label>
          <label className='ml-2'>{Math.floor(HP[stats.vigor - 1])}</label>
        </div>
        <div>
          <label htmlFor="fp">FP</label>
          <label className='ml-2'>{Math.floor(FP[stats.mind - 1])}</label>
        </div>
        <div>
          <label htmlFor="end">Stamina</label>
          <label className='ml-2'>{Math.floor(END[stats.endurance - 1])}</label>
        </div>
      </div>
    </main>
  );
}

