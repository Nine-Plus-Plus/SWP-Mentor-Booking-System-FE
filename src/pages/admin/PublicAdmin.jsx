import React, { useEffect } from 'react';
import { Navigation } from '../../components/index';
import { Outlet } from 'react-router-dom';
import { useUserStore } from '../../store/useUserStore';
import { menuNavbarItemsAdmin } from '../../utils/constant';
import { getMyProfile } from '../../apis/UserServices';

function PublicAdmin() {
  const { setUserData, setCurrent, setMentorOfClass, setFullData, setAvatar, isUpdate } = useUserStore();
  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await getMyProfile(token);
        console.log(response);
        if (response && response?.statusCode === 200) {
          const userDataConvert = { ...response, user: response?.usersDTO };

          setUserData(userDataConvert);
          setFullData(response);
          setAvatar(response?.usersDTO?.avatar);
          const name = response?.usersDTO?.fullName?.split(' ') || ['ADMIN'];
          setCurrent(name.length > 0 ? name[name.length - 1] : response?.usersDTO?.fullName);
        }
      } catch (err) {
        console.log(err?.message || 'Đã xảy ra lỗi');
      } finally {
      }
    };

    fetchUserData();
  }, [localStorage.getItem('token'), isUpdate]);

  return (
    <div className="w-full flex-wrap flex justify-end">
      <Navigation menuNavbar={menuNavbarItemsAdmin}>
        <Outlet />
      </Navigation>
    </div>
  );
}

export default PublicAdmin;
