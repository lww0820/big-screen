import type { parkInfoType } from '@/types/park'
import request from '../utils/request'

// 获取园区数据
export const getParkInfoApi = () => request<parkInfoType>('/park/statistics/info', 'GET')
