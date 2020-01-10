// const host = 'http://14.17.65.122:8010'
const host= "http://venus.dipperin.io"
const baseUrl = '/api/v1'

export const fetchRequest = async (url: string = '', method: string = 'GET', body?: object) => {
  try {
    const _reqUrl = `${host}${baseUrl}${url}`
    const res: any = await Promise.race([fetch(_reqUrl, {
      method: method,
      body: body ? JSON.stringify(body) : '',
      headers:{
        'Content-Type': 'application/json',
      }}), new Promise((resolve, reject) => {
        setTimeout(() => {
          reject('timeout')
        }, 20000)
      })])
    // handle response
    const resJson = await res.json()
    console.log(url, "api","params: ", body, "res: ", resJson)
    if (resJson && resJson.success !== true) {
      console.log("result", resJson.success)
    }
    return resJson
  } catch (error) {
    console.log(error)
  }
}

