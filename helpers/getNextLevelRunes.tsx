export default function calculateNextRuneLevel(runeLevel: number, setNextLevelRunes: React.Dispatch<React.SetStateAction<number>>)  {
  const nextLevel = 0.02 * Math.pow(runeLevel, 3) + 3.06 * Math.pow(runeLevel, 2) + 105.6 * runeLevel - 895
  setNextLevelRunes(Math.floor(nextLevel))
}