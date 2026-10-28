import { Route, Routes } from "react-router-dom"
import LandingPage from "./pages/LandingPage.jsx"
import SignupPage from "./pages/SignupPage.jsx"
import LoginPage from "./pages/LoginPage"
import DashboardPage from "./pages/DashboardPage.jsx"
import NotFoundPage from "./pages/NotFoundPage.jsx"

function App(){
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  )
}

export default App