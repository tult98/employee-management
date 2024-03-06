import { request } from '@/services/request'
import { IEmployee } from '@/types/employee'

export const getEmployees = async () => {
  try {
    const response = await request.get('/employees?_sort=id&_order=desc')
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

export const deleteEmployee = async (id: number) => {
  try {
    const response = await request.delete(`/employees/${id}`)
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}
