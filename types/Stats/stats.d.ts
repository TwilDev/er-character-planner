interface IStats{
  vigor: number
  mind: number
  endurance: number
  strength: number
  dexterity: number
  intelligence: number
  faith: number
  arcane: number
}

type IOffensiveScalingStats = Omit<IStats, 'vigor' | 'mind' | 'endurance'>