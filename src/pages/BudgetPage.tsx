import { Card } from '@/components/ui/card'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import Header from '@/components/header/Header'
import BudgetCardHeader from '@/components/budget/BudgetCardHeader'
import BudgetCardContent from '@/components/budget/BudgetCardContent'

function BudgetProgressPage() {
  // State
  const [isChecked, setIsChecked] = useLocalStorage<boolean>('isChecked', false)

  return (
    <>
      <Header />

      <main className='flex-1'>
        <Card className='w-[23rem] mx-auto space-y-5 '>
          <BudgetCardHeader isChecked={isChecked} onIsChecked={setIsChecked} />

          <BudgetCardContent isChecked={isChecked} />
        </Card>
      </main>
    </>
  )
}

export default BudgetProgressPage
