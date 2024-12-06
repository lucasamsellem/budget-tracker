import { useEffect, useState } from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Expense } from '@/types/Expense'
import { useMoney } from '@/context/MoneyContext'
import { BudgetAmountLeft } from '@/types/Money'

type InsufficientBalanceAlertProps = {
  expense: Expense
  budgetAmountLeft: BudgetAmountLeft
}

function InsufficientBalanceAlert({ expense, budgetAmountLeft }: InsufficientBalanceAlertProps) {
  // Context
  const { balanceAmount } = useMoney()

  // State
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  // Derived
  const isBudgetExceeded = expense.price > budgetAmountLeft
  const isBalanceInsufficient = expense.price > balanceAmount

  useEffect(() => {
    if (isBudgetExceeded || isBalanceInsufficient) setIsDialogOpen(true)
  }, [isBudgetExceeded, isBalanceInsufficient])

  return (
    <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            ⚠️ {isBudgetExceeded ? 'Budget exceeded' : 'Insufficient balance'}
          </AlertDialogTitle>

          <AlertDialogDescription>
            {isBudgetExceeded ? (
              <>
                You cannot add this expense as it will create an excess of{' '}
                <strong className='text-orange'>{expense.price - budgetAmountLeft}€</strong> based
                on the budget limit you have previsouly defined.
              </>
            ) : (
              <>
                You must add{' '}
                <strong className='text-green'>{expense.price - balanceAmount}€</strong> to your
                account.
              </>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          {/* <AlertDialogCancel onClick={() => setIsDialogOpen(false)}>Cancel</AlertDialogCancel> */}
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default InsufficientBalanceAlert
