import { useLocalStorage } from '@/hooks/useLocalStorage'
import { createContext, useContext, ReactNode } from 'react'

type MoneyContextProps = {
  transactions: number[]
  onTransactions: (value: number[] | ((prevValue: number[]) => number[])) => void
  budgetLimit: number | null
  onBudgetLimit: (limitation: number | null) => void
  balanceAmount: number
  handleTransactions: (amount: number, isAdd: boolean) => void
}

type MoneyProviderProps = {
  children: ReactNode
}

const MoneyContext = createContext<MoneyContextProps | undefined>(undefined)

function MoneyProvider({ children }: MoneyProviderProps) {
  // States
  const [transactions, setTransactions] = useLocalStorage<number[]>('transactions', [])
  const [budgetLimit, setBudgetLimit] = useLocalStorage<number | null>('budgetLimit', null)

  // Derived state
  const balanceAmount = transactions.reduce((acc, cur) => acc + cur, 0)

  // Handlers
  const handleTransactions = (amount: number, isAdd: boolean) => {
    setTransactions(prev => [...prev, isAdd ? amount : -amount])
  }

  return (
    <MoneyContext.Provider
      value={{
        transactions,
        onTransactions: setTransactions,
        budgetLimit,
        onBudgetLimit: setBudgetLimit,
        balanceAmount,
        handleTransactions,
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
