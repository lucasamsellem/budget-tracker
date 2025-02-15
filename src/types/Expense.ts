export type Expense = {
  name: string
  category: string
  price: number
}
export type OnExpense = React.Dispatch<React.SetStateAction<Expense>>
export type ExpensesListType = Expense[]
export type OnExpensesList = (value: Expense[] | ((prevValue: Expense[]) => Expense[])) => void

export type TotalExpensesPrice = number

// Expenses categories
export type CategoriesColor = Record<string, string>
