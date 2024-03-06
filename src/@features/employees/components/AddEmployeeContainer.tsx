import { EmployeeForm } from '@/@features/employees'
import { createNewEmployee } from '@/services/employee'
import { IEmployee } from '@/types/employee'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { mutate } from 'swr'

export const AddEmployeeContainer = () => {
  const { t } = useTranslation()
  const router = useRouter()

  const [isMutating, setIsMutating] = useState(false)

  const onSubmit = (data: IEmployee) => {
    mutate('/employees', createNewEmployee(data), {
      revalidate: false,
      optimisticData: (employees) => {
        setIsMutating(true)

        return [...(employees ?? []), data]
      },
      populateCache: (createdEmployee, employees) => {
        toast.success(`Create employee successfully`)
        router.push('/employees')
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
      <h1 className='text-2xl mb-4 font-semibold capitalize'>{t('Add new employee')}</h1>
      <EmployeeForm isMutating={isMutating} submitButtonLabel={t('Create')} onSubmit={onSubmit} />
    </>
  )
}
