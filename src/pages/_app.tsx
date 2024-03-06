import '@/styles/globals.css'
import 'node_modules/flag-icons/css/flag-icons.min.css'

import { appWithTranslation } from 'next-i18next'
import type { AppProps } from 'next/app'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { SWRConfig } from 'swr'

function App({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig value={{ revalidateIfStale: false, shouldRetryOnError: false, }}>
      <div className='flex h-screen bg-[#F9F9F9]'>
        <Component {...pageProps} />
        <ToastContainer />
      </div>
    </SWRConfig>
  )
}

export default appWithTranslation(App)
