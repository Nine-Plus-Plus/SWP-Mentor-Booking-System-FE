import React from 'react';
import Button from './Button';

const GroupItem = ({ idGroup, groupName, idTopic, totalPoint, projectName, totalMember, process, className }) => {
  return (
    <div className="h-[20vh] border shadow-md rounded-md p-3 w-full">
      <h1 className="font-bold text-xl text-main-1"> Group name: {groupName}</h1>
      <div className="flex p-2 justify-between">
        <div className="flex flex-col gap-2 text-md">
          <p>Project Name: {projectName}</p>
          <p>Topic: {idTopic}</p>
          <p>Class: {className}</p>
        </div>
        <div className="flex flex-col gap-2 text-md">
          <p>Process: {process}</p>
          <p>Total Point: {totalPoint}</p>
          <p>Total member: {totalMember}/5</p>
        </div>
        <div className="flex items-center justify-center">
          {totalMember < 5 ? (
            <Button
              text={'Join'}
              textColor={'text-white'}
              bgColor={'bg-green-500'}
              bgHover={'hover:bg-green-400'}
              htmlType={'button'}
              onClick={() => {}}
            />
          ) : (
            <Button
              text={'Full'}
              textColor={'text-white'}
              bgColor={'bg-red-500'}
              htmlType={'button'}
              acHover={'hover:cursor-not-allowed'}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default GroupItem;
