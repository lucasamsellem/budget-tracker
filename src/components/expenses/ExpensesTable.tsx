import { Table, TableBody, TableFooter, TableHeader } from '@/components/ui/table'
import ExpensesCategories from './ExpensesCategories'
import ExpensesList from './ExpensesList'
import FinancialSummary from './FinancialSummary'
import { ExpenseTypes } from '@/types/ExpenseTypes'

type ExpensesTableProps = {
  expensesList: ExpenseTypes[]
  onExpensesList: (value: ExpenseTypes[] | ((prevValue: ExpenseTypes[]) => ExpenseTypes[])) => void
  categoriesColor: Record<string, string>
  budgetAmountLeft?: number
  totalExpensesPrice: number
}

function ExpensesTable({
  expensesList,
  onExpensesList,
  categoriesColor,
  budgetAmountLeft,
  totalExpensesPrice,
}: ExpensesTableProps) {
  return (
    <Table>
      <TableHeader>
        <ExpensesCategories />
      </TableHeader>

      <TableBody>
        <ExpensesList
          expensesList={expensesList}
          onExpensesList={onExpensesList}
          categoriesColor={categoriesColor}
        />
      </TableBody>

      <TableFooter>
        <FinancialSummary
          budgetAmountLeft={budgetAmountLeft}
          totalExpensesPrice={totalExpensesPrice}
        />
      </TableFooter>
    </Table>
  )
}

export default ExpensesTable
