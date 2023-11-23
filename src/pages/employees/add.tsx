import EmployeeForm from '@/components/EmployeeForm'
import BaseLayout from '@/components/layouts/BaseLayout'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const EmployeeAddPage = () => {
  const { t } = useTranslation()
  return (
    <BaseLayout>
      <h1 className='text-2xl font-semibold capitalize'>{t('Add new employee')}</h1>
      <EmployeeForm />
    </BaseLayout>
  )
}

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      // Will be passed to the page component as props
    },
  }
}

export default EmployeeAddPage
