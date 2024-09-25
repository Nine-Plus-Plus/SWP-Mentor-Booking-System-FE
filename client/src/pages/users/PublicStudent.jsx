
import React, { useEffect, useState } from 'react'
import { fetchUser } from '../../apis/UserServices'
import { Pagination, Table } from "antd"
import TopHeader from '../../components/banner/TopHeader';
import Navigation from '../../components/banner/Navigation';

const PublicStudent = () => {
    return (
      <div className='w-full'>
        {/* <TopHeader /> */}
        <Navigation />
      </div>
    )
}

export default PublicStudent 