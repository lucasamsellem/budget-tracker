import { useMoney } from '@/context/MoneyContext'
import { Progress } from '../ui/progress'
import { useExpense } from '@/context/ExpenseContext'
import { progressBarColors } from '@/utils/colors'

function BudgetProgressBar() {
  const { budgetLimit } = useMoney()
  const { totalExpensesPrice } = useExpense()

  // Derived
  const safeBudgetLimit = budgetLimit ?? 0
  const budgetLeftPercentage = safeBudgetLimit
    ? Math.trunc((totalExpensesPrice / safeBudgetLimit) * 100)
    : 0

  const barColor = Object.entries(progressBarColors).find(
    ([, range]) => budgetLeftPercentage > range[0] && budgetLeftPercentage <= range[1]
  )?.[0]

  return (
    <>
      <h3 className='dark:text-white text-lg'>Progress</h3>
      <div className='flex items-center gap-x-4'>
        <Progress barColor={barColor} value={budgetLeftPercentage} />
        <span className='dark:text-white'>{budgetLeftPercentage}%</span>
      </div>
    </>
  )
}

export default BudgetProgressBar
