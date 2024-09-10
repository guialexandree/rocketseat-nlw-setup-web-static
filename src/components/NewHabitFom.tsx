import { FormEvent, useState } from 'react'
import { Check } from 'phosphor-react'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { habitsState, newHabitsTitleState, newHabitsWeekDaysState } from './Atoms'
import * as Checkbox from '@radix-ui/react-checkbox'
import { toast } from 'react-toastify'
import dayjs from 'dayjs'

const availableWeekDays = [
  'Domingo',
  'Segunda-feira',
  'Terça-feira',
  'Quarta-feira',
  'Quinta-feira',
  'Feita-feira',
  'Sábado'
]

export function NewHabitForm () {
  const [title, setTitle] = useRecoilState(newHabitsTitleState)
  const [weekDays, setWeekDays] = useRecoilState(newHabitsWeekDaysState)
  const setHabits = useSetRecoilState(habitsState)

  async function createNewHabit(event: FormEvent) {
    event.preventDefault()

    if (!title || weekDays.length === 0) {
      return
    }

    setHabits(currenState => [...currenState, {
      id: dayjs().toDate().getTime().toString(),
      title,
      createdAt: dayjs().startOf('day').toString(),
      weekDays: weekDays
    }])

    setTitle('')
    setWeekDays([])

    toast('criado com sucesso', { type: 'success' })
  }

  function handleToggleWeekDay(weekDay: number) {
    if (weekDays.includes(weekDay)) {
      setWeekDays(weekDays.filter(day => day !== weekDay))
    } else {
      setWeekDays(prevState => [...prevState, weekDay])
    }
  }

  return (  
    <form className="w-full flex flex-col mt-6" onSubmit={createNewHabit}>
      <label className="font-semibold leading-tight" htmlFor="title">Qual seu comprometimento?</label>
      <input 
        type="text" 
        id="title"
        placeholder="Ex.: Exercícios, dormir bem, etc..."  
        className="p-4 rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400"
        autoFocus
        value={title}
        onChange={event => setTitle(event.target.value)}
      />

      <label htmlFor="" className="font-semibold leading-tight mt-4">Qual a recorrência?</label>

      <section className="flex flex-col gap-2 mt-3">
        {availableWeekDays.map((weekDay, index) => (
          <Checkbox.Root 
            key={weekDay} 
            className='flex items-center gap-3 group focus:outline-none'
            checked={weekDays.includes(index)}
            onCheckedChange={() => handleToggleWeekDay(index)}
          >
            <section 
              className='h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500 transition-colors group-focus:ring-2 group-focus:ring-violet-700 group-focus:ring-offset-2 group-focus:ring-offset-zinc-900'
            >
              <Checkbox.Indicator>
                <Check 
                  size={20}
                  className='text-white'
                />
              </Checkbox.Indicator>
            </section>
            <span className='text-white leading-tight'>
              {weekDay}
            </span>
          </Checkbox.Root>
      ))}
      </section>

      <button 
        className="mt-6 rounded-lg p-4 flex items-center justify-center gap-3 font-semibold bg-green-600 hover:bg-green-500 transition-colors focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-zinc-900" 
        type="submit"
      >
        Confirmar 
        <Check size={20} weight="bold" />
      </button>
    </form>
  )
}
