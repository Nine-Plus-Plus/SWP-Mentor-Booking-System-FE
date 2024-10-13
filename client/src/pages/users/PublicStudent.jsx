import React, { useEffect, useState } from 'react';
import { Navigation } from '../../components/index';
import { Outlet } from 'react-router-dom';
import { menuNavbarItemsStudent } from '../../utils/constant';
import { getMyProfile } from '../../apis/UserServices';
import { useUserStore } from '../../store/useUserStore';

const PublicStudent = () => {
  const { setUserData, setCurrent, userData } = useUserStore();
  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await getMyProfile(token);
        console.log(response);

        setUserData(response.studentsDTO);
        const name = response.studentsDTO.user.fullName.split(' ');
        setCurrent(name.length > 0 ? name[name.length - 1] : response.studentsDTO.user.fullName);
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
