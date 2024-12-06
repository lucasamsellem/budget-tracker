import ExpenseForm from '@/components/expenses/ExpenseForm'
import { formatAmount } from '@/utils/formatAmount'
import InsufficientBalanceAlert from '@/components/budget/InsufficientBalanceAlert'
import { useMoney } from '@/context/MoneyContext'
import { useState } from 'react'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { ExpenseTypes } from '@/types/ExpenseTypes'
import { PieChartComponent } from '@/components/expenses/PieChart'
import ExpensesTable from '@/components/expenses/ExpensesTable'
import Header from '@/components/header/Header'

const categoriesColor: Record<string, string> = {
  housing: '#e76e50',
  subscriptions: '#2a9d90',
  entertainment: '#274754',
  food: '#e8c468',
  unexpected: '#f4a462',
}

function ExpensesTablePage() {
  // Context
  const { budgetLimit } = useMoney()

  // State
  const initialExpenseState: ExpenseTypes = {
    name: '',
    category: '',
    price: 0,
  }

  const [expense, setExpense] = useState<ExpenseTypes>(initialExpenseState)
  const [expensesList, setExpensesList] = useLocalStorage<ExpenseTypes[]>('expensesList', [])

  // Derived state
  const totalExpensesPrice = expensesList.reduce((total, exp) => total + exp.price, 0)

  const budgetAmountLeft =
    budgetLimit === undefined ? undefined : Math.abs(formatAmount(budgetLimit - totalExpensesPrice))

  return (
    <>
      <Header />

      {/* Triggers only when an amount is exceeding */}
      <InsufficientBalanceAlert expense={expense} budgetAmountLeft={budgetAmountLeft} />

      <main className='grid grid-cols-[auto_auto_auto] gap-10 justify-items-start flex-1 px-8 dark:text-white'>
        <section>
          <ExpenseForm
            expense={expense}
            budgetAmountLeft={budgetAmountLeft}
            onExpensesList={setExpensesList}
            onExpense={setExpense}
            initialExpenseState={initialExpenseState}
          />
        </section>

        <section>
          <ExpensesTable
            expensesList={expensesList}
            onExpensesList={setExpensesList}
            categoriesColor={categoriesColor}
            budgetAmountLeft={budgetAmountLeft}
            totalExpensesPrice={totalExpensesPrice}
          />
        </section>

        <section>
          <PieChartComponent expensesList={expensesList} categoriesColor={categoriesColor} />
        </section>
      </main>
    </>
  )
}

export default ExpensesTablePage
