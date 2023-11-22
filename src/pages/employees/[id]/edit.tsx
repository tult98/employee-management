import EmployeeForm, { TYPE } from '@/components/EmployeeForm'
import { request } from '@/services/request'
import { IEmployee } from '@/types/employee'
import { GetServerSideProps } from 'next'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'

const EmployeeEditPage = ({ employee }: { employee: IEmployee | undefined }) => {
  const { t } = useTranslation()

  useEffect(() => {
    if (!employee) toast.error(t('Cannot get the employee data at the moment'))
  }, [employee])

  return (
    <>
      <h1 className='text-2xl font-semibold'>{t('Edit employee')}</h1>
      <EmployeeForm employee={employee} type={TYPE.EDIT} />
    </>
  )
}

export const getServerSideProps = (async (context) => {
  const { id } = context.params as any
  try {
    const response = await request.get(`employees/${id}`)
    return { props: { employee: response.data } }
  } catch (error) {
    return { props: {} }
  }
}) satisfies GetServerSideProps

export default EmployeeEditPage
