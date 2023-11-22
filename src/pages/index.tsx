import { Inter } from 'next/font/google'
import { useTranslation } from 'react-i18next'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const { t } = useTranslation('common')
  return <main>{t('this is home page')}</main>
}
