import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from './pages/login'
import HomePage from './pages/AdminHome'
import AdminProfile from './pages/AdminProfile'
import ManageEmployes from './pages/ManageEmployes'
import UserHome from './pages/UserHome'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/adminhome" element={<HomePage />} />
        <Route path='/userhome' element={<UserHome />} />
        <Route path='/admin-profile' element={<AdminProfile />} />
        <Route path='/manageemployees' element={<ManageEmployes />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
