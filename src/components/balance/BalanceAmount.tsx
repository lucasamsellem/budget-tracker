import { useMoney } from '@/context/MoneyContext'

function BalanceAmount() {
  const { balanceAmount } = useMoney()

  return (
    <h2>
      Balance:{' '}
      <span className={`font-bold ${balanceAmount > 0 ? 'text-green' : 'text-red'}`}>
        {balanceAmount}€
      </span>
    </h2>
  )
}

export default BalanceAmount
