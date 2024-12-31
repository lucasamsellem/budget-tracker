import { createContext, useContext, ReactNode } from 'react'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { Accounts } from '@/types/Money'

type MoneyContextProps = {
  deposits: Accounts
  onDeposits: (value: Accounts | ((prevValue: Accounts) => Accounts)) => void
  balanceAccountAmount: number
  budgetLimit: number | null
  onBudgetLimit: (limitation: number | null) => void
}

type MoneyProviderProps = {
  children: ReactNode
}

const MoneyContext = createContext<MoneyContextProps | undefined>(undefined)

function MoneyProvider({ children }: MoneyProviderProps) {
  const [deposits, setDeposits] = useLocalStorage<Accounts>('deposits', {
    balance: [],
    savings: [],
  })

  const [budgetLimit, setBudgetLimit] = useLocalStorage<number | null>('budgetLimit', null)

  // Derived
  const balanceAccountAmount = deposits.balance.reduce((acc, cur) => acc + cur, 0)

  return (
    <MoneyContext.Provider
      value={{
        balanceAccountAmount,
        budgetLimit,
        onBudgetLimit: setBudgetLimit,
        deposits,
        onDeposits: setDeposits,
      }}
    >
      {children}
    </MoneyContext.Provider>
  )
}

const useMoney = () => {
  const context = useContext(MoneyContext)
  if (!context) {
    throw new Error('useMoney must be used within a MoneyProvider')
  }
  return context
}

export { MoneyProvider, useMoney }
