declare module "react-native-randombytes" {
  export function randomBytes(count: number, cb:(err: string, bytes: Buffer)=>void):Buffer
}