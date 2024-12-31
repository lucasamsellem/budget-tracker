import { useRef, useState, FormEvent } from 'react'
import { Accounts } from '@/types/Money'
import { useMoney } from '@/context/MoneyContext'

interface UseFundAccountReturn {
  inputValue: string
  onInputValue: React.Dispatch<React.SetStateAction<string>>
  deposits: Accounts
  onDeposits: React.Dispatch<React.SetStateAction<Accounts>>
  depositAmount: number
  savingsAccountAmount: number
  withdrawRef: React.MutableRefObject<null>
  isWithdrawing: boolean
  handleFundAccount: (e: FormEvent, accountType: 'balance' | 'savings') => void
}

function useFundAccount(): UseFundAccountReturn {
  const { deposits, onDeposits } = useMoney()
  const [inputValue, setInputValue] = useState('')
  const withdrawRef = useRef(null)

  // Derived
  const depositAmount = Number(inputValue)
  const isWithdrawing = withdrawRef.current ? true : false
  const savingsAccountAmount = deposits.savings.reduce((acc, cur) => acc + cur, 0)

  const handleFundAccount = (e: FormEvent, accountType: 'balance' | 'savings') => {
    e.preventDefault()

    if (!isNaN(depositAmount) && depositAmount > 0) {
      // Update selected account, and both accounts if savings is being funded
      onDeposits(prev => ({
        ...prev,
        [accountType]: [...prev[accountType], isWithdrawing ? -depositAmount : depositAmount],
        ...(accountType === 'savings' && {
          balance: [...prev.balance, isWithdrawing ? depositAmount : -depositAmount],
        }),
      }))

      setInputValue('')
    }
  }

  return {
    inputValue,
    onInputValue: setInputValue,
    deposits,
    onDeposits,
    depositAmount,
    savingsAccountAmount,
    withdrawRef,
    isWithdrawing,
    handleFundAccount,
  }
}

export default useFundAccount
