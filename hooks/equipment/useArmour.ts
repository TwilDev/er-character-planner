import { CharacterContext } from '@/context/characterContext'
import { useState, useEffect, useContext } from 'react'
import { armour } from '@/data/armour/armourData.json'

export default function useArmour() {

  // Values for each dropdown - all Armour pieces in the game
  const [armourOptions, setArmourOptions] = useState<{
    head: IArmourPiece[] | null,
    chest: IArmourPiece[] | null,
    hands: IArmourPiece[] | null,
    legs: IArmourPiece[] | null
  }>({
    head: null,
    chest: null,
    hands: null,
    legs: null
  });

  useEffect(() => {
    const armourMap = new Map<string, IArmourPiece[]>();

    armour.forEach((armourData) => {
      if (armourData && armourData.armourType) {
        const armourParams = { value: armourData, label: armourData.armourPiece };
        if (!armourMap.has(armourData.armourType)) {
          armourMap.set(armourData.armourType, []);
        }
        armourMap.get(armourData.armourType)?.push(armourParams);
      }
    });

    setArmourOptions({
      head: armourMap.get('Head') || null,
      chest: armourMap.get('Body') || null,
      hands: armourMap.get('Hands') || null,
      legs: armourMap.get('Legs') || null
    });
  }, []);

  const { 
    headArmour, 
    setHeadArmour, 
    bodyArmour, 
    setBodyArmour, 
    handsArmour, 
    setHandsArmour, 
    legsArmour, 
    setLegsArmour
  } = useContext(CharacterContext)

  const selectArmour = (armourPiece: IArmourPiece) => {
    switch (armourPiece.value.armourType) {
      case 'Head':
        setHeadArmour(armourPiece)
        break;
      case 'Body':
        setBodyArmour(armourPiece)
        break;
      case 'Hands':
        setHandsArmour(armourPiece)
        break;
      case 'Legs':
        setLegsArmour(armourPiece)
        break
      default:
        break;
    }
  }

  return {
    armourOptions,
    selectArmour
  }
}