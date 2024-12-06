import { formatAmount } from '@/utils/formatAmount'
import { TableCell, TableRow } from '../ui/table'
import BalanceAmount from '../balance/BalanceAmount'
import BudgetAmount from '../budget/BudgetAmount'

type FinancialSummaryProps = {
  budgetAmountLeft?: number
  totalExpensesPrice: number
}

function FinancialSummary({ budgetAmountLeft, totalExpensesPrice }: FinancialSummaryProps) {
  return (
    <TableRow>
      <TableCell colSpan={budgetAmountLeft ? 2 : 3}>
        <BalanceAmount />
      </TableCell>

      {budgetAmountLeft && (
        <TableCell>
          Left: <BudgetAmount amount={budgetAmountLeft} />
        </TableCell>
      )}

      <TableCell className='text-right'>
        Total: <strong>{formatAmount(totalExpensesPrice)}€</strong>
      </TableCell>
    </TableRow>
  )
}

export default FinancialSummary
