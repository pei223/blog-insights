import { AxiosError } from 'axios'

export type ApiHookResult<ResType> = {
  data?: ResType
  loading: boolean
  error?: AxiosError
}
