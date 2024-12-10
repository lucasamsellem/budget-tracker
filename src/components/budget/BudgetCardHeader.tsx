import { CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import InfoBtn from '../buttons/InfoBtn'
import { Switch } from '../ui/switch'
import { useMoney } from '@/context/MoneyContext'
import { IsChecked, OnIsChecked, OnSliderValue } from '@/types/Money'
import { useExpense } from '@/context/ExpenseContext'

type BudgetCardHeaderProps = {
  isChecked: IsChecked
  onIsChecked: OnIsChecked
  onSliderValue: OnSliderValue
}

function BudgetCardHeader({ isChecked, onIsChecked, onSliderValue }: BudgetCardHeaderProps) {
  // Context
  const { budgetLimit, onBudgetLimit } = useMoney()
  const { totalExpensesPrice } = useExpense()

  function handleChecked() {
    onIsChecked(prev => {
      onSliderValue(totalExpensesPrice) // Reset to totalExpensesPrice when toggled again

      const newValue = !prev
      if (!newValue) onBudgetLimit(null)
      return newValue
    })
  }

  return (
    <CardHeader>
      <CardTitle className='flex items-center'>
        <>
          <div className='flex gap-4 text-nowrap'>
            <h2>Define a budget</h2>
            <Switch checked={isChecked} onCheckedChange={handleChecked} />
          </div>

          {budgetLimit && (
            <div className='flex ml-auto'>
              <Popover>
                <PopoverTrigger>
                  <InfoBtn />
                </PopoverTrigger>
                <PopoverContent className='text-sm text-center p-3'>
                  You can reset your budget limit by switching the button again
                </PopoverContent>
              </Popover>
            </div>
          )}
        </>
      </CardTitle>

      {isChecked && <CardDescription>Choose a maximum amount for this month</CardDescription>}
    </CardHeader>
  )
}

export default BudgetCardHeader
