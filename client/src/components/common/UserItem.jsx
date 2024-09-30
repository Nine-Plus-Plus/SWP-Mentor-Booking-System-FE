import React from 'react';
import { Button } from '../index';
import clsx from 'clsx';
import icons from '../../utils/icon';

const UserItem = ({ avatar, role, name, code, specialized, gender, addGroup, showSchedule, star, sameClass }) => {
  const { FaStar, FaStarHalf } = icons;

  const handleStar = star => {
    let stars = [];
    if (star > 0) for (let i = 1; i <= star; i++) stars.push(<FaStar color="#F8D72A" className="start-item" />);
    if (star > 0 && star % 1 !== 0) stars.push(<FaStarHalf color="#F8D72A" className="start-item" />);
    return stars;
  };

  return (
    <div className="border shadow-md rounded-md h-[180px]">
      <div className="h-[179px] flex w-full gap-4">
        <img src="/public/avatar1.jpg" alt="avatar" className="object-cover w-[160px] h-full rounded-md" />
        <div className="flex items-center justify-between w-full p-3">
          <div className="flex flex-col h-full gap-3">
            <div className="flex items-center gap-1">
              <h1
                className={clsx(
                  'font-bold text-xl',
                  role === 'Mentor' && 'text-red-500',
                  sameClass && 'bg-yellow-400 p-1 rounded-md'
                )}
              >
                {role}
              </h1>
              <div className="flex">
                {handleStar(star).length > 0 &&
                  handleStar(star).map((star, number) => {
                    return <span key={number}>{star}</span>;
                  })}
              </div>
            </div>
            <div className="flex flex-col gap-2 text-md">
              <p>
                {role === 'Mentor' ? 'Mentor' : 'Student'} name: {name}
              </p>
              <p>
                {role === 'Mentor' ? 'Mentor' : 'Student'} code: {code}
              </p>
              <p>
                {role === 'Mentor' ? 'Skill' : 'Specialized'}: {specialized}
              </p>
              <p>Gender: {gender}</p>
            </div>
          </div>

          {showSchedule && (
            <div className="flex flex-col h-full gap-3">
              <div className="flex">
                <h1 className="font-bold text-xl text-white bg-blue-400 p-1 rounded-md">Schedule</h1>
              </div>
              <div className="flex flex-col gap-2 text-md">
                <p>Meeting 1: 2024-09-29, 10:00 - 11:00</p>
                <p>Meeting 2: 2024-09-29, 13:00 - 14:00</p>
                <p>Meeting 3: 2024-09-30, 15:00 - 16:00</p>
                <p>Meeting 4: 2024-10-01, 09:00 - 10:00</p>
              </div>
            </div>
          )}

          <div className="flex flex-col gap-2">
            <div className="w-[15vw]">
              <Button
                text={'View Detail'}
                fullWidth={'w-full'}
                htmlType={'button'}
                bgColor={'bg-orange-500'}
                textColor={'text-white'}
                textSize={'text-sm'}
                bgHover={'hover:bg-orange-400 hover:text-gray-100'}
                onClick={() => {}}
              />
            </div>
            {showSchedule && (
              <div className="w-[15vw]">
                <Button
                  text={'Booking'}
                  fullWidth={'w-full'}
                  htmlType={'button'}
                  bgColor={'bg-blue-500'}
                  textColor={'text-white'}
                  textSize={'text-sm'}
                  bgHover={'hover:bg-blue-400 hover:text-gray-100'}
                  onClick={() => {}}
                />
              </div>
            )}
            {addGroup && (
              <div className="w-[15vw]">
                <Button
                  text={'Add Group'}
                  fullWidth={'w-full'}
                  htmlType={'button'}
                  bgColor={'bg-green-500'}
                  textColor={'text-white'}
                  textSize={'text-sm'}
                  bgHover={'hover:bg-green-400 hover:text-gray-100'}
                  onClick={() => {}}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserItem;
