import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import ExpensesPage from './pages/ExpensesPage'
import HomePage from './pages/HomePage'
import { ThemeProvider } from './components/ui/theme-provider'
import PageNotFound from './pages/PageNotFound'
import BudgetPage from './pages/BudgetPage'
import { MoneyProvider } from './context/MoneyContext'
import ProtectedRoute from './pages/ProtectedRoute'
import Footer from './components/footer/Footer'
import { ExpenseProvider } from './context/ExpenseContext'

// Faire en sorte que le budget soit accordé au total des dépenses (valeur min) si l'utilisateur veut le modifier  ✔️ && baser default value en fonction de totalExpensesPrice
// CUSTOM HOOK pour blanace et savings ✔️
// Livret A ? ✔️ Must run when on other page

// établir plage temporelle pour définir budget
// Expliquer pourquoi totalExpensesPrice est la somme par défaut lorsqu'on définit un bdget
// Code refactoring add/withdraw TabsList
// Dates d'ajout des dépenses
// Impossible de retirer l'argent du compte si inféireur au budget limit
// Inputs number

function App() {
  return (
    <ThemeProvider defaultTheme='light' storageKey='vite-ui-theme'>
      <div className='flex min-h-screen flex-col dark:bg-zinc-950'>
        <MoneyProvider>
          <ExpenseProvider>
            <BrowserRouter basename={import.meta.env.BASE_URL}>
              <Routes>
                {/* Redirect from the root URL to '/home' */}
                <Route path='/' element={<Navigate to='/home' replace />} />
                <Route path='/home' element={<HomePage />} />

                <Route
                  path='/budget'
                  element={
                    <ProtectedRoute>
                      <BudgetPage />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path='/expenses'
                  element={
                    <ProtectedRoute>
                      <ExpensesPage />
                    </ProtectedRoute>
                  }
                />

                <Route path='*' element={<PageNotFound />} />
              </Routes>
            </BrowserRouter>
          </ExpenseProvider>
        </MoneyProvider>

        <Footer />
      </div>
    </ThemeProvider>
  )
}

export default App
