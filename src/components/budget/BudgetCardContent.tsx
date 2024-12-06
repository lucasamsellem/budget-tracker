import { useMoney } from '@/context/MoneyContext'
import { CardContent } from '../ui/card'
import SliderBar from './SliderBar'
import { useState } from 'react'

type BudgetCardContentProps = {
  isChecked: boolean
}

function BudgetCardContent({ isChecked }: BudgetCardContentProps) {
  const { budgetLimit } = useMoney()

  // State
  const sliderDefaultValue = 25
  const [sliderValue, setSliderValue] = useState(sliderDefaultValue)

  return (
    isChecked && (
      <>
        <CardContent className='space-y-5 text-center flex flex-col items-center'>
          {!budgetLimit ? (
            <SliderBar
              sliderDefaultValue={sliderDefaultValue}
              sliderValue={sliderValue}
              onSliderValue={setSliderValue}
            />
          ) : (
            <p>
              Limit: <strong className='text-orange'>{budgetLimit}€</strong>
            </p>
          )}
        </CardContent>
      </>
    )
  )
}

export default BudgetCardContent
