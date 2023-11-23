import EmployeeForm, { TYPE } from '@/components/EmployeeForm'
import BaseLayout from '@/components/layouts/BaseLayout'
import { request } from '@/services/request'
import { IEmployee } from '@/types/employee'
import { GetServerSideProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useEffect } from 'react'
import { toast } from 'react-toastify'

const EmployeeEditPage = ({ employee }: { employee: IEmployee | undefined }) => {
  const { t } = useTranslation()

  useEffect(() => {
    if (!employee) toast.error(t('Cannot get the employee data at the moment'))
  }, [employee])

  return (
    <BaseLayout>
      <h1 className='text-2xl font-semibold'>{t('Edit employee')}</h1>
      <EmployeeForm employee={employee} type={TYPE.EDIT} />
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
