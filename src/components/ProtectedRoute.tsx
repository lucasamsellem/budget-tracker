import { useMoney } from '@/context/MoneyContext'
import { Navigate } from 'react-router-dom'

type ProtectedRouteProps = {
  children: JSX.Element
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { balanceAmount } = useMoney()

  // Users must fund their account to access other pages
  if (!balanceAmount) return <Navigate to={'/budget-tracker/home'} replace />

  return children
}

export default ProtectedRoute
