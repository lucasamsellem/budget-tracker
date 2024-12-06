import CheckButton from '../buttons/CheckButton'
import DeleteBtn from '../buttons/DeleteBtn'
import { TableCell, TableRow } from '../ui/table'
import ExpenseNameInput from './ExpenseNameInput'
import { ExpenseTypes } from '@/types/ExpenseTypes'
import { useState } from 'react'
import { useMoney } from '@/context/MoneyContext'
import { capitalizeFirstLetter } from '@/utils/capitalizeFirstLetter'

type ExpensesListProps = {
  expensesList: ExpenseTypes[]
  onExpensesList: (value: ExpenseTypes[] | ((prevValue: ExpenseTypes[]) => ExpenseTypes[])) => void
  categoriesColor: Record<string, string>
}

function ExpensesList({ expensesList, onExpensesList, categoriesColor }: ExpensesListProps) {
  // Context
  const { onTransactions } = useMoney()

  // State
  const [activeCell, setActiveCell] = useState<number | null>(null)

  // Event handlers
  const handleExpenseUpdate = (updatedExpense: ExpenseTypes, index: number) => {
    onExpensesList(prev => prev.map((exp, i) => (i === index ? updatedExpense : exp)))
  }

  const handleDeleteExpense = (index: number) => {
    const deletedExpensePrice = expensesList[index].price
    onTransactions(prev => [...prev, deletedExpensePrice])
    onExpensesList(prev => prev.filter((_, i) => i !== index))
  }

  const handleActiveCell = (index: number) => {
    setActiveCell(prev => (prev === index ? null : index))
  }

  return expensesList.map((exp, i) => (
    <TableRow key={i}>
      <TableCell className='w-[4rem]'>
        <DeleteBtn onDeleteExpense={() => handleDeleteExpense(i)} />
      </TableCell>

      <TableCell
        onClick={() => handleActiveCell(i)}
        className='font-bold cursor-pointer min-w-[10rem]'
      >
        {activeCell === i ? (
          <form className='flex items-center'>
            <ExpenseNameInput
              expense={exp}
              onExpense={updatedExp => handleExpenseUpdate(updatedExp, i)}
            />

            <CheckButton
              eventHandler={() => handleExpenseUpdate(exp, i)}
              type='submit'
              className='size-6 ml-2'
            />
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
          {capitalizeFirstLetter(exp.category)}
        </span>
      </TableCell>

      <TableCell colSpan={3} className='text-right w-full'>
        {exp.price}€
      </TableCell>
    </TableRow>
  ))
}

export default ExpensesList
