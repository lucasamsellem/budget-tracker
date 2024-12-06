import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import ExpenseNameInput from './ExpenseNameInput'
import { useMoney } from '@/context/MoneyContext'
import { Expense, OnExpense, OnExpensesList } from '@/types/Expense'
import { BudgetAmountLeft } from '@/types/Money'

type ExpenseFormProps = {
  initialExpenseState: Expense
  expense: Expense
  onExpense: OnExpense
  onExpensesList: OnExpensesList
  budgetAmountLeft: BudgetAmountLeft
}

function ExpenseForm({
  expense,
  onExpense,
  onExpensesList,
  budgetAmountLeft,
  initialExpenseState,
}: ExpenseFormProps) {
  // Contexts
  const { balanceAmount, onTransactions } = useMoney()

  // Derived
  const hasEmptyFields = Object.values(expense).some(value => !value)
  const isExpenseExceedingBudget =
    (budgetAmountLeft && expense.price > budgetAmountLeft) ||
    (balanceAmount && expense.price > balanceAmount)

  // Event handlers
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    e.stopPropagation()

    if (hasEmptyFields) return alert('Please fill in all the required information.')

    // Then returns Shadcn's error dialog
    if (isExpenseExceedingBudget) return

    onExpensesList(prev => [...prev, expense])
    onTransactions(prev => [...prev, -expense.price])
    onExpense(initialExpenseState)
  }

  return (
    <Card className='h-fit'>
      <CardHeader>
        <CardTitle>Add expense</CardTitle>
        <CardDescription>It will be added to the table</CardDescription>
      </CardHeader>

      <CardContent>
        <form action='card-content' className='grid gap-5' onSubmit={handleSubmit}>
          <ExpenseNameInput expense={expense} onExpense={onExpense} />

          <Select
            value={expense.category}
            onValueChange={value =>
              onExpense(prev => ({
                ...prev,
                category: value,
              }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder='Category' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='housing'>Housing</SelectItem>
              <SelectItem value='food'>Food</SelectItem>
              <SelectItem value='subscriptions'>Subscriptions</SelectItem>
              <SelectItem value='entertainment'>Entertainment</SelectItem>
              <SelectItem value='unexpected'>Unexpected</SelectItem>
            </SelectContent>
          </Select>

          <Input
            value={expense.price}
            type='number'
            placeholder='Price'
            onChange={e => {
              const inputValue = e.target.value.replace(',', '.')
              onExpense(prev => ({
                ...prev,
                price: Number(inputValue),
              }))
            }}
          />

          <Button type='submit'>Submit</Button>
        </form>
      </CardContent>
    </Card>
  )
}

export default ExpenseForm
