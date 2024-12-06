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
import { useMoney } from '@/context/MoneyContext'
import { BudgetAmountLeft } from '@/types/Money'

type InsufficientAmountAlertProps = {
  expensePrice: number
  budgetAmountLeft: BudgetAmountLeft
}

function InsufficientAmountAlert({ expensePrice, budgetAmountLeft }: InsufficientAmountAlertProps) {
  // Context
  const { balanceAmount } = useMoney()

  // State
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  // Derived
  const isBudgetExceeded = budgetAmountLeft && expensePrice > budgetAmountLeft
  const isBalanceInsufficient = balanceAmount && expensePrice > balanceAmount

  useEffect(() => {
    if (isBudgetExceeded || isBalanceInsufficient) setIsDialogOpen(true)
  }, [isBudgetExceeded, isBalanceInsufficient])

  return (
    <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className='dark:text-white'>
            ⚠️ {isBudgetExceeded ? 'Budget exceeded' : 'Insufficient balance'}
          </AlertDialogTitle>

          <AlertDialogDescription>
            {isBudgetExceeded ? (
              <>
                You cannot add this expense as it will create an excess of{' '}
                <strong className='text-orange'>{expensePrice - budgetAmountLeft}€</strong> based on
                the budget limit you have previsouly defined
              </>
            ) : (
              <>
                You must add <strong className='text-green'>{expensePrice - balanceAmount}€</strong>{' '}
                to your account
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

export default InsufficientAmountAlert
