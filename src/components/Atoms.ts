import { atom, selector } from 'recoil'

export type Habits = {
  id: string
  title: string
  createdAt: string
  weekDays: number[]
}

export type HabitsDay = {
  date: Date
  habitId: string
}

export const habitsState = atom({
  key: 'habitsState',
  default: [] as Habits[]
})

export const completedHabitsState = atom({
  key: 'completedHabitsState',
  default: [] as HabitsDay[]
})


export const habitsDayState = atom({
  key: 'habitsDayState',
  default: []
})

export const newHabitsTitleState = atom({
  key: 'newHabitsTitleState',
  default: ''
})

export const newHabitsWeekDaysState = atom({
  key: 'newHabitsWeekDaysState',
  default: [] as number[]
})