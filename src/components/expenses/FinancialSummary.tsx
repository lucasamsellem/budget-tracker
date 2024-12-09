import { formatAmount } from '@/utils/formatAmount'
import { TableCell, TableRow } from '../ui/table'
import BalanceAmount from '../balance/BalanceAmount'
import { BudgetAmountLeft } from '@/types/Money'
import { useExpense } from '@/context/ExpenseContext'

type FinancialSummaryProps = {
  budgetAmountLeft: BudgetAmountLeft
}

function FinancialSummary({ budgetAmountLeft }: FinancialSummaryProps) {
  const { totalExpensesPrice } = useExpense()

  return (
    <TableRow>
      <TableCell colSpan={budgetAmountLeft ? 2 : 3}>
        <BalanceAmount />
      </TableCell>

      {budgetAmountLeft ? (
        <TableCell>
          Left: <strong className='text-orange'>{budgetAmountLeft}€</strong>
        </TableCell>
      ) : null}

      <TableCell className='text-right'>
        Total: <strong>{formatAmount(totalExpensesPrice)}€</strong>
      </TableCell>
    </TableRow>
  )
}

export default FinancialSummary
