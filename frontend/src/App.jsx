import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from './pages/login'
import HomePage from './pages/AdminHome'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/adminhome" element={<HomePage />} />
        <Route path='/userhome' element={<h1>User Home</h1>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
