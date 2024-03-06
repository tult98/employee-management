import { deleteEmployee } from '@/services/employee'
import { IEmployee } from '@/types/employee'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { useTranslation } from 'next-i18next'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { mutate } from 'swr'

interface IProps {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  employee?: IEmployee
}

export const EmployeeDeleteConfirm = ({ isOpen, setIsOpen, employee }: IProps) => {
  const { t } = useTranslation()

  const [isMutating, setIsMutating] = useState(false)

  const handleClose = () => {
    setIsOpen(false)
  }

  const onConfirmDelete = () => {
    if (!employee?.id) return
    mutate('/employees', deleteEmployee(employee.id), {
      optimisticData: (employees) => {
        setIsMutating(true)

        return employees?.filter((e: IEmployee) => e.id !== employee.id)
      },
      populateCache: (_, employees) => {
        toast.success(t('Employee deleted successfully'))
        setIsOpen(false)
        setIsMutating(false)

        return employees?.filter((e: IEmployee) => e.id !== employee.id)
      },
      rollbackOnError: () => {
        toast.error(t('Something went wrong. Please try again later'))
        setIsOpen(false)
        setIsMutating(false)

        return true
      },
      revalidate: false,
    })
  }

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-title'>{t('Delete')}</DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>
          {t('Are you sure to delete this employee, this action cannot be undone.')}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>{t('Cancel')}</Button>
        <Button disabled={isMutating} onClick={onConfirmDelete}>
          {t('OK')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
