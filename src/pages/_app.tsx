import '@/styles/globals.css'

import { appWithTranslation } from 'next-i18next'
import type { AppProps } from 'next/app'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App({ Component, pageProps }: AppProps) {
  return (
    <div className='flex h-screen bg-[#F9F9F9]'>
      <Component {...pageProps} />
      <ToastContainer />
    </div>
  )
}

export default appWithTranslation(App)
