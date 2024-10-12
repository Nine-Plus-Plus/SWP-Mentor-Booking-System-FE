import React, { useEffect, useState } from 'react';
import { Navigation } from '../../components/index';
import { Outlet } from 'react-router-dom';
import { menuNavbarItemsStudent } from '../../utils/constant';
import { getMyProfile } from '../../apis/UserServices';
import { useUserStore } from '../../store/useUserStore';

const PublicStudent = () => {
  const { setUserData } = useUserStore();
  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await getMyProfile(token);
        console.log(response);

        setUserData(response.studentsDTO);
      } catch (err) {
        console.log(err?.message || 'Đã xảy ra lỗi');
      } finally {
      }
    };

    fetchUserData();
  }, []);
  return (
    <div className="w-full flex-wrap flex justify-end">
      <Navigation menuNavbar={menuNavbarItemsStudent}>
        <Outlet />
      </Navigation>
    </div>
  );
};

export default PublicStudent;
