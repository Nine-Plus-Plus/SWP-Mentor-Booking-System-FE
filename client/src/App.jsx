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
import Activity from './components/student/Activity';
import StudentProfile from './components/student/StudentProfile';
import PublicAdmin from './pages/users/PublicAdmin';
import ForgotPass from './components/login/ForgotPass'
import ChangePass from './components/login/ChangePass'
import { OTPInput } from './components/login/OTPInput'

import AdminHome from './components/admin/AdminHome';
import UserList from './components/admin/UserList';

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
          <Route index element={<PublicHome />}/>
          <Route path={path.ABOUT_US} element={<PublicAboutUs />}/>
          <Route path={path.LOGIN} element={<Login />}/>
          <Route path={path.FORGOT_PASS} element={<ForgotPass/>}/>
          <Route path={path.CHANGE_PASS} element={<ChangePass/>}/>
          <Route path={path.OTP_INPUT} element={<OTPInput/>}/>
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
          <Route path={path.STUDENT_ACTIVITY} element={<Activity />} />
          <Route path={path.STUDENT_PROFILE} element={<StudentProfile />} />
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

        {/* Route cho trang admin */}
        <Route path={path.PUBLIC_ADMIN} element={<PublicAdmin />}>
          <Route index element={<AdminHome />} />
          <Route path={path.STUDENT_PROFILE} element={<StudentProfile />} />
          <Route path={path.ADMIN_USER_LIST} element={<UserList />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
