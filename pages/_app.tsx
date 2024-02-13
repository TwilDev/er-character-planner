import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { CharacterContextProvider } from '@/context/characterContext'
import { ClassContextProvider } from '@/context/classContext'
import { EquipmentContextProvider } from '@/context/equipmentContext'
import { EffectContextProvider } from '@/context/effectContext'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CharacterContextProvider>
      <EquipmentContextProvider>
        <EffectContextProvider>
          <ClassContextProvider>
            <Component {...pageProps} />
          </ClassContextProvider>
        </EffectContextProvider>
      </EquipmentContextProvider>
    </CharacterContextProvider>
  )
}
