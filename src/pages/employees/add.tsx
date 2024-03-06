import { AddEmployeeContainer } from '@/@features/employees'
import { BaseLayout } from '@/components'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const EmployeeAddPage = () => {
  return (
    <BaseLayout>
      <AddEmployeeContainer />
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
