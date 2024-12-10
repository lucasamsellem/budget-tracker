import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import ExpensesTablePage from './pages/ExpensesTablePage'
import HomePage from './pages/HomePage'
import { ThemeProvider } from './components/ui/theme-provider'
import PageNotFound from './pages/PageNotFound'
import BudgetPage from './pages/BudgetPage'
import { MoneyProvider } from './context/MoneyContext'
import ProtectedRoute from './pages/ProtectedRoute'
import Footer from './components/footer/Footer'
import { ExpenseProvider } from './context/ExpenseContext'

// Solde: voir s'il reste suffisament d'argent ✔️
// Rooting pour solde et dépenses ✔️
// Trier en fonction du type de dépense ✔️
// Modifier info dans le tableau ✔️
// Dès qu'une expense est ajoutée, déduire son prix de la balance ✔️
// Pour première visite, obligation d'entrer la balance ✔️
// Graphiques ✔️
// Ajouter Shadcn empty inputs ✔️
// Faire en sorte que le budget soit accordé au total des dépenses (valeur min) si l'utilisateur veut le modifier  ✔️ && baser default value en fonction de totalExpensesPrice
// Inputs number
// Livret A ?
// Select currency

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
                  path='/table'
                  element={
                    <ProtectedRoute>
                      <ExpensesTablePage />
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
