import { TableHead, TableRow } from '../ui/table'

function ExpensesCategories() {
  return (
    <TableRow>
      {/* Left empty for delete button */}
      <TableHead />
      <TableHead>Name</TableHead>
      <TableHead>Category</TableHead>
      <TableHead colSpan={3} className='text-right'>
        Price
      </TableHead>
    </TableRow>
  )
}

export default ExpensesCategories
