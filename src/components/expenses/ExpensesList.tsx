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

function ExpensesList() {
  const { onDeposits } = useMoney()
  const { expensesList, onExpensesList } = useExpense()
  const [activeCell, setActiveCell] = useState<number | null>(null)

  const handleExpenseUpdate = (updatedExpense: Expense, index: number) => {
    onExpensesList(prev => prev.map((exp, i) => (i === index ? updatedExpense : exp)))
  }

  const handleDeleteExpense = (index: number) => {
    const deletedExpensePrice = expensesList[index].price
    onDeposits(prev => ({
      ...prev,
      ['balance']: [...prev.balance, deletedExpensePrice],
    }))
    onExpensesList(prev => prev.filter((_, i) => i !== index))
  }

  const handleActiveCell = (i: number) => {
    setActiveCell(prev => (prev === i ? null : i))
  }

  return expensesList.map((exp, i) => (
    <TableRow key={i}>
      <TableCell className='w-[3rem]'>
        <DeleteBtn onDeleteExpense={() => handleDeleteExpense(i)} />
      </TableCell>

      <TableCell onClick={() => handleActiveCell(i)} className='font-bold cursor-pointer'>
        {activeCell === i ? (
          <form className='flex items-center'>
            <ExpenseNameInput
              autoFocus={true}
              className='max-w-[8rem] text-sm'
              expense={exp}
              onExpenseUpdate={updatedExp => handleExpenseUpdate(updatedExp, i)}
            />

            <CheckButton isDisabled={exp.name === ''} type='submit' className='size-6 ml-1' />
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

      <TableCell colSpan={3} className='text-right'>
        {exp.price}€
      </TableCell>
    </TableRow>
  ))
}

export default ExpensesList
