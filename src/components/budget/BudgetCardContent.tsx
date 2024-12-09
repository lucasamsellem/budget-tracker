import { useMoney } from '@/context/MoneyContext'
import { CardContent } from '../ui/card'
import SliderBar from './SliderBar'
import { useState } from 'react'
import { IsChecked } from '@/types/Money'
import { useExpense } from '@/context/ExpenseContext'

type BudgetCardContentProps = {
  isChecked: IsChecked
}

function BudgetCardContent({ isChecked }: BudgetCardContentProps) {
  // Context
  const { budgetLimit } = useMoney()
  const { totalExpensesPrice } = useExpense()

  // State
  const sliderDefaultValue = totalExpensesPrice ? totalExpensesPrice : 0
  const [sliderValue, setSliderValue] = useState(sliderDefaultValue)

  return (
    isChecked && (
      <CardContent className='space-y-5 text-center flex flex-col items-center'>
        {budgetLimit ? (
          <p>
            Limit: <strong className='text-orange'>{budgetLimit}€</strong>
          </p>
        ) : (
          <SliderBar
            sliderDefaultValue={sliderDefaultValue}
            sliderValue={sliderValue}
            onSliderValue={setSliderValue}
          />
        )}
      </CardContent>
    )
  )
}

export default BudgetCardContent
