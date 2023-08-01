import React, { useState, useEffect } from 'react';
import { HP } from '../data/lookup';

export default function Home() {
  const [baseStats, setBaseStats] = useState<{ [key: string]: any}>({
    vigor: 15,
    mind: 10,
    endurance: 11,
    strength: 14,
    dexterity: 13,
    intelligence: 9,
    faith: 9,
    arcane: 7,
  });

  const [stats, setStats] = useState<{ [key: string]: any }>(baseStats);

  const validateStat = (stat: number) => {
    if (stat < 1 || isNaN(stat)) {
      return 1;
    }
    if (stat > 99) {
      return 99;
    }
    return stat;
  };

  const updateStats = (stat: string, value: string) => {
    // Update stats on input change but don't validate yet
    const newStats = { ...stats };
    newStats[stat] = value === '' ? '' : parseInt(value);
    setStats(newStats);
  };

  const statChange = (stat: string, value: string) => {
    // Validate and update stats on input blur
    const validatedStat = validateStat(parseInt(value));
    const newStats = { ...stats };
    newStats[stat] = isNaN(validatedStat) ? '' : validatedStat;
    setStats(newStats);
  };

  return (
    <main>
      <h1>Elden Ring Character Builder</h1>
      <div className='flex w-[300px] flex-col items-center justify-center gap-4'>
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
      </div>
    </main>
  );
}

