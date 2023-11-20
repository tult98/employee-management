import { IEmployee } from '@/types/employee'
import { Box, Button, TextField } from '@mui/material'

export enum TYPE {
  CREATE = 'Create',
  EDIT = 'Edit',
}
interface IProps {
  employee?: IEmployee
  type?: TYPE
}

const EmployeeForm = ({ employee, type = TYPE.CREATE }: IProps) => {
  return (
    <Box component='form' className='mt-12'>
      <div className='flex flex-col space-y-4'>
        <TextField required label='Name' defaultValue={employee?.name} />
        <TextField required label='Email' defaultValue={employee?.email} />
        <TextField required label='Address' defaultValue={employee?.address} />
        <TextField required label='Age' defaultValue={employee?.age} />
        <TextField required label='Salary' defaultValue={employee?.salary} />
      </div>
      <div className='w-full flex justify-end'>
        <Button variant='contained' color='primary' className='bg-blue-500 mt-8 min-w-[150px]'>
          {type}
        </Button>
      </div>
    </Box>
  )
}

export default EmployeeForm
