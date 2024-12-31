import ExpenseForm from '@/components/expenses/ExpenseForm'
import InsufficientAmountAlert from '@/components/budget/InsufficientAmountAlert'
import { useState } from 'react'
import { Expense } from '@/types/Expense'
import { PieChartComponent } from '@/components/expenses/PieChart'
import ExpensesTable from '@/components/expenses/ExpensesTable'
import Header from '@/components/header/Header'
import { initialExpenseState } from '@/utils/initialExpenseState'
import Main from '@/components/Main'

function ExpensesPage() {
  const [expense, setExpense] = useState<Expense>(initialExpenseState)

  return (
    <>
      <Header />

      <InsufficientAmountAlert expensePrice={expense.price} onExpense={setExpense} />

      <Main className='flex flex-col sm:grid sm:grid-cols-[auto_auto_auto] justify-between gap-[5rem] justify-items-start dark:text-white'>
        <ExpenseForm expense={expense} onExpense={setExpense} />
        <ExpensesTable />
        <PieChartComponent />
      </Main>
    </>
  )
}

export default ExpensesPage
