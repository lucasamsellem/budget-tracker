import { Card } from '@/components/ui/card'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import Header from '@/components/header/Header'
import BudgetCardHeader from '@/components/budget/BudgetCardHeader'
import BudgetCardContent from '@/components/budget/BudgetCardContent'
import { useExpense } from '@/context/ExpenseContext'
import { Progress } from '@/components/ui/progress'
import { useMoney } from '@/context/MoneyContext'
import { progressBarColors } from '@/utils/colors'

function BudgetPage() {
  // Context
  const { budgetLimit } = useMoney()
  const { totalExpensesPrice } = useExpense()

  // State
  const [isChecked, setIsChecked] = useLocalStorage<boolean>('isChecked', false)

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
      <Header />

      <main className='flex-1 grid grid-cols-2 px-8'>
        <section>
          <Card className='w-[23rem] space-y-5 h-min'>
            <BudgetCardHeader isChecked={isChecked} onIsChecked={setIsChecked} />
            <BudgetCardContent isChecked={isChecked} />
          </Card>
        </section>

        <section className='max-w-[20rem] space-y-2'>
          <h3 className='dark:text-white text-xl'>Progress</h3>
          <div className='flex items-center gap-x-4'>
            <Progress barColor={barColor} value={budgetLeftPercentage} />
            <span className='dark:text-white'>{budgetLeftPercentage}%</span>
          </div>
        </section>
      </main>
    </>
  )
}

export default BudgetPage
