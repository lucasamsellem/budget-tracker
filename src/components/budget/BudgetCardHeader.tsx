import { CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import InfoBtn from '../buttons/InfoBtn'
import { Switch } from '../ui/switch'
import { useMoney } from '@/context/MoneyContext'

type BudgetCardHeaderProps = {
  isChecked: boolean
  onIsChecked: (value: boolean | ((prevValue: boolean) => boolean)) => void
}

function BudgetCardHeader({ isChecked, onIsChecked }: BudgetCardHeaderProps) {
  // Context
  const { budgetLimit, onBudgetLimit } = useMoney()

  function handleChecked() {
    onIsChecked(prev => {
      const newValue = !prev
      if (!newValue) onBudgetLimit(undefined)
      return newValue
    })
  }

  return (
    <CardHeader>
      <CardTitle className='flex items-center'>
        <>
          <div className='flex gap-4'>
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
