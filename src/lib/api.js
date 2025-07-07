import { useAuthStore } from '@/hooks/use-auth'
import axios from 'axios'
import { API_BASE_PATH } from './config'

function onRequest(config) {
  const { setloading, isLoading } = useAuthStore.getState()

  if (config.headers.Authorization)
    return config

  const { user } = useAuthStore.getState()

  const token = `Bearer ${user?.token}`

  if (user?.token) {
    config.headers.Authorization = token
  }

  if (isLoading)
    setloading(false)

  return config
}

function onRequestError(error) {
  // console.error(`[request error] [${JSON?.stringify?.(error)}]`)
  return Promise.reject(error)
}

function onResponse(response) {
  // console.info(`[response] [${JSON?.stringify?.(response)}]`);
  if (response.data)
    return response.data
  return response.data
}

function onResponseError(error) {
  // console.error(`[response error] [${JSON?.stringify?.(error)}]`)
  return Promise.reject(error)
}

function setupInterceptorsTo(axiosInstance) {
  axiosInstance.interceptors.request.use(onRequest, onRequestError)
  axiosInstance.interceptors.response.use(onResponse, onResponseError)
  return axiosInstance
}

export const fetchApi = setupInterceptorsTo(
  axios.create({
    baseURL: `${API_BASE_PATH}admin/`,
  }),
)