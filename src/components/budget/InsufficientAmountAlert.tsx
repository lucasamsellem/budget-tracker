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
import { useExpense } from '@/context/ExpenseContext'
import { OnExpense } from '@/types/Expense'

type InsufficientAmountAlertProps = {
  expensePrice: number
  onExpense: OnExpense
}

function InsufficientAmountAlert({ expensePrice, onExpense }: InsufficientAmountAlertProps) {
  // Context
  const { balanceAccountAmount } = useMoney()
  const { budgetAmountLeft } = useExpense()

  // State
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  // Derived
  const isBudgetExceeded = budgetAmountLeft && expensePrice > budgetAmountLeft
  const isBalanceInsufficient = balanceAccountAmount && expensePrice > balanceAccountAmount

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
                You must add{' '}
                <strong className='text-green'>{expensePrice - balanceAccountAmount}€</strong> to
                your account
              </>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          {/* <AlertDialogCancel onClick={() => setIsDialogOpen(false)}>Cancel</AlertDialogCancel> */}
          <AlertDialogAction
            onClick={() =>
              onExpense(prev => ({
                ...prev,
                price: 0,
              }))
            }
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default InsufficientAmountAlert
