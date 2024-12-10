import ExpenseForm from '@/components/expenses/ExpenseForm'
import InsufficientAmountAlert from '@/components/budget/InsufficientAmountAlert'
import { useMoney } from '@/context/MoneyContext'
import { useState } from 'react'
import { Expense } from '@/types/Expense'
import { PieChartComponent } from '@/components/expenses/PieChart'
import ExpensesTable from '@/components/expenses/ExpensesTable'
import Header from '@/components/header/Header'
import { useExpense } from '@/context/ExpenseContext'
import { initialExpenseState } from '@/utils/initialExpenseState'
import Main from '@/components/Main'

function ExpensesTablePage() {
  // Context
  const { budgetLimit } = useMoney()
  const { totalExpensesPrice } = useExpense()

  // State
  const [expense, setExpense] = useState<Expense>(initialExpenseState)

  // Derived
  const budgetAmountLeft = budgetLimit === null ? 0 : budgetLimit - totalExpensesPrice

  return (
    <>
      <Header />

      <InsufficientAmountAlert expensePrice={expense.price} budgetAmountLeft={budgetAmountLeft} />

      <Main className='flex flex-col sm:grid sm:grid-cols-[auto_auto_auto] justify-between gap-[5rem] justify-items-start dark:text-white'>
        <section>
          <ExpenseForm
            expense={expense}
            onExpense={setExpense}
            budgetAmountLeft={budgetAmountLeft}
          />
        </section>

        <section>
          <ExpensesTable budgetAmountLeft={budgetAmountLeft} />
        </section>

        <section>
          <PieChartComponent />
        </section>
      </Main>
    </>
  )
}

export default ExpensesTablePage
