import React, { useEffect, useState } from 'react';
import { Navigation } from '../../components/index';
import { Outlet } from 'react-router-dom';
import { menuNavbarItemsStudent } from '../../utils/constant';

const PublicStudent = () => {
  return (
    <div className="w-full flex-wrap flex justify-end">
      <Navigation menuNavbar={menuNavbarItemsStudent}>
        <Outlet />
      </Navigation>
    </div>
  );
};

export default PublicStudent;
