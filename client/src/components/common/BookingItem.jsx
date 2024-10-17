import { getMyProfile } from '../../apis/UserServices';
import { useUserStore } from '../../store/useUserStore';
import { useParams } from 'react-router-dom';
import React, { useState } from 'react';
import Button from './Button';
import clsx from 'clsx';

export const BookingItem = ({
  className,
  studentBook,
  status: initialStatus,
  schedule,
  mentor,
  point,
  dateCreated,
  totalMember,
  group,
  project
}) => {
  const { role } = useUserStore();
  const { name } = useParams();
  const [status, setStatus] = useState(initialStatus); 

  const roleProfile = name ? name.toUpperCase() : role.toLowerCase(); 

  const userData = useUserStore(); // Lấy userData từ store
  const sameGroup = mentor?.assignedClass?.className === userData?.aclass?.className; // Kiểm tra xem mentor có cùng group không

  const handleAccept = () => {
    setStatus('accepted');
  };

  const handleReject = () => {
    setStatus('rejected');
  };

  const handleCancel = () => {
    setStatus('pending');
  };

  return (
    <div className="min-h-[20vh] border shadow-md rounded-md p-3 w-full">
      {/* Tiêu đề với chữ tô đậm */}
      <h1 className="font-bold text-xl text-main-1">
        {roleProfile === 'mentor' ? (
          <span className={clsx(sameGroup && 'bg-yellow-400 p-1 rounded-md')}>
            Group: {group}
          </span>
        ) : (
          <span className={clsx(roleProfile === 'mentor' && 'text-red-500')}>
            mentor: {mentor}
          </span>
        )}
      </h1>
      
      <div className="flex p-2 justify-between">
        <div className="flex flex-col gap-2 text-md">
          <p>Day Booking: {dateCreated}</p>
          <p>Class: {className}</p>
          <p>Group: {group}</p>
          <p>Project: {project}</p>
        </div>
        <div className="flex flex-col gap-2 pl-20 text-md">
          <p>Booking Schedule: {schedule}</p>
          <p>Student Booking: {studentBook}</p>
          <p>Point Manner: {point}</p>
          <p>Total member: {totalMember}/5</p>
        </div>
        <div className="flex flex-col items-end justify-center gap-y-3 w-1/3 ">
          {roleProfile === 'mentor' ? (
            <>
              {status === 'pending' ? (
                <div className="flex flex-col gap-3">
                  <Button
                    text={'Accept'}
                    textColor={'text-white'}
                    bgColor={'bg-green-500'}
                    bgHover={'hover:bg-green-400'}
                    htmlType={'button'}
                    onClick={handleAccept} 
                    className="w-full min-w-[120px]"
                  />
                  <Button
                    text={'Reject'}
                    textColor={'text-white'}
                    bgColor={'bg-red-500'}
                    bgHover={'hover:bg-red-400'}
                    htmlType={'button'}
                    onClick={handleReject} 
                    className="w-full min-w-[120px]" 
                  />
                </div>
              ) : status === 'accepted' ? (
                <div className="flex flex-col gap-3">
                  <Button
                    text={'Accepted'}
                    textColor={'text-white'}
                    bgColor={'bg-green-500'}
                    bgHover={'hover:bg-green-400'}
                    htmlType={'button'}
                    acHover={'hover:cursor-not-allowed'}
                    className="w-full min-w-[120px]" 
                  />
                  <Button
                    text={'Cancel'}
                    textColor={'text-white'}
                    bgColor={'bg-gray-500'}
                    bgHover={'hover:bg-gray-400'}
                    htmlType={'button'}
                    onClick={handleCancel}
                    className="w-full min-w-[120px]" 
                  />
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  <Button
                    text={'Rejected'}
                    textColor={'text-white'}
                    bgColor={'bg-red-500'}
                    bgHover={'hover:bg-red-400'}
                    htmlType={'button'}
                    acHover={'hover:cursor-not-allowed'}
                    className="w-full min-w-[120px]"
                  />
                </div>
              )}
            </>
          ) : (
            <>
            {/* role Student */}
              {status === 'pending' ? (
                <Button
                  text={'Pending'}
                  textColor={'text-white'}
                  bgColor={'bg-yellow-500'}
                  bgHover={'hover:bg-yellow-400'}
                  htmlType={'button'}
                  acHover={'hover:cursor-not-allowed'}
                  className="w-full min-w-[120px]"
                />
              ) : status === 'accepted' ? (
                <Button
                  text={'Accepted'}
                  textColor={'text-white'}
                  bgColor={'bg-green-500'}
                  bgHover={'hover:bg-green-400'}
                  htmlType={'button'}
                  className="w-full min-w-[120px]"
                  acHover={'hover:cursor-not-allowed'}
                />
              ) : (
                <Button
                  text={'Rejected'}
                  textColor={'text-white'}
                  bgColor={'bg-red-500'}
                  bgHover={'hover:bg-red-400'}
                  htmlType={'button'}
                  className="w-full min-w-[120px]"
                  acHover={'hover:cursor-not-allowed'}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
