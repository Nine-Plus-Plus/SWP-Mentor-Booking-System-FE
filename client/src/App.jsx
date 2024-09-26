
import path from './utils/path'
import { Navigate, Route, Routes } from 'react-router-dom'
import {ClassList, Login, MentorList, StudentHome} from './components/index'
import PublicLayout from './pages/public/PublicLayout'
import PublicHome from './pages/public/PublicHome'
import PublicAboutUs from './pages/public/PublicAboutUs'
import { ToastContainer } from 'react-toastify';
import PublicStudent from './pages/users/PublicStudent'
import PrivateRoute from '../middlewares/privateRoute'
import { useUserStore } from './store/useUserStore'

function App() {

  const { isLoggedIn, role } = useUserStore()
  return (
    <div> 
      <ToastContainer
        position="top-right" // Vị trí hiển thị toast
        autoClose={1000} // Thời gian tự động đóng sau 1 giây
        limit={3} // Giới hạn số lượng toast hiển thị
      />
      <Routes>
        <Route path="/" element={<Navigate to={!isLoggedIn ? path.PUBLIC : path.PUBLIC_STUDENT} replace />} />
        <Route path={path.PUBLIC} element={<PublicLayout />}>
          <Route index element={<PublicHome />}/>
          <Route path={path.ABOUT_US} element={<PublicAboutUs />}/>
          <Route path={path.LOGIN} element={<Login />}/>
        </Route>
        <Route
          path={path.PUBLIC_STUDENT}
          element={
            <PrivateRoute >
              <PublicStudent />
            </PrivateRoute>
          }
        >
          <Route index element={<StudentHome />} />
          <Route path={path.STUDENT_VIEW_MENTOR} element={<MentorList />} />
          <Route path={path.STUDENT_VIEW_CLASS} element={<ClassList />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App