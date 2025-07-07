import messages from '@/constants/messages'
import { AxiosError } from 'axios'
import { toast } from 'react-toastify'
import { tryCatch } from './utils'

function isAxiosError(response) {
  return response instanceof AxiosError
}

function getResponseMessage(response, fallback = messages.default.response_msg_not_found) {
  return response?.message || fallback
}

function handleResponseToast(response, overrides = {}) {
  const { success, error, fallback } = overrides
  const message = getResponseMessage(response)

  if (!response || isAxiosError(response)) {
    console.error('Axios error:', response)
    return toast.info(messages.default.no_response)
  }

  if (!('isSuccess' in response) && !response.isSuccess) {
    return toast.info(messages.default.no_response_code)
  }

  if (!('statusCode' in response)) {
    return toast.info(messages.default.no_response_code)
  }

  if (!response.isSuccess) {
    return toast.error(error ?? message ?? fallback)
  }

  if (response.isSuccess) {
    return toast.success(success ?? message ?? fallback)
  }

  return toast.info(messages.default.unexpected_response_code)
}

export function responseToaster(response) {
  return handleResponseToast(response)
}

export async function asyncResponseToaster(fn, msg = {}) {
  const { loading, success, error } = msg
  const toastId = toast.loading(loading ?? messages.default.toast_loading)

  const response = await tryCatch(fn)

  if (!response || !('value' in response) || isAxiosError(response.value)) {
    console.error('Axios error:', response)
    toast.dismiss(toastId)
    toast.error(response?.errorMsg ?? messages.default.no_response)
    return response
  }

  const result = response.value

  toast.dismiss(toastId)

  handleResponseToast(result, { success, error, fallback: messages.default.unexpected_response })

  return response
}
