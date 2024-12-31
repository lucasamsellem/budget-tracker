import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import Header from '@/components/header/Header'
import { useExpense } from '@/context/ExpenseContext'
import { useState } from 'react'
import BudgetProgressBar from '@/components/budget/BudgetProgressBar'
import Main from '@/components/Main'
import { useMoney } from '@/context/MoneyContext'
import { Switch } from '@/components/ui/switch'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import InfoBtn from '@/components/buttons/InfoBtn'
import BudgetSliderBar from '@/components/budget/BudgetSliderBar'

function BudgetPage() {
  const { budgetLimit, onBudgetLimit } = useMoney()
  const { totalExpensesPrice } = useExpense()

  // State
  const [isChecked, setIsChecked] = useLocalStorage<boolean>('isChecked', false)
  const [sliderValue, setSliderValue] = useState(totalExpensesPrice ?? 0)

  function handleChecked() {
    setIsChecked(prev => {
      if (!prev) {
        setSliderValue(totalExpensesPrice) // Reset to totalExpensesPrice when toggled again
      } else {
        onBudgetLimit(null) // Clear budget limit when disabling
      }

      return !prev
    })
  }

  return (
    <>
      <Header />

      <Main>
        <Card className='sm:w-[23rem] mx-auto'>
          <CardHeader>
            <CardTitle className='flex justify-between items-center'>
              <div className='flex gap-x-4'>
                <h2>Define a budget</h2>
                <Switch checked={isChecked} onCheckedChange={handleChecked} />
              </div>

              {budgetLimit && (
                <Popover>
                  <PopoverTrigger className='flex'>
                    <InfoBtn />
                  </PopoverTrigger>
                  <PopoverContent className='text-sm text-center p-3'>
                    You can reset your budget limit by switching the button again
                  </PopoverContent>
                </Popover>
              )}
            </CardTitle>
            {isChecked && <CardDescription>Choose a maximum amount for this month</CardDescription>}
          </CardHeader>

          {isChecked && (
            <CardContent className='flex flex-col gap-y-4 items-center p-6'>
              {budgetLimit ? (
                <h4>
                  Limit: <strong className='text-orange text-lg'>{budgetLimit}€</strong>
                </h4>
              ) : (
                <BudgetSliderBar
                  sliderDefaultValue={totalExpensesPrice ?? 0}
                  sliderValue={sliderValue}
                  onSliderValue={setSliderValue}
                />
              )}
            </CardContent>
          )}

          {budgetLimit && <BudgetProgressBar />}
        </Card>
      </Main>
    </>
  )
}

export default BudgetPage
