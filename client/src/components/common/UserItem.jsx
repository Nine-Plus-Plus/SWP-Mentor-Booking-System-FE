import React, { memo, useState } from 'react';
import { Button } from '../index';
import clsx from 'clsx';
import icons from '../../utils/icon';
import { useNavigate } from 'react-router-dom';
import path from '../../utils/path';
import { SoundTwoTone } from '@ant-design/icons';
import Swal from 'sweetalert2';
import { useUserStore } from '../../store/useUserStore';
import { faTurkishLiraSign } from '@fortawesome/free-solid-svg-icons';
import { convertDateMeeting } from '../../utils/commonFunction';

const UserItem = ({
  avatar,
  roleItem,
  name,
  code,
  specialized,
  gender,
  addGroup,
  showSchedule,
  star,
  sameClass,
  setCountMember,
  countMember,
  isAdded,
  idUser,
  schedule
}) => {
  const { FaStar, FaStarHalf } = icons;
  const navigate = useNavigate();
  const [added, setAdded] = useState(false);
  const [selectMeeting, setSelectMeeting] = useState('');
  const { role } = useUserStore();

  const handleStar = star => {
    let stars = [];
    if (star > 0) for (let i = 1; i <= star; i++) stars.push(<FaStar color="#F8D72A" className="start-item" />);
    if (star > 0 && star % 1 !== 0) stars.push(<FaStarHalf color="#F8D72A" className="start-item" />);
    return stars;
  };

  const handleAddMember = () => {
    setCountMember(countMember + 1);
    setAdded(true);
  };

  const handleBookingClick = () => {
    if (selectMeeting) {
      Swal.fire({
        title: 'Are you sure?',
        text: `Booking ${selectMeeting}!`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, booking it',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true // Đảo ngược vị trí của nút xác nhận và hủy
      }).then(result => {
        if (result.isConfirmed) {
          Swal.fire({
            title: 'Booking Successful!',
            text: `Your ${selectMeeting} has been booked successfully.`,
            icon: 'success',
            confirmButtonText: 'OK',
            timer: 3000, // Đóng sau 3 giây
            timerProgressBar: true // Hiển thị progress bar khi đếm thời gian
          });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire('Cancelled', 'Cancelled this booking!', 'error');
          setSelectMeeting('');
        }
      });
    } else {
      Swal.fire({
        title: 'Error!', // Tiêu đề thông báo
        text: 'Please select a meeting before booking.', // Nội dung thông báo
        icon: 'error', // Biểu tượng lỗi
        confirmButtonText: 'OK', // Văn bản nút xác nhận
        confirmButtonColor: '#d33', // Màu nút xác nhận
        timer: 5000, // Thời gian tự động đóng sau 5 giây
        timerProgressBar: true // Hiển thị progress bar
      });
    }
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
                  roleItem === 'Mentor' && 'text-red-500',
                  sameClass && 'bg-yellow-400 p-1 rounded-md'
                )}
              >
                {roleItem}
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
                {roleItem === 'Mentor' ? 'Mentor' : 'Student'} name: {name}
              </p>
              <p>
                {roleItem === 'Mentor' ? 'Mentor' : 'Student'} code: {code}
              </p>
              <p>
                {roleItem === 'Mentor' ? 'Skill' : 'Specialized'}: {specialized}
              </p>
              <p>Gender: {gender}</p>
            </div>
          </div>

          {showSchedule && role !== 'MENTOR' ? (
            <div className="flex flex-col h-full gap-3 w-5/12">
              <div className="flex">
                <h1 className="font-bold text-xl text-white bg-blue-400 p-1 rounded-md ">Schedule</h1>
              </div>
              <div className="max-h-52 overflow-y-auto border border-gray-300 rounded-lg p-4">
                <div className="flex flex-col gap-2 text-md">
                  <div className="flex flex-col gap-2 text-md">
                    {schedule &&
                      schedule.map((meeting, index) => (
                        <div key={meeting.id} className="flex items-center">
                          <input
                            type="radio"
                            id={meeting.id}
                            name="meeting"
                            value={meeting.name}
                            className="mr-2 text-blue-600 focus:ring-blue-500"
                            onChange={e => setSelectMeeting(e.target.id)}
                          />
                          <label htmlFor={meeting.id}>{convertDateMeeting(meeting, index + 1)}</label>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            schedule &&
            role !== 'MENTOR' && (
              <div className="flex flex-col h-full gap-3 w-5/12">
                <div className="flex">
                  <h1 className="font-bold text-xl text-white bg-blue-400 p-1 rounded-md ">Schedule</h1>
                </div>
                <div className="text-red-500">no schedule yet</div>
              </div>
            )
          )}
          <div className="flex flex-col gap-2">
            <div className="w-[13vw]">
              {!addGroup && (
                <Button
                  text={'View Detail'}
                  fullWidth={'w-full'}
                  htmlType={'button'}
                  bgColor={'bg-orange-500'}
                  textColor={'text-white'}
                  textSize={'text-sm'}
                  bgHover={'hover:bg-orange-400 hover:text-gray-100'}
                  // fix
                  to={`${path.USER_PROFILE}/${roleItem}/${idUser}`}
                />
              )}
            </div>
            {showSchedule && role === 'STUDENT' && (
              <div className="w-[13vw]">
                <Button
                  text={'Booking'}
                  fullWidth={'w-full'}
                  htmlType={'button'}
                  bgColor={'bg-blue-500'}
                  textColor={'text-white'}
                  textSize={'text-sm'}
                  bgHover={'hover:bg-blue-400 hover:text-gray-100'}
                  onClick={handleBookingClick}
                />
              </div>
            )}
            {addGroup &&
              (!added && !isAdded ? (
                <div className="w-[13vw]">
                  <Button
                    text={'Add Group'}
                    fullWidth={'w-full'}
                    htmlType={'button'}
                    bgColor={'bg-green-500'}
                    textColor={'text-white'}
                    textSize={'text-sm'}
                    bgHover={'hover:bg-green-400 hover:text-gray-100'}
                    onClick={handleAddMember}
                  />
                </div>
              ) : (
                <div className="w-[13vw]">
                  <Button
                    text={'Added'}
                    fullWidth={'w-full'}
                    htmlType={'text'}
                    bgColor={'bg-gray-500'}
                    textColor={'text-white'}
                    textSize={'text-sm'}
                    acHover={'cursor-not-allowed'}
                  />
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(UserItem);
