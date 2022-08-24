import { Dayjs } from 'dayjs'

//returns array with 24 dayjs objects with every hour at passed date

export const getHoursOfDate = (date: Dayjs) => {
  const hours = []
  for (let i = 1; i < 25; i++) {
    hours.push(date.hour(i))
  }
  return hours
}
