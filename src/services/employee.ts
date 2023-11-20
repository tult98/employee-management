import { request } from '@/services/request'

export const getEmployees = () => {
  return request.get('/employees')
}
