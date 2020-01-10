import { fetchRequest } from './http'
 
// Get Apps List
// export const getAppsList = (params: any):any => fetchRequest('/applications', 'POST',params)

// get Block Height
// export const getBlockHeight = (params: any):any => fetchRequest('/home', 'POST',params)

export const getAppsList = (params: any):any => fetchRequest('/stock/index', 'POST',params)

export const getTxList = (params: any):any => fetchRequest('/account/txs', 'POST',params)
