export const host = 'http://172.16.5.120:8886'
export const baseUrl = '/api/v1'

export const fetchRequest = async (url: string = '', method: string = 'GET', body?: object) => {
  try {
    const _reqUrl = `${host}${baseUrl}${url}`
    const res: any = await Promise.race([fetch(_reqUrl, {
      method: method,
      headers:{
        'Content-Type': 'application/json',
      },
      body: body ? JSON.stringify(body) : ''
    }), new Promise((resolve, reject) => {
        setTimeout(() => {
          reject('timeout')
        }, 20000)
      })])
    console.log('res:', res, 'params:', body)
    // handle response
    const resJson = await res.json()
    console.log("resJson: ", resJson)
    if (resJson && resJson.success !== true) {
      console.log("result", resJson.info)
    }
    return resJson
  } catch (error) {
    console.log(error)
  }
}

