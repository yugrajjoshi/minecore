import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from './pages/login'
import HomePage from './pages/Home'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
