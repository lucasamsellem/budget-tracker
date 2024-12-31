import { capitalizeFirstLetter } from '@/utils/capitalizeFirstLetter'
import { TableHead, TableRow } from '../ui/table'
import { initialExpenseState } from '@/utils/initialExpenseState'

function ExpensesCategories() {
  const [name, category, price] = Object.keys(initialExpenseState).map(key =>
    capitalizeFirstLetter(key)
  )

  return (
    <TableRow>
      <TableHead /> {/* Left empty for delete button */}
      <TableHead>{name}</TableHead>
      <TableHead>{category}</TableHead>
      <TableHead colSpan={3} className='text-right'>
        {price}
      </TableHead>
    </TableRow>
  )
}

export default ExpensesCategories
