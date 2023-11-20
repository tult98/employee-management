import { request } from '@/services/request'

export const getEmployees = async () => {
  try {
    const response = await request.get('/employees')
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}
