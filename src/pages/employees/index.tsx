import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { DataGrid, GridActionsCellItem, GridColDef, GridRowParams, GridRowsProp } from '@mui/x-data-grid'
import AddIcon from '@mui/icons-material/Add'
import Button from '@mui/material/Button'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useMemo } from 'react'

const rows: GridRowsProp = [
  {
    id: 1,
    name: 'Tu Le Thanh',
    email: 'lethanhtu1551998@gmail.com',
    address: 'Hanoi, Vietnam',
    age: 25,
    salary: '1000',
  },
]

const EmployeeListPage = () => {
  const router = useRouter()

  const onEditEmployee = (id: number) => {
    router.push(`employees/${id}/edit`)
  }

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
            onClick={() => console.log('delete')}
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
      <DataGrid autoHeight rows={rows} columns={columns} rowSelection={false} />
    </div>
  )
}

export default EmployeeListPage
