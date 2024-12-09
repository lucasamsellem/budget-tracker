import CheckButton from '../buttons/CheckButton'
import DeleteBtn from '../buttons/DeleteBtn'
import { TableCell, TableRow } from '../ui/table'
import ExpenseNameInput from './ExpenseNameInput'
import { Expense } from '@/types/Expense'
import { useState } from 'react'
import { useMoney } from '@/context/MoneyContext'
import { capitalizeFirstLetter } from '@/utils/capitalizeFirstLetter'
import { useExpense } from '@/context/ExpenseContext'
import { categoriesColor } from '@/utils/colors'

// type ExpensesListProps = {
//   categoriesColor: CategoriesColor
// }

function ExpensesList() {
  // Context
  const { onTransactions } = useMoney()
  const { expensesList, onExpensesList } = useExpense()

  // State
  const [activeCell, setActiveCell] = useState<number | null>(null)

  // Event handlers
  const handleExpenseUpdate = (updatedExpense: Expense, index: number) => {
    onExpensesList(prev => prev.map((exp, i) => (i === index ? updatedExpense : exp)))
  }

  const handleDeleteExpense = (index: number) => {
    const deletedExpensePrice = expensesList[index].price
    onTransactions(prev => [...prev, deletedExpensePrice])
    onExpensesList(prev => prev.filter((_, i) => i !== index))
  }

  const handleActiveCell = (i: number) => {
    setActiveCell(prev => (prev === i ? null : i))
  }

  return expensesList.map((exp, i) => (
    <TableRow key={i}>
      <TableCell className='w-[4rem]'>
        <DeleteBtn onDeleteExpense={() => handleDeleteExpense(i)} />
      </TableCell>

      <TableCell
        onClick={() => handleActiveCell(i)}
        className='font-bold cursor-pointer min-w-[12rem]'
      >
        {activeCell === i ? (
          <form className='flex items-center'>
            <ExpenseNameInput
              expense={exp}
              onExpenseUpdate={updatedExp => handleExpenseUpdate(updatedExp, i)}
            />

            <CheckButton isDisabled={exp.name === ''} type='submit' className='size-6 ml-2' />
          </form>
        ) : (
          exp.name
        )}
      </TableCell>

      <TableCell>
        <span
          className='py-1 px-2 rounded-md text-white font-bold'
          style={{ backgroundColor: categoriesColor[exp.category] }}
        >
          {capitalizeFirstLetter(exp?.category)}
        </span>
      </TableCell>

      <TableCell colSpan={3} className='text-right w-full'>
        {exp.price}€
      </TableCell>
    </TableRow>
  ))
}

export default ExpensesList
