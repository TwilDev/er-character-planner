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

interface IArmour {
  head: IArmourPiece | null
  body: IArmourPiece | null
  hands: IArmourPiece | null
  legs: IArmourPiece | null
}

interface IArmourPiece {
  label: string, 
  value: {
    armourType: string,
    armourPiece: string,
    id: number
  } 
}
