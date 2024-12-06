import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ExpensesTablePage from './pages/ExpensesTablePage'
import HomePage from './pages/HomePage'
import { ThemeProvider } from './components/ui/theme-provider'
import PageNotFound from './pages/PageNotFound'
import BudgetPage from './pages/BudgetPage'
import { MoneyProvider } from './context/MoneyContext'
import ProtectedRoute from './components/ProtectedRoute'
import Footer from './components/footer/Footer'

// Solde: voir s'il reste suffisament d'argent ✔️
// Rooting pour solde et dépenses ✔️
// Trier en fonction du type de dépense ✔️
// Modifier info dans le tableau ✔️
// Dès qu'une expense est ajoutée, déduire son prix de la balance ✔️
// Pour première visite, obligation d'entrer la balance ✔️
// Graphiques ✔️
// Select currency

function App() {
  return (
    <ThemeProvider defaultTheme='light' storageKey='vite-ui-theme'>
      <div className='flex min-h-screen flex-col dark:bg-zinc-950'>
        <MoneyProvider>
          <BrowserRouter>
            <Routes>
              <Route path='budget-tracker/home' element={<HomePage />} />

              <Route
                path='budget-tracker/budget'
                element={
                  <ProtectedRoute>
                    <BudgetPage />
                  </ProtectedRoute>
                }
              />

              <Route
                path='budget-tracker/table'
                element={
                  <ProtectedRoute>
                    <ExpensesTablePage />
                  </ProtectedRoute>
                }
              />

              <Route path='*' element={<PageNotFound />} />
            </Routes>
          </BrowserRouter>
        </MoneyProvider>

        <Footer />
      </div>
    </ThemeProvider>
  )
}

export default App
