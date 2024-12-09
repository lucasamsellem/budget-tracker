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

      <main className='grid sm:grid-cols-[auto_auto_auto] justify-between gap-10 justify-items-start flex-1 px-8 dark:text-white'>
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
      </main>
    </>
  )
}

export default ExpensesTablePage
