import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SidebarNavigation } from '../components/SidebarNavigation'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <> 
      <SidebarNavigation />
       <Component {...pageProps} />
    </>
   
  )
}

export default MyApp
