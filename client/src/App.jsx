import path from './utils/path';
import { Navigate, Route, Routes } from 'react-router-dom';
import {
  ClassList,
  Login,
  MentorList,
  UserHome,
  ChangePass,
  OTPInput,
  ForgotPass,
  AdminHome,
  Activity,
  UserProfile,
  StudentGroup,
  ListGroup,
  CreateProject,
  ListHistoryPoint,
  UserList
} from './components/index';
import { PublicLayout, PublicAdmin, PublicHome, PublicAboutUs, PublicStudent, PublicMentor } from './pages/index';
import { ToastContainer } from 'react-toastify';
import PrivateRoute from '../src/middlewares/PrivateRoute';
import GuestRoute from '../src/middlewares/GuestRoute';
import { useUserStore } from './store/useUserStore';
import { useEffect } from 'react';
import { roleForComponent } from './utils/constant';
import UserManager from './components/admin/UserManager';

function App() {
  const { token, role, resetUserStore } = useUserStore();
  useEffect(() => {
    if (!localStorage.getItem('token')) resetUserStore();
  }, []);

  return (
    <div>
      <ToastContainer position="top-right" autoClose={1000} limit={3} />
      <Routes>
        {/* {!token && <Route path="/" element={<PublicHome />} />} */}
        <Route path="/" element={<Navigate to={!token ? path.PUBLIC : roleForComponent[role]} replace />} />

        {/* Route cho trang public */}
        <Route path={path.PUBLIC} element={<PublicLayout />}>
          <Route index element={<PublicHome />} />
          <Route path={path.ABOUT_US} element={<PublicAboutUs />} />
          <Route path={path.LOGIN} element={<GuestRoute element={Login} />} />
          <Route path={path.FORGOT_PASS} element={<GuestRoute element={ForgotPass} />} />
          <Route path={path.CHANGE_PASS} element={<GuestRoute element={ChangePass} />} />
          <Route path={path.OTP_INPUT} element={<GuestRoute element={OTPInput} />} />
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
          <Route index element={<UserHome />} />
          <Route path={path.USER_VIEW_MENTOR} element={<MentorList />} />
          <Route path={path.USER_VIEW_CLASS} element={<ClassList />} />
          <Route path={path.STUDENT_BOOKING} element={<Activity />} />
          <Route path={path.STUDENT_GROUP} element={<StudentGroup />} />
          <Route path={`${path.STUDENT_GROUP}/${path.STUDENT_CREATE_GROUP}`} element={<CreateProject />} />
          <Route
            path={`${path.STUDENT_GROUP}/${path.STUDENT_CREATE_GROUP}/${path.USER_PROFILE_NAME_ID}`}
            element={<UserProfile />}
          />
          {/* <Route path={`${path.STUDENT_GROUP}/${path.LIST_GROUP}`} element={<ListGroup />} /> */}
          <Route path={`${path.USER_VIEW_CLASS}/${path.USER_PROFILE_NAME_ID}`} element={<UserProfile />} />
          <Route path={`${path.USER_VIEW_MENTOR}/${path.USER_PROFILE_NAME_ID}`} element={<UserProfile />} />
          <Route path={path.USER_PROFILE_NAME_ID} element={<UserProfile />} />
          <Route path={path.USER_PROFILE_ALL} element={<UserProfile />} />
          <Route path={path.STUDENT_HISTORY_POINT} element={<ListHistoryPoint />} />
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
          <Route index element={<UserHome />} />
          <Route path={path.USER_VIEW_CLASS} element={<ClassList />} />
          <Route path={path.LIST_GROUP} element={<ListGroup />} />
          <Route path={path.USER_VIEW_MENTOR} element={<MentorList />} />
          <Route path={path.USER_PROFILE_ALL} element={<UserProfile />} />
          <Route path={`${path.USER_VIEW_CLASS}/${path.USER_PROFILE_NAME_ID}`} element={<UserProfile />} />
          <Route path={`${path.USER_VIEW_MENTOR}/${path.USER_PROFILE_NAME_ID}`} element={<UserProfile />} />
        </Route>
        <Route path="*" element={<Navigate to={path.PUBLIC} replace />} />

        {/* Route cho trang admin */}
        <Route
          path={path.PUBLIC_ADMIN}
          element={
            <PrivateRoute role={role}>
              <PublicAdmin />
            </PrivateRoute>
          }
        >
          <Route index element={<AdminHome />} />
          <Route path={path.USER_PROFILE} element={<UserProfile />} />
          <Route path={path.ADMIN_USER_MANAGER} element={<UserManager />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
