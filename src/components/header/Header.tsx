import { ModeToggle } from './mode-toggle'
import PageNav from './PageNav'

function Header() {
  return (
    <header className='dark:bg-zinc-950 py-2 px-8 flex justify-between items-center gap-5 mb-20 shadow-sm dark:shadow-white'>
      <PageNav />

      <article className='flex items-center gap-5'>
        <h1 className='font-bold dark:text-white text-2xl'>Budget Tracker</h1>
        <ModeToggle />
      </article>
    </header>
  )
}

export default Header
