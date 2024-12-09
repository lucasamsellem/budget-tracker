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
import { Expense, OnExpense } from '@/types/Expense'
import { BudgetAmountLeft } from '@/types/Money'
import { useExpense } from '@/context/ExpenseContext'
import { initialExpenseState } from '@/utils/initialExpenseState'

type ExpenseFormProps = {
  expense: Expense
  onExpense: OnExpense
  budgetAmountLeft: BudgetAmountLeft
}

function ExpenseForm({ expense, onExpense, budgetAmountLeft }: ExpenseFormProps) {
  // Contexts
  const { balanceAmount, onTransactions } = useMoney()
  const { onExpensesList } = useExpense()

  // Derived
  const hasEmptyFields = Object.values(expense).some(value => !value)
  const isOverBudget = budgetAmountLeft && expense.price > budgetAmountLeft
  const isOverBalance = balanceAmount && expense.price > balanceAmount

  // Event handlers
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    // Then returns Shadcn's error dialog
    if (hasEmptyFields || isOverBudget || isOverBalance) return

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
        <form className='grid gap-5' onSubmit={handleSubmit}>
          <ExpenseNameInput expense={expense} onExpense={onExpense} />

          <Select
            required
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
            required
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
