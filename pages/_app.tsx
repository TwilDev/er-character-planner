import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ClassContextProvider } from '@/context/classContext'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ClassContextProvider>
      <Component {...pageProps} />
    </ClassContextProvider>
  )
}
