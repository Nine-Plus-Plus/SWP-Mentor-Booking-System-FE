import React, { useEffect } from 'react';
import { Navigation } from '../../components';
import { menuNavbarItemsMentor } from '../../utils/constant';
import { Outlet } from 'react-router-dom';
import { useUserStore } from '../../store/useUserStore';
import { getMyProfile } from '../../apis/UserServices';

const PublicMentor = () => {
  const { setUserData } = useUserStore();
  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await getMyProfile(token);
        console.log(response);

        setUserData(response.mentorsDTO);
      } catch (err) {
      } finally {
      }
    };

    fetchUserData();
  }, []);
  return (
    <div className="w-full flex-wrap flex justify-end">
      <Navigation menuNavbar={menuNavbarItemsMentor}>
        <Outlet />
      </Navigation>
    </div>
  );
};

export default PublicMentor;
