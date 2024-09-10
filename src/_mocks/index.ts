import faker from 'faker'

export type SummaryProps = Array<{
  id: string
  date: string
  amount: number
  completed: number
}>

export const mockSummary: SummaryProps = [...Array(150)].map(() => ({
  id: '0001',
  date: faker.date.past().toLocaleString(),
  amount: faker.datatype.number({ min: 2, max: 6 }),
  completed: 2
}))