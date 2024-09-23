import { useState } from 'react'
import path from './utils/path'
import { Route, Routes } from 'react-router-dom'
import Login from './components/login/Login'
import PublicLayout from './pages/public/PublicLayout'
import PublicHome from './pages/public/PublicHome'
import PublicAboutUs from './pages/public/PublicAboutUs'

function App() {

  return (
    <div>    
      <Routes>
        <Route path={path.PUBLIC} element={<PublicLayout />}>
          <Route index element={<PublicHome />}/>
          <Route path={path.ABOUT_US} element={<PublicAboutUs />}/>
          <Route path={path.LOGIN} element={<Login />}/>
        </Route>
          
      </Routes>
    </div>
  )
}

export default App