import { Header } from './components/Header'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { QuizSelectionPage } from './pages/QuizSelectionPage'
import { KeyboardSelectionPage } from './pages/KeyboardSelectionPage'
import { GlossarySelectionPage } from './pages/GlossarySelectionPage'
import { QuizPage } from './pages/QuizPage'
import { KeyboardPage } from './pages/KeyboardPage'
import { GlossaryPage } from './pages/GlossaryPage'

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index path="/" element={<HomePage />} />
          <Route path="/quiz" element={<QuizSelectionPage />} />
          <Route path="/quiz/:alphabet" element={<QuizPage />} />
          <Route path="/keyboard" element={<KeyboardSelectionPage />} />
          <Route path="/keyboard/:alphabet" element={<KeyboardPage />} />
          <Route path="/glossary" element={<GlossarySelectionPage />} />
          <Route path="/glossary/:alphabet" element={<GlossaryPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
