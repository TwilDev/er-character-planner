import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ClassContextProvider } from '@/context/classContext'
import { ArmourContextProvider } from '@/context/armourContext'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ArmourContextProvider>
      <ClassContextProvider>
        <Component {...pageProps} />
      </ClassContextProvider>
    </ArmourContextProvider>
  )
}
