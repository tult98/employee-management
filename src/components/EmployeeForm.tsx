import AvatarInputField from '@/components/AvatarInputField'
import { createOrUpdateEmployee } from '@/services/employee'
import { IEmployee } from '@/types/employee'
import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Button, TextField } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'
import { useRouter } from 'next/router'
import { useEffect, useMemo } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'next-i18next'
import { toast } from 'react-toastify'
import useSWRMutation from 'swr/mutation'
import * as yup from 'yup'
import { useSWRConfig } from 'swr'

export enum TYPE {
  CREATE = 'Create',
  EDIT = 'Edit',
}
interface IProps {
  employee?: IEmployee
  type?: TYPE
}

const EmployeeForm = ({ employee, type = TYPE.CREATE }: IProps) => {
  const { t } = useTranslation()
  const router = useRouter()
  const { mutate } = useSWRConfig()

  const schema = useMemo(
    () =>
      yup.object().shape({
        name: yup.string().required(t('Name is required')),
        email: yup.string().email(t('Invalid email format')).required(t('Email is required')),
        address: yup.string().required(t('Address is required')),
        age: yup
          .number()
          .integer(t('Age must be an integer'))
          .positive(t('Age must be a positive number'))
          .required(t('Age is required')),
        salary: yup.number().positive(t('Salary must be a positive number')).required(t('Salary is required')),
        profile_image: yup
          .string()
          .url(t('Invalid URL format for profile image'))
          .required(t('Profile image URL is required')),
      }),
    [t]
  )

  const {
    handleSubmit,
    control,
    watch,
    clearErrors,
    formState: { errors },
  } = useForm<IEmployee>({
    // @ts-expect-error
    resolver: yupResolver(schema),
    mode: 'onBlur',
    reValidateMode: 'onSubmit',
    defaultValues: employee,
  })

  const watchProfileImage = watch('profile_image')

  useEffect(() => {
    clearErrors('profile_image')
  }, [watchProfileImage])

  const { trigger, isMutating, data, error } = useSWRMutation(
    type === TYPE.CREATE ? '/employees' : employee ? `/employees/${employee.id}` : undefined,
    createOrUpdateEmployee,
    { throwOnError: false }
  )

  const onSubmit = (data: IEmployee) => {
    trigger({ type, employee: data })
  }

  useEffect(() => {
    if (error) {
      toast.error(t('Something went wrong. Please try again later'))
      return
    }
    if (data && !isMutating) {
      toast.success(`${type} employee successfully`)
    }
    if (data && !isMutating && type === TYPE.CREATE) {
      router.push('/employees')
    }
  }, [data, isMutating, error])

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
            <TextField error={!!errors.name} helperText={errors.name?.message} label={`${t('Name')} *`} {...field} />
          )}
        />
        <Controller
          name='email'
          control={control}
          render={({ field }) => (
            <TextField error={!!errors.email} helperText={errors.email?.message} label={`${t('Email')} *`} {...field} />
          )}
        />
        <Controller
          name='address'
          control={control}
          render={({ field }) => (
            <TextField
              error={!!errors.address}
              helperText={errors.address?.message}
              label={`${t('Address')} *`}
              {...field}
            />
          )}
        />
        <Controller
          name='age'
          control={control}
          render={({ field }) => (
            <TextField error={!!errors.age} helperText={errors.age?.message} label={`${t('Age')} *`} {...field} />
          )}
        />
        <Controller
          name='salary'
          control={control}
          render={({ field }) => (
            <TextField
              error={!!errors.salary}
              helperText={errors.salary?.message}
              label={`${t('Salary')} *`}
              {...field}
            />
          )}
        />
      </div>
      <div className='w-full flex justify-end'>
        <Button
          variant='contained'
          color='primary'
          type='submit'
          className='bg-blue-500 !mt-8 !min-w-[150px]'
          disabled={isMutating}
          startIcon={isMutating ?? <CircularProgress />}
        >
          {type === TYPE.CREATE ? t('Create') : t('Edit')}
        </Button>
      </div>
    </Box>
  )
}

export default EmployeeForm
