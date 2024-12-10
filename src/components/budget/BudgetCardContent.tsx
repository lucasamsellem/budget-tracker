import { useMoney } from '@/context/MoneyContext'
import { CardContent } from '../ui/card'
import SliderBar from './SliderBar'
import { IsChecked, OnSliderValue, SliderDefaultValue, SliderValue } from '@/types/Money'

type BudgetCardContentProps = {
  isChecked: IsChecked
  sliderDefaultValue: SliderDefaultValue
  sliderValue: SliderValue
  onSliderValue: OnSliderValue
}

function BudgetCardContent({
  sliderDefaultValue,
  sliderValue,
  onSliderValue,
  isChecked,
}: BudgetCardContentProps) {
  // Context
  const { budgetLimit } = useMoney()

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
            onSliderValue={onSliderValue}
          />
        )}
      </CardContent>
    )
  )
}

export default BudgetCardContent
