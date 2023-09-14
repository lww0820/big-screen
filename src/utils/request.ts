import axios from 'axios'
import type { AxiosResponse, InternalAxiosRequestConfig, Method } from 'axios'
import { getToken } from './cookies'
import type { Data } from '../types/request'
const server = axios.create({
  baseURL: 'https://api-hmzs.itheima.net/v1',
  timeout: 5000
})

server.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // token
    const token = getToken()
    if (token) {
      config.headers.Authorization = token
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

server.interceptors.response.use(
  (Response: AxiosResponse) => {
    return Response.data
  },
  (error) => {
    return Promise.reject(error)
  }
)
const request = <T>(url: string, method: Method, submitData?: object) => {
  return server.request<T, Data<T>>({
    url,
    method,
    [method.toLowerCase() === 'get' ? 'params' : 'data']: submitData
  })
}

export default request
