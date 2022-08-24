import dayjs, { Dayjs } from 'dayjs'
import { Task } from '../interfaces'

export const getTasksWithinWeek = (tasks: Task[], weekDay: Dayjs) => {
  return tasks.filter((task) => {
    let shouldPass = false
    if (task.dueDate && task.fromDate) {
      const from = dayjs.unix(task.fromDate!)
      const due = dayjs.unix(task.dueDate!)
      const weekDayHours: Dayjs[] = []
      for (let i = 1; i < 25; i++) {
        weekDayHours.push(weekDay.hour(i))
      }
      weekDayHours.forEach((hour) => {
        if (hour.isBetween(from, due) || hour.isSame(due, 'hour')) shouldPass = true
      })
    }
    return shouldPass
  })
}
