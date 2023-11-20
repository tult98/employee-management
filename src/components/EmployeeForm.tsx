import { Box, Button, TextField } from '@mui/material'

const EmployeeForm = () => {
  return (
    <Box component='form' className='mt-12'>
      <div className='flex flex-col space-y-4'>
        <TextField required label='Name' />
        <TextField required label='Email' />
        <TextField required label='Address' />
        <TextField required label='Age' />
        <TextField required label='Salary' />
      </div>
      <div className='w-full flex justify-end'>
        <Button variant='contained' color='primary' className='bg-blue-500 mt-8'>
          Create
        </Button>
      </div>
    </Box>
  )
}

export default EmployeeForm
