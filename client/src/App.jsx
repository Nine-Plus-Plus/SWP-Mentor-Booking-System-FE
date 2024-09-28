import path from './utils/path';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ClassList, Login, MentorList, StudentHome } from './components/index';
import PublicLayout from './pages/public/PublicLayout';
import PublicHome from './pages/public/PublicHome';
import PublicAboutUs from './pages/public/PublicAboutUs';
import { ToastContainer } from 'react-toastify';
import { PublicStudent, PublicMentor } from './pages/users';
import PrivateRoute from '../middlewares/privateRoute';
import { useUserStore } from './store/useUserStore';

function App() {
  const { isLoggedIn, role } = useUserStore();
  return (
    <div>
      <ToastContainer
        position="top-right" // Vị trí hiển thị toast
        autoClose={1000} // Thời gian tự động đóng sau 1 giây
        limit={3} // Giới hạn số lượng toast hiển thị
      />
      <Routes>
        <Route path="/" element={<Navigate to={!isLoggedIn ? path.PUBLIC : path.PUBLIC_STUDENT} replace />} />

        {/* Route cho trang public */}
        <Route path={path.PUBLIC} element={<PublicLayout />}>
          <Route index element={<PublicHome />} />
          <Route path={path.ABOUT_US} element={<PublicAboutUs />} />
          <Route path={path.LOGIN} element={<Login />} />
        </Route>

        {/* Route cho trang student */}
        <Route
          path={path.PUBLIC_STUDENT}
          element={
            <PrivateRoute role={role}>
              <PublicStudent />
            </PrivateRoute>
          }
        >
          <Route index element={<StudentHome />} />
          <Route path={path.STUDENT_VIEW_MENTOR} element={<MentorList />} />
          <Route path={path.STUDENT_VIEW_CLASS} element={<ClassList />} />
        </Route>

        {/* Route cho trang mentor */}
        <Route
          path={path.PUBLIC_MENTOR}
          element={
            <PrivateRoute role={role}>
              <PublicMentor />
            </PrivateRoute>
          }
        >
          <Route index element={<StudentHome />} />
          <Route path={path.STUDENT_VIEW_CLASS} element={<ClassList />} />
        </Route>
        <Route path="*" element={<Navigate to={path.PUBLIC} replace />} />
      </Routes>
    </div>
  );
}

export default App;
