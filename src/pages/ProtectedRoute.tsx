import { useMoney } from '@/context/MoneyContext'
import { Navigate } from 'react-router-dom'

type ProtectedRouteProps = {
  children: JSX.Element
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { balanceAccountAmount } = useMoney()

  // Users must fund their account to access other pages
  if (!balanceAccountAmount) return <Navigate to={'/home'} replace />

  return children
}

export default ProtectedRoute
