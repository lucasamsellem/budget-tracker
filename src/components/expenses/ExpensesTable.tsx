import { Table, TableBody, TableFooter, TableHeader } from '@/components/ui/table'
import ExpensesCategories from './ExpensesCategories'
import ExpensesList from './ExpensesList'
import FinancialSummary from './FinancialSummary'
import {
  ExpensesListType,
  OnExpensesList,
  TotalExpensesPrice,
  CategoriesColor,
} from '@/types/Expense'
import { BudgetAmountLeft } from '@/types/Money'

type ExpensesTableProps = {
  expensesList: ExpensesListType
  onExpensesList: OnExpensesList
  categoriesColor: CategoriesColor
  totalExpensesPrice: TotalExpensesPrice
  budgetAmountLeft: BudgetAmountLeft
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
