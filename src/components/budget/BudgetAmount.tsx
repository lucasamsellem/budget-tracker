type BudgetAmountProps = {
  amount: number | undefined
}

function BudgetAmount({ amount }: BudgetAmountProps) {
  return (
    <span>
      <strong className='text-orange'>{amount}€</strong>
    </span>
  )
}

export default BudgetAmount
