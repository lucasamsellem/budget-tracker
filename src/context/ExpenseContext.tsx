import { useLocalStorage } from '@/hooks/useLocalStorage'
import { Expense, OnExpensesList, TotalExpensesPrice } from '@/types/Expense'
import { createContext, ReactNode, useContext } from 'react'
import { useMoney } from './MoneyContext'

type ExpenseContextProps = {
  expensesList: Expense[]
  onExpensesList: OnExpensesList
  totalExpensesPrice: TotalExpensesPrice
  budgetAmountLeft: number
}

type ExpenseProviderProps = {
  children: ReactNode
}

const ExpenseContext = createContext<ExpenseContextProps | undefined>(undefined)

function ExpenseProvider({ children }: ExpenseProviderProps) {
  const { budgetLimit } = useMoney()
  const [expensesList, setExpensesList] = useLocalStorage<Expense[]>('expensesList', [])

  // Derived state
  const totalExpensesPrice = expensesList.reduce((total, exp) => total + exp.price, 0)
  const budgetAmountLeft = budgetLimit === null ? 0 : budgetLimit - totalExpensesPrice

  return (
    <ExpenseContext.Provider
      value={{
        expensesList,
        onExpensesList: setExpensesList,
        totalExpensesPrice,
        budgetAmountLeft,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  )
}

const useExpense = () => {
  const context = useContext(ExpenseContext)
  if (!context) {
    throw new Error('useExpense must be used within a ExpenseProvider')
  }
  return context
}

export { ExpenseProvider, useExpense }
