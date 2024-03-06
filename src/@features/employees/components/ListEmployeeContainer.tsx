import { EmployeeDeleteConfirm } from '@/@features/employees'
import { getEmployees } from '@/services/employee'
import { IEmployee } from '@/types/employee'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import Button from '@mui/material/Button'
import { DataGrid, GridActionsCellItem, GridColDef, GridRowParams } from '@mui/x-data-grid'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { toast } from 'react-toastify'
import useSWR from 'swr'

const headerClassName = 'bg-[#F9FAFB]'

export const ListEmployeeContainer = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [selectedEmployee, setSelectedEmployee] = useState<IEmployee>()

  const { data, isLoading, error } = useSWR<IEmployee[]>('/employees', getEmployees)

  const onEditEmployee = useCallback(
    (id: number) => {
      router.push(`employees/${id}/edit`)
    },
    [router]
  )

  const onDeleteEmployee = (data: IEmployee) => {
    setIsOpen(true)
    setSelectedEmployee(data)
  }

  useEffect(() => {
    if (error) {
      toast.error(t('Something went wrong. Please try again later'))
    }
  }, [error, t])

  const columns: GridColDef[] = useMemo(
    () => [
      {
        field: 'name',
        headerName: t('Name'),
        type: 'string',
        flex: 1,
        headerClassName,
        cellClassName: 'text-blue-500',
      },
      { field: 'email', headerName: t('Email'), type: 'string', flex: 1.5, headerClassName },
      { field: 'address', headerName: t('Address'), type: 'string', flex: 1, headerClassName },
      { field: 'age', headerName: t('Age'), type: 'number', flex: 0.5, headerClassName },
      { field: 'salary', headerName: t('Salary'), type: 'number', flex: 0.5, headerClassName },
      {
        field: 'actions',
        type: 'actions',
        flex: 1,
        headerClassName,
        getActions: (params: GridRowParams) => [
          <GridActionsCellItem
            key='edit button'
            icon={<EditIcon />}
            label='Edit'
            onClick={() => onEditEmployee(params.id as number)}
          />,
          <GridActionsCellItem
            key='delete button'
            icon={<DeleteIcon />}
            label='Delete'
            onClick={() => onDeleteEmployee(params.row as IEmployee)}
          />,
        ],
      },
    ],
    [t, onEditEmployee]
  )

  return (
    <div className='w-full'>
      <div className='flex justify-between mb-4'>
        <h1 className='text-2xl font-semibold '>{t('Employees')}</h1>
        <Link href='/employees/add'>
          <Button component='label' variant='contained' startIcon={<AddIcon />}>
            {t('Add new employee')}
          </Button>
        </Link>
      </div>
      <DataGrid
        sx={{ border: 'none' }}
        className='min-h-[400px]'
        autoHeight
        rows={data ?? []}
        loading={isLoading}
        columns={columns}
        rowSelection={false}
      />
      <EmployeeDeleteConfirm isOpen={isOpen} setIsOpen={setIsOpen} employee={selectedEmployee} />
    </div>
  )
}
