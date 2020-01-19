import { Toast } from 'Components/PopupWindow'
// export const host = 'http://venus.dipperin.io'
export const host = 'http://14.17.65.122:8886'
// export const host = 'http://172.16.5.120:8886'
export const baseUrl = '/api/v1'

export const fetchRequest = async (url: string = '', method: string = 'GET', body?: object) => {
  try {
    const _reqUrl = `${host}${baseUrl}${url}`
    const res: any = await Promise.race([fetch(_reqUrl, {
      method: method,
      body: body ? JSON.stringify(body) : '',
      headers: {
        'Content-Type': 'application/json',
      },
    }), new Promise((resolve, reject) => {
      setTimeout(() => {
        reject('timeout')
      }, 20000)
    })])
    // handle response
    const resJson = await res.json()
    console.log('params:', body,'res:', res, )
    if (resJson && resJson.success !== true) {
      Toast.info(resJson.info)
    }
    return resJson
  } catch (error) {
    Toast.info(error)
  }
}

