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

export const createNewEmployee = async (employee: IEmployee) => {
  try {
    const response = await request.post('/employees', employee)

    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const editAnEmployee = async (employee: IEmployee, id?: number) => {
  try {
    if (!id) return
    const response = await request.put(`/employees/${id}`, employee)

    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const deleteEmployee = async (url: string) => {
  try {
    const response = await request.delete(url)
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}
