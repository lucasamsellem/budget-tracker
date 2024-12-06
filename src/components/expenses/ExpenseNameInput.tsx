import { Expense, OnExpense } from '@/types/Expense'
import { Input } from '../ui/input'

type ExpenseNameInputProps = {
  expense: Expense
  onExpense?: OnExpense
  onExpenseUpdate?: (updatedExpense: Expense) => void
}

function ExpenseNameInput({ expense, onExpense, onExpenseUpdate }: ExpenseNameInputProps) {
  return (
    <Input
      value={expense.name}
      type='text'
      placeholder='Name'
      onChange={e => {
        onExpense?.({ ...expense, name: e.target.value })
        onExpenseUpdate?.({ ...expense, name: e.target.value })
      }}
      onClick={e => e.stopPropagation()}
    />
  )
}

export default ExpenseNameInput
