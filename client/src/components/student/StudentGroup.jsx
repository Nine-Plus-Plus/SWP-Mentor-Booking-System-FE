import React, { useState } from 'react';
import Button from '../common/Button';
import path from '../../utils/path';
import ListGroup from '../common/ListGroup';

const StudentGroup = () => {
  const [haveGroup, setHaveGroup] = useState(true);
  // className = 'p-3 bg-white rounded-md flex flex-col gap-5 ';
  return (
    <div>
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
              fullWidth={'w-1/5'}
              to={path.STUDENT_CREATE_GROUP}
            />
          </div>

          <ListGroup />
        </div>
      }
    </div>
  );
};

export default StudentGroup;
