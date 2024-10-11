import React from 'react';
import NotificationItem from './NotificationItem';

const ListNotification = () => {
  return (
    <div className="w-full h-full flex flex-col break-words gap-3">
      <div className=" bg-white flex flex-col gap-5 p-3 rounded-md">
        <NotificationItem type={'ADD'} />
        <NotificationItem type={'NOTIFICATION'} />
      </div>
    </div>
  );
};

export default ListNotification;
