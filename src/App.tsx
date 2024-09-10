import './styles/global.css'
import './lib/dayjs'
import { Header } from './components'
import { SummaryTable } from './components/SummaryTable'
import { RecoilRoot } from 'recoil'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export function App() {
  return (
    <RecoilRoot>
      <div className='w-screen h-screen flex justify-center items-center'>
        <div className='w-full max-w-5xl px-6 flex flex-col gap-16'>
          <Header />
          <SummaryTable />
        </div>
      </div>
      <ToastContainer position='top-center' />
    </RecoilRoot>
  )
}
