import * as Checkbox from '@radix-ui/react-checkbox'
import { Check } from 'phosphor-react'
import { completedHabitsState, HabitsDay, habitsState } from './Atoms'
import { useRecoilState, useRecoilValue } from 'recoil'
import dayjs from 'dayjs'

type HabitsListProps = {
  date: Date
  onCompletedChange: (completed: number) => void
}

export function HabitsList({
  date,
  onCompletedChange
}: HabitsListProps) {
  const [completedHabits, setCompletedHabits] = useRecoilState(completedHabitsState)
  const habits = useRecoilValue(habitsState)

  async function handleToggleHabit(habitId: string) {
    const isHabitAlreadyCompleted = completedHabits.some(habit => habit.date === date && habit.habitId === habitId)

    let completeHabits: HabitsDay[] = []
  
    if(isHabitAlreadyCompleted) {
      const completedDay = completedHabits.filter(habit => habit.date === date && habit.habitId !== habitId)
      completeHabits = [...completedHabits.filter(habit => habit.date !== date), ...completedDay]
    } else {
      completeHabits = [...completedHabits, { date, habitId }]
    }

    setCompletedHabits(completeHabits)
    onCompletedChange(completeHabits.length)
  }

  return (
    <section className='mt-6 flex flex-col gap-3' >
      {habits.map(habit => {
        return (
        <Checkbox.Root 
          key={habit.id}
          checked={completedHabits.some(habitCompleted => habitCompleted.date === date && habitCompleted.habitId === habit.id)}
          onCheckedChange={() => handleToggleHabit(habit.id)}
          className='flex items-center gap-3 group focus:outline-none disabled:cursor-not-allowed'
        >
          <section 
            className='h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500 transition-colors group-focus:ring-2 group-focus:ring-violet-700 group-focus:ring-offset-2 group-focus:ring-offset-background'
          >
            <Checkbox.Indicator>
              <Check 
                size={20}
                className='text-white'
              />
            </Checkbox.Indicator>
          </section>
          <span className='font-semibold text-xl text-white leading-tight group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400'>
            {habit.title}
          </span>
        </Checkbox.Root>
      )})}
    </section>
  )
}
