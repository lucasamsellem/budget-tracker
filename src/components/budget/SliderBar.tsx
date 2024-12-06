import { Slider } from '@/components/ui/slider'
import { useMoney } from '@/context/MoneyContext'
import { CardFooter } from '../ui/card'
import CheckButton from '../buttons/CheckButton'
import { OnSliderValue, SliderDefaultValue, SliderValue } from '@/types/Money'

type SliderBarProps = {
  sliderDefaultValue: SliderDefaultValue
  sliderValue: SliderValue
  onSliderValue: OnSliderValue
}

function SliderBar({ sliderDefaultValue, sliderValue, onSliderValue }: SliderBarProps) {
  const { balanceAmount, onBudgetLimit } = useMoney()

  return (
    <>
      <Slider
        defaultValue={[sliderDefaultValue]}
        min={sliderDefaultValue}
        max={balanceAmount}
        step={sliderDefaultValue}
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
