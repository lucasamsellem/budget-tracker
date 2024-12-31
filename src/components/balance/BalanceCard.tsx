import { useMoney } from '@/context/MoneyContext'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import AddTransactionInput from './AddTransactionInput'
import useFundAccount from '@/hooks/useFundAccount'
import { FormEvent } from 'react'
import colorizeAccountAmount from '@/utils/colorizeAccountAmount'

function BalanceCard() {
  const { balanceAccountAmount } = useMoney()
  const { inputValue, onInputValue, withdrawRef, isWithdrawing, depositAmount, handleFundAccount } =
    useFundAccount()

  function handleFundBalanceAccount(e: FormEvent) {
    if (isWithdrawing && depositAmount > balanceAccountAmount) {
      return alert('You cannot withdraw more than your available account amount')
    }

    handleFundAccount(e, 'balance')
  }

  return (
    <div>
      <Card className='sm:w-[23rem] mx-auto space-y-5 h-min dark:text-white '>
        <CardHeader>
          <CardTitle>Balance: {colorizeAccountAmount(balanceAccountAmount)}</CardTitle>
          <CardDescription
            className={!balanceAccountAmount ? 'text-red dark:text-red font-medium' : ''}
          >
            {!balanceAccountAmount
              ? 'You need to add funds first to unlock access to the additional features available in the navigation bar'
              : 'Add or withdraw money from your account'}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Tabs defaultValue='add'>
            <TabsList
              className={`grid justify-normal ${
                balanceAccountAmount ? 'grid-cols-2' : 'grid-cols-1'
              }`}
            >
              <TabsTrigger value='add'>Add</TabsTrigger>
              {balanceAccountAmount ? <TabsTrigger value='withdraw'>Withdraw</TabsTrigger> : null}
            </TabsList>

            <TabsContent value='add'>
              <AddTransactionInput
                inputValue={inputValue}
                onInputValue={onInputValue}
                eventHandler={e => handleFundBalanceAccount(e)}
              />
            </TabsContent>

            {balanceAccountAmount ? (
              <TabsContent value='withdraw'>
                <AddTransactionInput
                  inputValue={inputValue}
                  onInputValue={onInputValue}
                  eventHandler={e => handleFundBalanceAccount(e)}
                  withdrawRef={withdrawRef}
                />
              </TabsContent>
            ) : null}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

export default BalanceCard
