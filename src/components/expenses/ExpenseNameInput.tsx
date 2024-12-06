import { Expense } from '@/types/Expense'
import { Input } from '../ui/input'

type ExpenseNameInputProps = {
  expense: Expense
  onExpenseUpdate: (updatedExpense: Expense) => void
}

function ExpenseNameInput({ expense, onExpenseUpdate }: ExpenseNameInputProps) {
  return (
    <Input
      value={expense.name}
      type='text'
      placeholder='Name'
      onChange={e => onExpenseUpdate({ ...expense, name: e.target.value })}
      onClick={e => e.stopPropagation()}
    />
  )
}

export default ExpenseNameInput
