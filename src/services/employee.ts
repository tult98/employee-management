import { TYPE } from '@/components/EmployeeForm'
import { request } from '@/services/request'
import { IEmployee } from '@/types/employee'
import { AxiosError } from 'axios'

export const getEmployees = async () => {
  try {
    const response = await request.get('/employees')
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const createOrUpdateEmployee = async (url: string, { arg }: { arg: { employee: IEmployee; type: TYPE } }) => {
  try {
    let response
    if (arg.type === TYPE.CREATE) {
      response = await request.post(url, arg.employee)
    } else {
      response = await request.put(url, arg.employee)
    }

    return response.data
  } catch (error: any) {
    console.error(error)
  }
}

export const deleteEmployee = async (url: string) => {
  try {
    const response = await request.delete(url)
    return response.data
  } catch (error) {
    console.error(error)
  }
}
