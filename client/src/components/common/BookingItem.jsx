import React from 'react';
import Button from './Button';

export const BookingItem = ({className, studentBook, status, schedule, mentor, point, dateCreated, totalMember, group, project}) => {
  return (
    <div className="min-h-[20vh] border shadow-md rounded-md p-3 w-full">
      <h1 className="font-bold text-xl text-main-1"> Mentor: {mentor}</h1>
      <div className="flex p-2 justify-between">
        <div className="flex flex-col gap-2 text-md">
          <p>Day Booking: {dateCreated}</p>
          <p>Class: {className}</p>
          <p>Group: {group}</p>
          <p>Project: {project}</p>          
        </div>
        <div className="flex flex-col gap-2 text-md">
        <p>Booking Schedule: {schedule}</p>
          <p>Student Booking: {studentBook}</p>
          <p>Point Manner: {point}</p>
          <p>Total member: {totalMember}/5</p>
        </div>
        <div className="flex items-center justify-center">
          {status === 'pending' ? (
            <Button
              text={'Pending'}
              textColor={'text-white'}
              bgColor={'bg-yellow-500'}
              bgHover={'hover:bg-yellow-400'}
              htmlType={'button'}
              acHover={'hover:cursor-not-allowed'}
            />
          ) : status === 'accepted' ? (
            <Button
              text={'Accepted'}
              textColor={'text-white'}
              bgColor={'bg-green-500'}
              bgHover={'hover:bg-green-400'}
              htmlType={'button'}
              acHover={'hover:cursor-not-allowed'}
            />
          ) : (
            <Button
              text={'Rejected'}
              textColor={'text-white'}
              bgColor={'bg-red-500'}
              bgHover={'hover:bg-red-400'}
              htmlType={'button'}
              acHover={'hover:cursor-not-allowed'}
            />
          )}
        </div>
      </div>
    </div>
  );
};
