import { Table, TableBody, TableFooter, TableHeader } from '@/components/ui/table'
import ExpensesCategories from './ExpensesCategories'
import ExpensesList from './ExpensesList'
import FinancialSummary from './FinancialSummary'
import { BudgetAmountLeft } from '@/types/Money'

type ExpensesTableProps = {
  budgetAmountLeft: BudgetAmountLeft
}

function ExpensesTable({ budgetAmountLeft }: ExpensesTableProps) {
  return (
    <Table>
      <TableHeader>
        <ExpensesCategories />
      </TableHeader>

      <TableBody>
        <ExpensesList />
      </TableBody>

      <TableFooter>
        <FinancialSummary budgetAmountLeft={budgetAmountLeft} />
      </TableFooter>
    </Table>
  )
}

export default ExpensesTable
