import { useMoney } from '@/context/MoneyContext'
import { NavLink } from 'react-router-dom'

type NavLinkStyledTypes = {
  page: string
  children: React.ReactNode
}

function NavLinkStyled({ page, children }: NavLinkStyledTypes) {
  return (
    <NavLink
      to={page}
      className={({ isActive }) => `font-semibold ${isActive ? 'font-bold' : 'opacity-50'}`}
    >
      {children}
    </NavLink>
  )
}

function PageNav() {
  const { balanceAccountAmount } = useMoney()

  return (
    <nav className='dark:text-white text-zinc-900'>
      <ul className='flex gap-5'>
        <li>
          <NavLinkStyled page='/home'>Home</NavLinkStyled>
        </li>

        {/* User must add funds to their account before accessing other pages */}
        {balanceAccountAmount ? (
          <>
            <li>
              <NavLinkStyled page='/budget'>Budget</NavLinkStyled>
            </li>
            <li>
              <NavLinkStyled page='/expenses'>Expenses</NavLinkStyled>
            </li>
          </>
        ) : null}
      </ul>
    </nav>
  )
}

export default PageNav
