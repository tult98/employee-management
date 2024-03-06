import { zodResolver } from '@hookform/resolvers/zod'
import { DefaultValues, FieldValues, SubmitHandler, UseFormProps, UseFormReturn, useForm } from 'react-hook-form'
import { ZodType, ZodTypeDef } from 'zod'

export interface FormProps<TFormValues extends FieldValues, Schema>
  extends Omit<React.ComponentPropsWithoutRef<'form'>, 'children' | 'onSubmit'> {
  options?: UseFormProps<TFormValues>
  schema?: Schema
  onSubmit: SubmitHandler<TFormValues>
  defaultValues?: DefaultValues<TFormValues>
  children: (method: UseFormReturn<TFormValues>) => React.ReactNode
}

export const Form = <
  TFormValues extends FieldValues = FieldValues,
  Schema extends ZodType<unknown, ZodTypeDef, unknown> = ZodType<unknown, ZodTypeDef, unknown>
>(
  props: FormProps<TFormValues, Schema>
) => {
  const { children, onSubmit, defaultValues, schema, ...rest } = props

  const form = useForm<TFormValues>({
    defaultValues,
    resolver: schema ? zodResolver(schema) : undefined,
    mode: 'onBlur',
    reValidateMode: 'onSubmit',
  })

  return (
    <form {...rest} onSubmit={form.handleSubmit(onSubmit)}>
      {children(form)}
    </form>
  )
}
