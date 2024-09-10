import dayjs from 'dayjs'

export function generateDatesFromYearBeginning() {
  const firstDayOfTheYear = dayjs().startOf('day').subtract(3, 'month')
  const today = new Date()

  const dates = []
  let compareDate = firstDayOfTheYear

  while (compareDate.isBefore(today)) {
    dates.push(compareDate.toDate())
    compareDate = compareDate.add(1, 'day')
  }

  return dates
}