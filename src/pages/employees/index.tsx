import EmployeeDeleteConfirm from '@/components/Dialog/EmployeeDeleteConfirm'
import { getEmployees } from '@/services/employee'
import { IEmployee } from '@/types/employee'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import Button from '@mui/material/Button'
import { DataGrid, GridActionsCellItem, GridColDef, GridRowParams } from '@mui/x-data-grid'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useMemo, useState } from 'react'
import { toast } from 'react-toastify'
import useSWR from 'swr'

const EmployeeListPage = () => {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [selectedEmployee, setSelectedEmployee] = useState<IEmployee>()

  const { data, isLoading, error, mutate } = useSWR<IEmployee[]>('/employees', getEmployees, {
    shouldRetryOnError: false,
  })

  const onEditEmployee = (id: number) => {
    router.push(`employees/${id}/edit`)
  }

  const onDeleteEmployee = (data: IEmployee) => {
    setIsOpen(true)
    setSelectedEmployee(data)
  }

  useEffect(() => {
    if (error) {
      toast.error(error.message)
    }
  }, [error])

  const columns: GridColDef[] = useMemo(
    () => [
      { field: 'name', headerName: 'Name', type: 'string', flex: 1 },
      { field: 'email', headerName: 'Email', type: 'string', flex: 1.5 },
      { field: 'address', headerName: 'Address', type: 'string', flex: 1 },
      { field: 'age', headerName: 'Age', type: 'number', flex: 0.5 },
      { field: 'salary', headerName: 'Salary', type: 'number', flex: 0.5 },
      {
        field: 'actions',
        type: 'actions',
        flex: 1,
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
    []
  )

  return (
    <div className='w-full'>
      <div className='flex justify-between mb-4'>
        <h1 className='text-2xl font-semibold '>Employees</h1>
        <Link href='/employees/add'>
          <Button component='label' variant='contained' startIcon={<AddIcon />}>
            Add new employee
          </Button>
        </Link>
      </div>
      <DataGrid className='h-[400px]' rows={data ?? []} loading={isLoading} columns={columns} rowSelection={false} />
      <EmployeeDeleteConfirm isOpen={isOpen} setIsOpen={setIsOpen} employee={selectedEmployee} mutate={mutate} />
    </div>
  )
}

export default EmployeeListPage
