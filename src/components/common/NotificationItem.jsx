import React from 'react';
import Button from './Button';

const NotificationItem = ({ type, title, sender, content, group, project, daySent }) => {
  return (
    <div className="h-[25vh] border shadow-md rounded-md p-3 w-full">
      <h1 className="font-bold text-xl text-main-1"> Notification</h1>
      <div className="flex p-2 justify-between">
        <div className="flex flex-col gap-2 text-md">
          <p>Title: {title}</p>
          <p>Sender: </p>
          <p>Content: </p>
          <p>Day sent: </p>
        </div>
        {type === 'ADD' && (
          <>
            <div className="flex flex-col gap-2 text-md">
              <p>Group: </p>
              <p>Project: </p>
            </div>
          </>
        )}
        <div className="flex items-center justify-center flex-col gap-3 w-1/6">
          {type === 'ADD' && (
            <>
              <Button
                text={'Accept'}
                textColor={'text-white'}
                bgColor={'bg-green-500'}
                bgHover={'hover:bg-green-400'}
                htmlType={'button'}
                fullWidth={'w-full'}
                onClick={() => {}}
              />
              <Button
                text={'Reject'}
                textColor={'text-white'}
                bgColor={'bg-red-500'}
                htmlType={'button'}
                fullWidth={'w-full'}
                onClick={() => {}}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationItem;
