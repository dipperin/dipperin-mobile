export interface tabItemInterface {
  title: string
}
export const tabs: tabItemInterface[] = [
  { title: '热门应用' },
  { title: '合约排行' },
  { title: '富豪榜' },
];
export const formatEllipsis = (str: string) => {
  return `${str.substr(0,6)}...${str.substr(str.length-2,2)}`
}