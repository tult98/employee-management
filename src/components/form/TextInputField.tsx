// wrapper to use react-hook-form with UI libraries
import { TextField, TextFieldProps } from '@mui/material'
import { Control, Controller, FieldError, FieldValues, Path } from 'react-hook-form'

type TTextInputFieldProps<TFieldValues extends FieldValues> = {
  name: Path<TFieldValues>
  label?: string
  error?: boolean
  control: Control<TFieldValues, any>
} & Omit<TextFieldProps, 'variant'>

export const TextInputField = <TFieldValues extends FieldValues = FieldValues>({
  name,
  control,
  ...rest
}: TTextInputFieldProps<TFieldValues>) => {
  return <Controller name={name} control={control} render={({ field }) => <TextField {...field} {...rest} />} />
}
