export interface FingerprintConfigType {
  startHint?: string
  proccessHint?:  string
  successHint?: string 
}

export interface FingerprintPopOptionsType {
  fingerprintSuccessCb: () => void,
  fingerprintFailCb: () => void,
  hide: () => void
}

export interface EnterPasswordConfigType {
  hasCancel?: boolean
}

