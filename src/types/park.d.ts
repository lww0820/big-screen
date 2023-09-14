// 园区概览
export type baseType = {
  buildingTotal: number
  chargePoleTotal: number
  enterpriseTotal: number
  parkingTotal: number
}
// 园区年度收入分析
export type parkIncomeType = {
  xMonth: string[]
  yIncome: number[]
}

// 园区产业分布
export type parkIndustryType = {
  name: string
  value: number
}

export type parkInfoType = {
  base: baseType
  parkIncome: parkIncomeType
  parkIndustry: parkIndustryType[]
}
