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
  head: IArmourPiece
  chest: IArmourPiece
  hands: IArmourPiece
  legs: IArmourPiece
}

interface IArmourPiece {
  label: string, 
  value: {
    armourType: string,
    armourPiece: string,
    id: number
  } 
}
