import ErrCode from './ErrCode'
/**
 * header config
 */

const DEFAULT_HEADER = {
  'Content-Type': 'application/json',
}
const DEFAULT_TIMEOUT = 10000
const PREFIX = '/api/v1'


export const fetchRequest = async (url: string = '', method: string = 'GET', body?: object, isShowLoading: boolean | undefined = true) => {
  try {
    const headers: any = DEFAULT_HEADER
    const res: any = await Promise.race([fetch(`${PREFIX}${url}`, {
      method: method,
      headers,
      body: body ? JSON.stringify(body) : ''
    }), new Promise((resolve, reject) => {
      setTimeout(() => {
        reject('timeout')
      }, DEFAULT_TIMEOUT)
    })])
    
    const resJson = await res.json()
    console.log("result", resJson)

    if (resJson && resJson.success === false) {
      if (ErrCode.hasOwnProperty(resJson.err_code)) {
        // Toast.info(ErrCode[resJson.err_code])
      } else {
        // Toast.info(resJson.err_msg)
      }

    }
    return resJson
  } catch (error) {
    // Toast.info("network failed")
  }
}

