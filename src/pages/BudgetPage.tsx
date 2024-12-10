import { Card } from '@/components/ui/card'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import Header from '@/components/header/Header'
import BudgetCardHeader from '@/components/budget/BudgetCardHeader'
import BudgetCardContent from '@/components/budget/BudgetCardContent'
import { useExpense } from '@/context/ExpenseContext'
import { useState } from 'react'
import BudgetProgressBar from '@/components/budget/BudgetProgressBar'
import Main from '@/components/Main'

function BudgetPage() {
  const { totalExpensesPrice } = useExpense()

  // State
  const [isChecked, setIsChecked] = useLocalStorage<boolean>('isChecked', false)
  const sliderDefaultValue = totalExpensesPrice ?? 0
  const [sliderValue, setSliderValue] = useState(sliderDefaultValue)

  return (
    <>
      <Header />

      <Main className='grid sm:grid-cols-2 gap-y-[5rem]'>
        <section>
          <Card className='sm:w-[23rem] space-y-5 h-min'>
            <BudgetCardHeader
              isChecked={isChecked}
              onIsChecked={setIsChecked}
              onSliderValue={setSliderValue}
            />
            <BudgetCardContent
              sliderDefaultValue={sliderDefaultValue}
              sliderValue={sliderValue}
              onSliderValue={setSliderValue}
              isChecked={isChecked}
            />
          </Card>
        </section>

        <section className='sm:max-w-[20rem] space-y-1'>
          <BudgetProgressBar />
        </section>
      </Main>
    </>
  )
}

export default BudgetPage
