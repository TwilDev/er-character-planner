import { armourProtectorParams } from '@/data/armour/armourParamProtector.json'
import { CharacterContext } from '@/context/characterContext'
import { EffectContext } from '@/context/effectContext'
import { useState, useContext, useEffect } from 'react'

// Calculate Armour DamageCutRate
function calculateAbsorption(armour: IArmour, damageType: string): number {
  const damageCutRates = Object.values(armour).map((value) => {
    if (!value) return 1
    const armourPiece = armourProtectorParams.find(
      (armourPiece) => armourPiece.ID === value.value.id
    ) as any // Use type assertion
    return armourPiece ? armourPiece[damageType] : 1
  })

  return damageCutRates.length ? damageCutRates.reduce((a, b) => a * b, 1) : 1
}

// // Generic function to calculate the absorption of effects
function calculateEffectAbsorption(
  effects: IEffect[],
  damageType: keyof IEffect
): number {
  let damageRates: number[] = []

  // Iterate throughout all effects and calculate the absorption
  for (const effect of effects) {
    let damageRate: any = effect ? effect[damageType] : 1
    damageRates.push(damageRate)
  }

  // Return the sum of all effects for the specified damage rate or return 1 if no effects
  return damageRates && damageRates.length
    ? damageRates.reduce((a, b) => a * b)
    : 1
}

export default function useCalculateAbsorption() {
  const { headArmour, bodyArmour, handsArmour, legsArmour } =
    useContext(CharacterContext)
  const { effects } = useContext(EffectContext)

  const [absorptionValues, setAbsorptionValues] = useState<{
    physical: string
    strike: string
    slash: string
    pierce: string
    magical: string
    fire: string
    lightning: string
    holy: string
  }>({
    physical: '0.000',
    strike: '0.000',
    slash: '0.000',
    pierce: '0.000',
    magical: '0.000',
    fire: '0.000',
    lightning: '0.000',
    holy: '0.000',
  })

  useEffect(() => {
    const armour: IArmour = {
      head: headArmour,
      body: bodyArmour,
      hands: handsArmour,
      legs: legsArmour,
    }

    const caluclateAndSetAbsorption = (
      damageType: string,
      effectType: keyof IEffect,
      key: keyof typeof absorptionValues
    ) => {
      const armourValues = calculateAbsorption(armour, damageType)
      const effectValues = calculateEffectAbsorption(effects, effectType)
      const sum = armourValues * effectValues
      setAbsorptionValues((prevState) => ({
        ...prevState,
        [key]: (100 * (1 - sum)).toFixed(3),
      }))
    }

    caluclateAndSetAbsorption('neutralDamageCutRate', 'physCutRate', 'physical')
    caluclateAndSetAbsorption('blowDamageCutRate', 'strikeCutRate', 'strike')
    caluclateAndSetAbsorption('slashDamageCutRate', 'slashCutRate', 'slash')
    caluclateAndSetAbsorption('thrustDamageCutRate', 'pierceCutRate', 'pierce')
    caluclateAndSetAbsorption('magicDamageCutRate', 'magCutRate', 'magical')
    caluclateAndSetAbsorption('fireDamageCutRate', 'fireCutRate', 'fire')
    caluclateAndSetAbsorption(
      'thunderDamageCutRate',
      'lightningCutRate',
      'lightning'
    )
    caluclateAndSetAbsorption('darkDamageCutRate', 'holyCutRate', 'holy')
  }, [effects, headArmour, bodyArmour, handsArmour, legsArmour])

  return absorptionValues
}
