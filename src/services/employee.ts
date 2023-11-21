import { request } from '@/services/request'
import { IEmployee } from '@/types/employee'

export const getEmployees = async () => {
  try {
    const response = await request.get('/employees')
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const createEmployee = async (employee: IEmployee) => {
  try {
    const response = await request.post('/employees', employee)
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}
