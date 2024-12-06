import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import AddTransactionInput from '@/components/balance/AddTransactionInput'
import BalanceAmount from '@/components/balance/BalanceAmount'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useMoney } from '@/context/MoneyContext'
import { useRef } from 'react'
import Header from '@/components/header/Header'

function HomePage() {
  const { balanceAmount, handleTransactions } = useMoney()
  const withdrawRef = useRef(null)

  return (
    <>
      <Header />

      <main className='flex-1'>
        <Card className='w-[23rem] mx-auto space-y-5 dark:text-white'>
          <CardHeader>
            <CardTitle>
              <BalanceAmount />
            </CardTitle>
            <CardDescription>Add or withdraw money from your account</CardDescription>
          </CardHeader>

          <CardContent>
            <Tabs defaultValue='add'>
              <TabsList
                className={`grid justify-normal ${balanceAmount ? 'grid-cols-2' : 'grid-cols-1'}`}
              >
                <TabsTrigger value='add'>Add</TabsTrigger>

                {balanceAmount ? <TabsTrigger value='withdraw'>Withdraw</TabsTrigger> : null}
              </TabsList>

              <TabsContent value='add'>
                <AddTransactionInput addTransaction={amount => handleTransactions(amount, true)} />
              </TabsContent>

              {balanceAmount ? (
                <TabsContent ref={withdrawRef} value='withdraw'>
                  <AddTransactionInput
                    withdrawRef={withdrawRef}
                    addTransaction={amount => handleTransactions(amount, false)}
                  />
                </TabsContent>
              ) : null}
            </Tabs>
          </CardContent>
        </Card>
      </main>
    </>
  )
}

export default HomePage
