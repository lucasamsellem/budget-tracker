import { useMoney } from '@/context/MoneyContext'
import Header from '@/components/header/Header'
import Main from '@/components/Main'
import BalanceCard from '@/components/balance/BalanceCard'
import SavingsCard from '@/components/balance/SavingsCard'

function HomePage() {
  const { balanceAccountAmount } = useMoney()

  return (
    <>
      <Header />

      <Main className={`sm:grid ${balanceAccountAmount ? 'grid-cols-2' : ''}`}>
        <BalanceCard />
        <SavingsCard />
      </Main>
    </>
  )
}

export default HomePage
