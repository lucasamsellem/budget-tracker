import { ReactNode } from 'react'

type MainProps = {
  children: ReactNode
  className?: string
}

function Main({ children, className }: MainProps) {
  return <main className={`flex-1 mx-8 ${className || ''}`}>{children}</main>
}

export default Main
