import * as Popover from '@radix-ui/react-popover'
import { ProgressBar } from './ProgressBar'
import clsx from 'clsx'
import dayjs from 'dayjs'
import { HabitsList } from './HabitsList'
import { useState } from 'react'

type HabitDayProps = {
  defaultCompleted?: number
  amount?: number
  date: Date
}

export function HabitDay({
  amount = 0,
  defaultCompleted = 0,
  date
}: HabitDayProps) {
  const [completed, setCompleted] = useState(defaultCompleted)
  const completedPercentage = amount > 0 ? Math.round((completed / amount) * 100) : 0
  const dayAndMonth = dayjs(date).format('DD/MM')
  const dayofWeek = dayjs(date).format('dddd')

  function handleCompletedChanged(completed: number) {
    setCompleted(completed)
  }

  return (
    <Popover.Root>
      <Popover.Trigger 
        className={clsx('w-10 h-10 border-2 rounded-lg transition-colors focus:ring-2 focus:ring-violet-700 focus:ring-offset-2 focus:ring-offset-background', {
          'bg-zinc-900 border-zinc-800': completedPercentage === 0,
          'bg-violet-900 border-violet-700': completedPercentage > 0 && completedPercentage < 20,
          'bg-violet-800 border-violet-600': completedPercentage >= 20 && completedPercentage < 40,
          'bg-violet-700 border-violet-500': completedPercentage >= 40 && completedPercentage < 60,
          'bg-violet-600 border-violet-500': completedPercentage >= 60 && completedPercentage < 80,
          'bg-violet-500 border-violet-400': completedPercentage >= 80,
        })} 
      />
      <Popover.Portal>
        <Popover.Content className='min-w-[320px] p-6 rounded-2xl bg-zinc-900 flex flex-col'>
          <span className='font-semibold text-zinc-400'>{dayofWeek}</span>
          <span className='mt-1 font-extrabold leading-tight text-3xl'>{dayAndMonth}</span>
          <ProgressBar progress={completedPercentage} /> 
          <HabitsList date={date} onCompletedChange={handleCompletedChanged} />
        <Popover.Arrow  height={8} width={16} className='fill-zinc-900' />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}
