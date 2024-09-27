import React from "react";
import { Navigation } from "../../components/index";
import { Outlet } from "react-router-dom";
import { useUserStore } from "../../store/useUserStore";
import { menuNavbarItemsAdmin } from "../../utils/constant";

function PublicAdmin() {
  return (
    <div className="w-full flex-wrap flex justify-end">
      <Navigation menuNavbarItemsStudent={menuNavbarItemsAdmin}>
        <Outlet />
      </Navigation>
    </div>
  );
}

export default PublicAdmin;
