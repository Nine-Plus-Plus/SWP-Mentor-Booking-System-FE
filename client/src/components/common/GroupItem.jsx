import React from 'react';
import Button from './Button';
import { useUserStore } from '../../store/useUserStore';

const GroupItem = ({ idGroup, groupName, idTopic, totalPoint, projectName, totalMember, process, className }) => {
  const { role } = useUserStore();
  return (
    <div className="h-[25vh] border shadow-md rounded-md p-3 w-full">
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
        <div className="flex justify-center h-full flex-col gap-3 w-1/5">
          <Button
            text={'Show More'}
            textColor={'text-white'}
            bgColor={'bg-yellow-500'}
            bgHover={'hover:bg-yellow-400'}
            htmlType={'button'}
            fullWidth={'w-full'}
            onClick={() => {}}
          />
          {role === 'MENTOR' && totalMember < 5 && (
            <Button
              text={'Add More'}
              textColor={'text-white'}
              bgColor={'bg-green-500'}
              bgHover={'hover:bg-green-400'}
              htmlType={'button'}
              fullWidth={'w-full'}
              onClick={() => {}}
            />
          )}
          {totalMember < 5 ? (
            role !== 'MENTOR' && (
              <Button
                text={'Join'}
                textColor={'text-white'}
                bgColor={'bg-green-500'}
                bgHover={'hover:bg-green-400'}
                htmlType={'button'}
                fullWidth={'w-full'}
                onClick={() => {}}
              />
            )
          ) : (
            <Button
              text={'Full'}
              textColor={'text-white'}
              bgColor={'bg-red-500'}
              htmlType={'button'}
              fullWidth={'w-full'}
              acHover={'hover:cursor-not-allowed'}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default GroupItem;
