import React, { useState } from 'react';
import Button from '../common/Button';
import TopicList from '../common/TopicList';
import path from '../../utils/path';

const StudentGroup = () => {
  const [haveGroup, setHaveGroup] = useState(true);

  

  return (
    <div className="p-3 bg-white rounded-md flex flex-col gap-5 ">
      {
        <div className="flex flex-col gap-2 items-center">
          <h1 className="text-2xl text-red-600 font-semibold">You don't in any group:</h1>
          <div className="flex gap-3">
            <Button
              text={'Create Group'}
              textColor={'text-white'}
              bgColor={'bg-main-1'}
              htmlType={'button'}
              textSize={'text-xl'}
              bgHover={'hover:bg-main-2'}
              fullWidth={'w-full'}
              to={path.STUDENT_CREATE_GROUP}
            />
            <Button
              text={'Join To Group'}
              textColor={'text-white'}
              bgColor={'bg-green-500'}
              htmlType={'button'}
              textSize={'text-xl'}
              bgHover={'hover:bg-green-400'}
              fullWidth={'w-full'}
              to={path.STUDENT_JOIN_GROUP}
            />
          </div>
        </div>
      }
    </div>
  );
};

export default StudentGroup;
