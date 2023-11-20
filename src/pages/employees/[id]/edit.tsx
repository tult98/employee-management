import EmployeeForm, { TYPE } from '@/components/EmployeeForm'
import { request } from '@/services/request'
import { IEmployee } from '@/types/employee'
import { GetServerSideProps } from 'next'
import { useEffect } from 'react'
import { toast } from 'react-toastify'

const EmployeeEditPage = ({ employee }: { employee: IEmployee | undefined }) => {

  useEffect(() => {
    if (!employee) toast.error('Cannot get the employee data at the moment')
  }, [employee])

  return (
    <>
      <h1 className='text-2xl font-semibold'>Edit employee</h1>
      <EmployeeForm employee={employee} type={TYPE.CREATE} />
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
