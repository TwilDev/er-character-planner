import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ClassContextProvider } from '@/context/classContext'
import { EquipmentContextProvider } from '@/context/equipmentContext'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <EquipmentContextProvider>
      <ClassContextProvider>
        <Component {...pageProps} />
      </ClassContextProvider>
    </EquipmentContextProvider>
  )
}
