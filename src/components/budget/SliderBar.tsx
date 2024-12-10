import { Slider } from '@/components/ui/slider'
import { useMoney } from '@/context/MoneyContext'
import { CardFooter } from '../ui/card'
import CheckButton from '../buttons/CheckButton'
import { OnSliderValue, SliderDefaultValue, SliderValue } from '@/types/Money'
import { useExpense } from '@/context/ExpenseContext'

type SliderBarProps = {
  sliderValue: SliderValue
  onSliderValue: OnSliderValue
  sliderDefaultValue: SliderDefaultValue
}

function SliderBar({ sliderDefaultValue, sliderValue, onSliderValue }: SliderBarProps) {
  const { balanceAmount, onBudgetLimit } = useMoney()
  const { totalExpensesPrice } = useExpense()

  // console.log('sliderDefaultValue', sliderDefaultValue)
  // console.log('sliderValue', sliderValue)

  return (
    <>
      <Slider
        defaultValue={[sliderDefaultValue]}
        min={totalExpensesPrice} // User cannot define a budget lower than totalExpensesPrice which would otherwise result in a negative percentage
        max={balanceAmount}
        step={1}
        onValueChange={e => onSliderValue(e[0])}
      />

      <p className='text-orange text-2xl font-bold justify-center'>{sliderValue}€</p>

      <CardFooter className='pt-6 pb-0'>
        <CheckButton
          type='button'
          className='size-10'
          eventHandler={() => onBudgetLimit(sliderValue)}
        />
      </CardFooter>
    </>
  )
}

export default SliderBar
