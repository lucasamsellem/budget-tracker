import { Slider } from '@/components/ui/slider'
import { useMoney } from '@/context/MoneyContext'
import { OnSliderValue, SliderDefaultValue, SliderValue } from '@/types/Money'
import { useExpense } from '@/context/ExpenseContext'

type SliderBarProps = {
  sliderValue: SliderValue
  onSliderValue: OnSliderValue
  sliderDefaultValue: SliderDefaultValue
}

function SliderBar({ sliderDefaultValue, sliderValue, onSliderValue }: SliderBarProps) {
  const { balanceAccountAmount } = useMoney()
  const { totalExpensesPrice } = useExpense()

  return (
    <section className='w-full text-center space-y-5'>
      <Slider
        defaultValue={[sliderDefaultValue]}
        min={totalExpensesPrice} // User cannot define a budget lower than totalExpensesPrice which would otherwise result in a negative percentage
        max={balanceAccountAmount}
        step={1}
        onValueChange={e => onSliderValue(e[0])}
      />

      <p className='text-orange text-2xl font-bold justify-center'>{sliderValue}€</p>
    </section>
  )
}

export default SliderBar
