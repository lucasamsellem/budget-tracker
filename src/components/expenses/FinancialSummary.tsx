import { formatAmount } from '@/utils/formatAmount'
import { TableCell, TableRow } from '../ui/table'
import { useExpense } from '@/context/ExpenseContext'
import colorizeAccountAmount from '@/utils/colorizeAccountAmount'
import { useMoney } from '@/context/MoneyContext'

function FinancialSummary() {
  const { balanceAccountAmount } = useMoney()
  const { totalExpensesPrice, budgetAmountLeft } = useExpense()

  return (
    <TableRow className='text-nowrap'>
      <TableCell colSpan={budgetAmountLeft ? 2 : 3}>
        Balance: {colorizeAccountAmount(balanceAccountAmount)}
      </TableCell>

      {budgetAmountLeft ? (
        <TableCell>
          Budget left: <strong className='text-orange'>{budgetAmountLeft}€</strong>
        </TableCell>
      ) : null}

      <TableCell className='text-right'>
        Total: <strong>{formatAmount(totalExpensesPrice)}€</strong>
      </TableCell>
    </TableRow>
  )
}

export default FinancialSummary
