import { useState } from 'react'
import { Input } from '../ui/input'
import CheckButton from '../buttons/CheckButton'
import { useMoney } from '@/context/MoneyContext'

type AddTransactionInputProps = {
  addTransaction: (amount: number) => void
  withdrawRef?: React.MutableRefObject<null>
}

function AddTransactionInput({ withdrawRef, addTransaction }: AddTransactionInputProps) {
  const { balanceAmount } = useMoney()
  const [inputValue, setInputValue] = useState('')

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault()
    const amount = Number(inputValue)

    if (withdrawRef && amount > balanceAmount) {
      return alert('Cannot withdraw more than your available balance')
    }

    if (!isNaN(amount) && amount > 0) {
      addTransaction(amount)
      setInputValue('')
    }
  }

  return (
    <form className='flex gap-2'>
      <Input
        type='number'
        min={0}
        placeholder='Enter amount'
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
      />

      <CheckButton type='submit' className='size-8' eventHandler={handleAdd} />
    </form>
  )
}

export default AddTransactionInput
