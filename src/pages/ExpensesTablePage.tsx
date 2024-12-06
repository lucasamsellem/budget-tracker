import ExpenseForm from '@/components/expenses/ExpenseForm'
import InsufficientAmountAlert from '@/components/budget/InsufficientAmountAlert'
import { useMoney } from '@/context/MoneyContext'
import { useState } from 'react'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { CategoriesColor, Expense } from '@/types/Expense'
import { PieChartComponent } from '@/components/expenses/PieChart'
import ExpensesTable from '@/components/expenses/ExpensesTable'
import Header from '@/components/header/Header'

const categoriesColor: CategoriesColor = {
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
  const initialExpenseState: Expense = {
    name: '',
    category: '',
    price: 0,
  }

  const [expense, setExpense] = useState<Expense>(initialExpenseState)
  const [expensesList, setExpensesList] = useLocalStorage<Expense[]>('expensesList', [])

  // Derived state
  const totalExpensesPrice = expensesList.reduce((total, exp) => total + exp.price, 0)

  const budgetAmountLeft =
    budgetLimit !== null && budgetLimit !== undefined ? budgetLimit - totalExpensesPrice : 0

  console.log(budgetLimit)

  return (
    <>
      <Header />

      <InsufficientAmountAlert expensePrice={expense.price} budgetAmountLeft={budgetAmountLeft} />

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
