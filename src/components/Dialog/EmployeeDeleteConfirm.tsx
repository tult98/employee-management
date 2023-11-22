import { deleteEmployee } from '@/services/employee'
import { IEmployee } from '@/types/employee'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import { KeyedMutator } from 'swr'
import useSWRMutation from 'swr/mutation'

interface IProps {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  employee?: IEmployee
  mutate: KeyedMutator<IEmployee[]>
}

export default function EmployeeDeleteConfirm({ isOpen, setIsOpen, employee, mutate }: IProps) {
  const { t } = useTranslation()
  const { data, isMutating, trigger, error } = useSWRMutation(
    employee ? `/employees/${employee.id}` : undefined,
    deleteEmployee,
    { throwOnError: false }
  )

  const handleClose = () => {
    setIsOpen(false)
  }

  const onConfirmDelete = () => {
    trigger()
  }

  useEffect(() => {
    if (error) {
      toast.error(t('Something went wrong. Please try again later'))
      return
    }

    if (data && !isMutating) {
      setIsOpen(false)
      toast.success(t('Employee deleted successfully'))
      mutate()
      return
    }
  }, [isMutating, data, error])

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-title'>Delete </DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>
          {t('Are you sure to delete this employee, this action cannot be undone.')}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={onConfirmDelete}>OK</Button>
      </DialogActions>
    </Dialog>
  )
}
