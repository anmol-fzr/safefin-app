import axios, { AxiosError, AxiosResponse } from "axios"
import { rootStore } from "@/models";

const axiosInstance = axios.create({
  baseURL: 'http://192.168.29.57:3000',
  timeout: 2000,
});

axiosInstance.interceptors.request.use((req) => {
  const token = rootStore.authenticationStore.authToken
  if (token) {
    req.headers.set("Authorization", `Bearer ${token}`)
  }
  return req
})

// Response Interceptor: Extract only .data
axiosInstance.interceptors.response.use(
  (resp: AxiosResponse<IResData>) => {
    return resp.data
  },
  (error: AxiosError<IResData>) => {
    if (error.response?.data) {
      // Optionally handle specific status codes
      return Promise.reject(error.response.data)
    }
    return Promise.reject({
      data: null,
      message: error.message || "Unknown error",
    } as IResData)
  }
)

type IResData<D = any> = {
  data: D
}

export type { IResData }
export { axiosInstance }
