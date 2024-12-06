import { ExpenseTypes } from '@/types/ExpenseTypes'
import { Input } from '../ui/input'

type ExpenseNameInputProps = {
  expense: ExpenseTypes
  onExpense: (updatedExpense: ExpenseTypes) => void
}

function ExpenseNameInput({ expense, onExpense }: ExpenseNameInputProps) {
  return (
    <Input
      value={expense.name}
      type='text'
      placeholder='Name'
      onChange={e => onExpense({ ...expense, name: e.target.value })}
      onClick={e => e.stopPropagation()}
    />
  )
}

export default ExpenseNameInput
