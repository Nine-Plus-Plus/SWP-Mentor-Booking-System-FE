import React, { useState } from 'react';
import Button from '../common/Button';
import TopicList from '../common/TopicList';

const StudentGroup = () => {
  const [haveGroup, setHaveGroup] = useState(true);
  const [showTopic, setShowTopic] = useState(true)

  return (
    <div className="p-3 bg-white rounded-md flex flex-col gap-5 ">
      {
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl text-red-600 font-semibold">You don't in any group:</h1>
          <div className="flex gap-3">
            <Button
              text={'Create Group'}
              textColor={'text-white'}
              bgColor={'bg-main-1'}
              htmlType={'button'}
              textSize={'text-xl'}
              bgHover={'hover:bg-main-2'}
              fullWidth={'w-1/5'}
            />
            <Button
              text={'Join Group'}
              textColor={'text-white'}
              bgColor={'bg-green-500'}
              htmlType={'button'}
              textSize={'text-xl'}
              bgHover={'hover:bg-green-400'}
              fullWidth={'w-1/5'}
            />
          </div>
        </div>
      }
      <TopicList />
    </div>
  );
};

export default StudentGroup;
