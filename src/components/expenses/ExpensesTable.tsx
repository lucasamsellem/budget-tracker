import { Table, TableBody, TableFooter, TableHeader } from '@/components/ui/table'
import ExpensesCategories from './ExpensesCategories'
import ExpensesList from './ExpensesList'
import FinancialSummary from './FinancialSummary'

function ExpensesTable() {
  return (
    <section>
      <Table>
        <TableHeader>
          <ExpensesCategories />
        </TableHeader>

        <TableBody>
          <ExpensesList />
        </TableBody>

        <TableFooter>
          <FinancialSummary />
        </TableFooter>
      </Table>
    </section>
  )
}

export default ExpensesTable
