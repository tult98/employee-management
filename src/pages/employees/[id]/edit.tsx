import { EditEmployeeContainer } from '@/@features/employees'
import { BaseLayout } from '@/components'
import { request } from '@/services/request'
import { IEmployee } from '@/types/employee'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const EmployeeEditPage = ({ employee }: { employee?: IEmployee }) => {
  return (
    <BaseLayout>
      <EditEmployeeContainer employee={employee} />
    </BaseLayout>
  )
}

export const getServerSideProps = (async (context) => {
  const { id } = context.params as any
  const locale = context.locale ?? 'vi'
  try {
    const response = await request.get(`employees/${id}`)
    return { props: { employee: response.data, ...(await serverSideTranslations(locale, ['common'])) } }
  } catch (error) {
    return {
      props: {
        ...(await serverSideTranslations(locale, ['common'])),
        // Will be passed to the page component as props
      },
    }
  }
}) satisfies GetServerSideProps

export default EmployeeEditPage
