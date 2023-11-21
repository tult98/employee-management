import AvatarInputField from '@/components/AvatarInputField'
import { createOrUpdateEmployee } from '@/services/employee'
import { IEmployee } from '@/types/employee'
import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Button, TextField } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import useSWRMutation from 'swr/mutation'
import * as yup from 'yup'

export enum TYPE {
  CREATE = 'Create',
  EDIT = 'Edit',
}
interface IProps {
  employee?: IEmployee
  type?: TYPE
}

const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email format').required('Email is required'),
  address: yup.string().required('Address is required'),
  age: yup
    .number()
    .integer('Age must be an integer')
    .positive('Age must be a positive number')
    .required('Age is required'),
  salary: yup.number().positive('Salary must be a positive number').required('Salary is required'),
  profile_image: yup.string().url('Invalid URL format for profile image').required('Profile image URL is required'),
})

const EmployeeForm = ({ employee, type = TYPE.CREATE }: IProps) => {
  const router = useRouter()
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IEmployee>({
    // @ts-expect-error
    resolver: yupResolver(schema),
    mode: 'onBlur',
    reValidateMode: 'onSubmit',
    defaultValues: employee,
  })

  const { trigger, isMutating, data } = useSWRMutation(
    type === TYPE.CREATE ? '/employees' : employee ? `/employees/${employee.id}` : undefined,
    createOrUpdateEmployee
  )

  const onSubmit = (data: IEmployee) => {
    trigger({ type, employee: data })
  }

  useEffect(() => {
    if (data && !isMutating) {
      toast.success(`${type} employee successfully`)
    }
    if (data && !isMutating && type === TYPE.CREATE) {
      router.push('/employees')
    }
  }, [data, isMutating])

  return (
    <Box component='form' className='mt-12' onSubmit={handleSubmit(onSubmit)}>
      <div className='flex flex-col space-y-4'>
        <Controller
          name='profile_image'
          control={control}
          render={({ field }) => <AvatarInputField error={errors.profile_image} {...field} />}
        />

        <Controller
          name='name'
          control={control}
          render={({ field }) => (
            <TextField error={!!errors.name} helperText={errors.name?.message} label='Name *' {...field} />
          )}
        />
        <Controller
          name='email'
          control={control}
          render={({ field }) => (
            <TextField error={!!errors.email} helperText={errors.email?.message} label='Email *' {...field} />
          )}
        />
        <Controller
          name='address'
          control={control}
          render={({ field }) => (
            <TextField error={!!errors.address} helperText={errors.address?.message} label='Address *' {...field} />
          )}
        />
        <Controller
          name='age'
          control={control}
          render={({ field }) => (
            <TextField error={!!errors.age} helperText={errors.age?.message} label='Age *' {...field} />
          )}
        />
        <Controller
          name='salary'
          control={control}
          render={({ field }) => (
            <TextField error={!!errors.salary} helperText={errors.salary?.message} label='Salary *' {...field} />
          )}
        />
      </div>
      <div className='w-full flex justify-end'>
        <Button
          variant='contained'
          color='primary'
          type='submit'
          className='bg-blue-500 mt-8 min-w-[150px]'
          startIcon={isMutating ?? <CircularProgress />}
        >
          {type}
        </Button>
      </div>
    </Box>
  )
}

export default EmployeeForm
