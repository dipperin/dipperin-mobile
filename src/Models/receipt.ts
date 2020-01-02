export default interface Receipt {
  transactionHash: string
  gasUsed: number
  logs: Log[]
  address?: string
  net?: string
}

interface Log {
  topicName: string
  blockNumber: number
  data: string
}
