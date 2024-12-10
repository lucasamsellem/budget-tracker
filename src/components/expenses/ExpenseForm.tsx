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
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { useState } from 'react'

type ExpenseFormProps = {
  expense: Expense
  onExpense: OnExpense
  budgetAmountLeft: BudgetAmountLeft
}

function ExpenseForm({ expense, onExpense, budgetAmountLeft }: ExpenseFormProps) {
  // Contexts
  const { balanceAmount, onTransactions } = useMoney()
  const { onExpensesList } = useExpense()

  // State
  const [isAlertPopover, setIsAlertPopover] = useState<boolean>(false)

  // Derived
  const hasEmptyFields = Object.values(expense).some(value => !value)
  const isOverBudget = budgetAmountLeft && expense.price > budgetAmountLeft
  const isOverBalance = balanceAmount && expense.price > balanceAmount

  // Event handlers
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (hasEmptyFields) return setIsAlertPopover(true)

    // Then returns Shadcn's error dialog
    if (isOverBudget || isOverBalance) return

    onExpensesList(prev => [...prev, expense])
    onTransactions(prev => [...prev, -expense.price])
    onExpense(initialExpenseState)
    setIsAlertPopover(false) // Reset popover state
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
              onExpense(prev => ({
                ...prev,
                price: Number(e.target.value.replace(',', '.')),
              }))
            }}
          />

          <Popover>
            <PopoverTrigger>
              <Button className='w-full' type='submit'>
                Submit
              </Button>
            </PopoverTrigger>
            {isAlertPopover && (
              <PopoverContent className='text-sm py-2 text-center'>
                ⚠️ Please fill in all the inputs
              </PopoverContent>
            )}
          </Popover>
        </form>
      </CardContent>
    </Card>
  )
}

export default ExpenseForm
