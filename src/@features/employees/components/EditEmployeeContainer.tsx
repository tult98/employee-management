import { EmployeeForm } from '@/@features/employees'
import { editAnEmployee } from '@/services/employee'
import { IEmployee } from '@/types/employee'
import { useTranslation } from 'next-i18next'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { mutate } from 'swr'

export const EditEmployeeContainer = ({ employee }: { employee?: IEmployee }) => {
  const { t } = useTranslation()

  const [isMutating, setIsMutating] = useState(false)

  useEffect(() => {
    if (!employee) toast.error(t('Cannot get the employee data at the moment'))
  }, [employee, t])

  const onSubmit = (data: IEmployee) => {
    mutate('/employees', editAnEmployee(data, employee?.id), {
      revalidate: false,
      optimisticData: (employees) => {
        setIsMutating(true)

        return [data, ...(employees ?? [])]
      },
      populateCache: (createdEmployee, employees) => {
        toast.success(`Edit employee successfully`)
        setIsMutating(false)

        return [...(employees ?? []), createdEmployee]
      },
      rollbackOnError: () => {
        toast.error(t('Something went wrong. Please try again later'))
        setIsMutating(false)

        return true
      },
    })
  }

  return (
    <>
      <h1 className='text-2xl font-semibold'>{t('Edit employee')}</h1>
      {employee ? (
        <EmployeeForm isMutating={isMutating} submitButtonLabel={t('Edit')} onSubmit={onSubmit} employee={employee} />
      ) : (
        <p>{t('Cannot get the employee data at the moment')}</p>
      )}
    </>
  )
}
