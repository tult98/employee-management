import EmployeeForm from '@/components/EmployeeForm'
import { useTranslation } from 'react-i18next'

const EmployeeAddPage = () => {
  const { t } = useTranslation()
  return (
    <>
      <h1 className='text-2xl font-semibold capitalize'>{t('Add new employee')}</h1>
      <EmployeeForm />
    </>
  )
}

export default EmployeeAddPage
