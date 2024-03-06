import { AvatarInputField } from '@/@features/employees'
import { Form, TextInputField } from '@/components'
import { IEmployee } from '@/types/employee'
import { Button } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'
import { useTranslation } from 'next-i18next'
import { useMemo } from 'react'
import { Controller } from 'react-hook-form'
import * as z from 'zod'

interface IProps {
  employee?: IEmployee
  isMutating: boolean
  submitButtonLabel: string
  onSubmit: (data: IEmployee) => void
}

export const EmployeeForm = ({ employee, submitButtonLabel, isMutating, onSubmit }: IProps) => {
  const { t } = useTranslation()

  const schema = useMemo(
    () =>
      z.object({
        name: z.string({ required_error: t('Name is required') }).min(1, { message: t('Name is required') }),
        email: z
          .string({ required_error: t('Email is required') })
          .email({ message: t('Invalid email format') })
          .min(1, { message: t('Email is required') }),
        address: z.string({ required_error: t('Address is required') }).min(1, t('Address is required')),
        age: z.coerce
          .number({ required_error: t('Age is required'), invalid_type_error: t('Age must be a number') })
          .int({ message: t('Age must be an integer') })
          .positive({ message: t('Age must be a positive number') }),
        salary: z.coerce
          .number({ required_error: t('Salary is required'), invalid_type_error: t('Salary must be a number') })
          .positive({ message: t('Salary must be a positive number') }),
        profile_image: z
          .string({ required_error: t('Profile image URL is required') })
          .url({ message: t('Invalid URL format for profile image') })
          .min(1, t('Profile image URL is required')),
      }),
    [t]
  )

  return (
    <Form<IEmployee>
      schema={schema}
      defaultValues={employee}
      onSubmit={onSubmit}
      style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
    >
      {({ control, clearErrors, formState: { errors } }) => (
        <>
          <Controller
            name='profile_image'
            control={control}
            render={({ field }) => (
              <AvatarInputField error={errors.profile_image} {...field} clearErrors={clearErrors} />
            )}
          />
          <TextInputField
            name='name'
            control={control}
            label={`${t('Name')} *`}
            error={!!errors.name}
            helperText={errors?.name?.message}
          />
          <TextInputField
            name='email'
            control={control}
            label={`${t('Email')} *`}
            error={!!errors.email}
            helperText={errors?.email?.message}
          />
          <TextInputField
            name='address'
            control={control}
            label={`${t('Address')} *`}
            error={!!errors?.address}
            helperText={errors?.address?.message}
          />
          <TextInputField
            name='age'
            type='number'
            control={control}
            label={`${t('Age')} *`}
            error={!!errors.age}
            helperText={errors?.age?.message}
          />
          <TextInputField
            name='salary'
            type='number'
            control={control}
            label={`${t('Salary')} *`}
            error={!!errors.salary}
            helperText={errors?.salary?.message}
          />
          <Button
            variant='contained'
            color='primary'
            type='submit'
            disabled={isMutating}
            startIcon={isMutating ?? <CircularProgress />}
            className="bg-[#3f51b5] hover:opacity-80"
          >
            {submitButtonLabel}
          </Button>
        </>
      )}
    </Form>
  )
}

export default EmployeeForm
