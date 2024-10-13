import React, { useState } from 'react';
import Button from '../common/Button';
import path from '../../utils/path';
import ListGroup from '../common/ListGroup';
import { useUserStore } from '../../store/useUserStore';

const StudentGroup = () => {
  const [haveGroup, setHaveGroup] = useState(true);
  // className = 'p-3 bg-white rounded-md flex flex-col gap-5 ';
  const { userData } = useUserStore();
  console.log(userData?.group);
  const { role } = useUserStore();

  return (
    <div>
      {/* neu ko co group */}
      {
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-3 p-3 bg-white rounded-md ">
            <h1 className="text-2xl text-red-600 font-semibold">You don't in any group:</h1>
            <Button
              text={'Create Group'}
              textColor={'text-white'}
              bgColor={'bg-main-1'}
              htmlType={'button'}
              textSize={'text-xl'}
              bgHover={'hover:bg-main-2'}
              fullWidth={'w-2/6'}
              to={path.STUDENT_CREATE_GROUP}
            />
          </div>

          <ListGroup />
        </div>
      }

      {/* neu co group */}
      {
        <div className="flex flex-col gap-5">
          {/* /// Add student to group */}
          <div className="flex flex-col gap-3 p-3 bg-white rounded-md ">
            <h1 className="text-2xl text-red-600 font-semibold">Add more student to group:</h1>
            <Button
              text={'Add Group'}
              textColor={'text-white'}
              bgColor={'bg-green-500'}
              htmlType={'button'}
              textSize={'text-xl'}
              bgHover={'hover:bg-green-200'}
              fullWidth={'w-2/6'}
              to={path.STUDENT_CREATE_GROUP}
            />
          </div>

          {/* Project */}
          <div className="flex flex-col gap-3 p-3 bg-white rounded-md">
            <div className=" border shadow-md rounded-md p-3 w-full">
              <h1 className="font-bold text-xl text-main-1"> Project name: </h1>
              <div className="flex p-2 justify-between">
                <div className="flex flex-col gap-2 text-md">
                  <p>Topic: </p>
                  <p>Process: </p>
                  <p>Description: </p>
                </div>
                <div className="flex justify-center h-full flex-col gap-3 w-1/5">
                  <Button
                    text={'Create task'}
                    textColor={'text-white'}
                    bgColor={'bg-main-1'}
                    bgHover={'hover:bg-main-2'}
                    htmlType={'button'}
                    fullWidth={'w-full'}
                    onClick={() => {}}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Group */}
          <div className="flex flex-col gap-3 p-3 bg-white rounded-md ">
            <div className=" border shadow-md rounded-md p-3 w-full">
              <h1 className="font-bold text-xl text-main-1"> Group name: </h1>
              <div className="flex p-2 justify-between">
                <div className="flex flex-col gap-2 text-md">
                  <p>Class: </p>
                  <p>Total Point: </p>
                  <p>Total member: </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  );
};

export default StudentGroup;
