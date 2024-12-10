import { Expense, OnExpense } from '@/types/Expense'
import { Input } from '../ui/input'

type ExpenseNameInputProps = {
  expense: Expense
  onExpense?: OnExpense
  onExpenseUpdate?: (updatedExpense: Expense) => void
  className?: string
  autoFocus?: boolean
}

function ExpenseNameInput({
  expense,
  onExpense,
  onExpenseUpdate,
  className,
  autoFocus,
}: ExpenseNameInputProps) {
  return (
    <Input
      autoFocus={autoFocus}
      className={className || ''}
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
