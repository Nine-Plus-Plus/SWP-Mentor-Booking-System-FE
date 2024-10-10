import React from 'react';
import { Navigation } from '../../components';
import { menuNavbarItemsMentor } from '../../utils/constant';
import { Outlet } from 'react-router-dom';

const PublicMentor = () => {
  return (
    <div className="w-full flex-wrap flex justify-end">
      <Navigation menuNavbar={menuNavbarItemsMentor}>
        <Outlet />
      </Navigation>
    </div>
  );
};

export default PublicMentor;
