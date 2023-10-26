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

interface ITalismanSlots {
  slot1: ITalisman | null
  slot2: ITalisman | null
  slot3: ITalisman | null
  slot4: ITalisman | null
}


interface ITalisman {
  value: {
    Talisman: string
    ID: number
    accessoryGroup: number
  }
  label: string
}