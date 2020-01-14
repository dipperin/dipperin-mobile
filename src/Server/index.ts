import { fetchRequest } from './http'
 
// Get Apps List
export const getAppsList = (params: any) => fetchRequest('/applications', 'POST', params)
// get Block Height
export const getBlockHeight = () => fetchRequest('/home', 'GET')
// get Acounts Top
export const getFortuneList = (params: any) => fetchRequest('/accounts/top', 'POST', params)

// get Contracts List
export const getContactsList = (params: any) => fetchRequest('/contracts', 'POST',params)

export const getTxList = (params: any):any => fetchRequest('/account/txs', 'POST',params)
