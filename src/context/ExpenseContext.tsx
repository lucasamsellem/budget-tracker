import { useLocalStorage } from '@/hooks/useLocalStorage'
import { Expense, OnExpensesList, TotalExpensesPrice } from '@/types/Expense'
import { createContext, ReactNode, useContext } from 'react'

type ExpenseContextProps = {
  expensesList: Expense[]
  onExpensesList: OnExpensesList
  totalExpensesPrice: TotalExpensesPrice
}

type ExpenseProviderProps = {
  children: ReactNode
}

const ExpenseContext = createContext<ExpenseContextProps | undefined>(undefined)

function ExpenseProvider({ children }: ExpenseProviderProps) {
  const [expensesList, setExpensesList] = useLocalStorage<Expense[]>('expensesList', [])

  // Derived state
  const totalExpensesPrice = expensesList.reduce((total, exp) => total + exp.price, 0)

  return (
    <ExpenseContext.Provider
      value={{
        expensesList,
        onExpensesList: setExpensesList,
        totalExpensesPrice,
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
