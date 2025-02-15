import { useMoney } from '@/context/MoneyContext'
import { Progress } from '../ui/progress'
import { useExpense } from '@/context/ExpenseContext'
import { progressBarColors } from '@/utils/colors'
import { CardFooter } from '../ui/card'

function BudgetProgressBar() {
  const { budgetLimit } = useMoney()
  const { totalExpensesPrice } = useExpense()

  const safeBudgetLimit = budgetLimit ?? 0
  const budgetProgressPercentage = safeBudgetLimit
    ? Math.trunc((totalExpensesPrice / safeBudgetLimit) * 100)
    : 0

  const barColor = Object.entries(progressBarColors).find(
    ([, range]) => budgetProgressPercentage > range[0] && budgetProgressPercentage <= range[1]
  )?.[0]

  return (
    <CardFooter className='p-6'>
      <label className='dark:text-white absolute text-sm font-medium z-10 left-1/2'>
        {budgetProgressPercentage}%
      </label>
      <Progress barColor={barColor} value={budgetProgressPercentage} />
    </CardFooter>
  )
}

export default BudgetProgressBar
