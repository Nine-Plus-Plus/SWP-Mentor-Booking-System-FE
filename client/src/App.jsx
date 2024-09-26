import { useState } from 'react'
import path from './utils/path'
import { Route, Routes } from 'react-router-dom'
import {Login} from './components/index'
import PublicLayout from './pages/public/PublicLayout'
import PublicHome from './pages/public/PublicHome'
import PublicAboutUs from './pages/public/PublicAboutUs'
import { ToastContainer } from 'react-toastify';
import PublicStudent from './pages/users/PublicStudent'

function App() {

  return (
    <div> 
      <ToastContainer
        position="top-right" // Vị trí hiển thị toast
        autoClose={1000} // Thời gian tự động đóng sau 1 giây
        limit={3} // Giới hạn số lượng toast hiển thị
      />
      <Routes>
        <Route path={path.PUBLIC} element={<PublicLayout />}>
          <Route index element={<PublicHome />}/>
          <Route path={path.ABOUT_US} element={<PublicAboutUs />}/>
          <Route path={path.LOGIN} element={<Login />}/>
        </Route>
        <Route path={path.PUBLIC_STUDENT} element={<PublicStudent />}>
        </Route>
      </Routes>
    </div>
  )
}

export default App