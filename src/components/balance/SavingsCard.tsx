import { useMoney } from '@/context/MoneyContext'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import DepositInput from './DepositInput'
import useFundAccount from '@/hooks/useFundAccount'
import colorizeAccountAmount from '@/utils/colorizeAccountAmount'
import { FormEvent, useEffect } from 'react'
import roundToTwo from '@/utils/roundToTwo'
import { useLocalStorage } from '@/hooks/useLocalStorage'

function SavingsCard() {
  const { balanceAccountAmount } = useMoney()
  const {
    inputValue,
    onInputValue,
    withdrawRef,
    isWithdrawing,
    depositAmount,
    savingsAccountAmount,
    handleFundAccount,
  } = useFundAccount()

  const [savingsWithInterests, setSavingsWithInterests] = useLocalStorage(
    'savingsWithInterests',
    savingsAccountAmount
  )
  const [interests, setInterests] = useLocalStorage('interests', 0)

  useEffect(() => {
    if (!savingsAccountAmount) return

    // Initialization
    setSavingsWithInterests(roundToTwo(savingsAccountAmount + interests))

    // Update growth rate every second
    const interval = setInterval(() => {
      setSavingsWithInterests(prev => {
        const newSavings = prev * 1.0001
        setInterests(prevInterests => prevInterests + (newSavings - prev))
        return newSavings
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [savingsAccountAmount, interests, setSavingsWithInterests, setInterests])

  function handleFundSavingsAccount(e: FormEvent) {
    if (!isWithdrawing && depositAmount > balanceAccountAmount) {
      return alert('You cannot add more than your balance amount to your savings account')
    }

    if (isWithdrawing && depositAmount > savingsWithInterests) {
      return alert('You cannot withdraw more than your savings amount')
    }

    handleFundAccount(e, 'savings')
  }

  if (!balanceAccountAmount) return null

  return (
    <Card className='sm:w-[23rem] mx-auto space-y-5 h-min dark:text-white'>
      <CardHeader>
        <CardTitle className='flex justify-between items-center'>
          <span>Savings: {colorizeAccountAmount(savingsWithInterests)}</span>

          {interests ? <span className='text-green text-sm'>+{roundToTwo(interests)}€</span> : null}
        </CardTitle>
        <CardDescription>Increases by 0.01% every second</CardDescription>
      </CardHeader>

      <CardContent>
        <Tabs defaultValue='add'>
          <TabsList className='grid grid-cols-2'>
            <TabsTrigger value='add'>Add</TabsTrigger>
            <TabsTrigger value='withdraw'>Withdraw</TabsTrigger>
          </TabsList>

          <TabsContent value='add'>
            <DepositInput
              inputValue={inputValue}
              onInputValue={onInputValue}
              eventHandler={e => handleFundSavingsAccount(e)}
            />
          </TabsContent>

          <TabsContent value='withdraw'>
            <DepositInput
              inputValue={inputValue}
              onInputValue={onInputValue}
              eventHandler={e => handleFundSavingsAccount(e)}
              withdrawRef={withdrawRef}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

export default SavingsCard
