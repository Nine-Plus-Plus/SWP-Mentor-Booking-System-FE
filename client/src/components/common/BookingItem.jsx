import { getMyProfile } from '../../apis/UserServices';
import { useUserStore } from '../../store/useUserStore';
import { useParams } from 'react-router-dom';
import React, { useState } from 'react';
import Button from './Button';
import clsx from 'clsx';
import { acceptBooking, cancelBookingMentor, cancelBookingStudent, rejectBooking } from '../../apis/BookingServices';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

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
  project,
  idGroup,
  idBooking
}) => {
  const { role } = useUserStore();

  const [status, setStatus] = useState(initialStatus);
  const roleProfile = role.toLowerCase();
  const userData = useUserStore(); // Lấy userData từ store
  const sameGroup = mentor?.assignedClass?.className === userData?.aclass?.className; // Kiểm tra xem mentor có cùng group không
  const token = localStorage.getItem('token');

  const acceptByMentor = async id => {
    try {
      const response = await acceptBooking(id, token);
      console.log(response);
      if (response && response?.statusCode === 200) {
        Swal.fire({
          title: 'Accept Successful!',
          text: `Your booking has been booked successfully.`,
          icon: 'success',
          confirmButtonText: 'OK',
          timer: 3000, // Đóng sau 3 giây
          timerProgressBar: true // Hiển thị progress bar khi đếm thời gian
        });
        setStatus('CONFIRMED');
      } else toast.error(response?.message);
    } catch (error) {
      toast.error(error);
      console.log(error);
    }
  };
  const rejectByMentor = async id => {
    try {
      const response = await rejectBooking(id, token);
      console.log(response);
      if (response && response?.statusCode === 200) {
        Swal.fire({
          title: 'Reject Successful!',
          text: `Your booking has been reject successfully.`,
          icon: 'success',
          confirmButtonText: 'OK',
          timer: 3000, // Đóng sau 3 giây
          timerProgressBar: true // Hiển thị progress bar khi đếm thời gian
        });
        setStatus('REJECTED');
      } else toast.error(response?.message);
    } catch (error) {
      toast.error(error);
      console.log(error);
    }
  };

  const cancelByMentor = async id => {
    try {
      const response = await cancelBookingMentor(id, token);
      console.log(response);
      if (response && response?.statusCode === 200) {
        Swal.fire({
          title: 'Cancel Successful!',
          text: `Your booking has been cancel successfully.`,
          icon: 'success',
          confirmButtonText: 'OK',
          timer: 3000, // Đóng sau 3 giây
          timerProgressBar: true // Hiển thị progress bar khi đếm thời gian
        });
        setStatus('CANCELED');
      } else toast.error(response?.message);
    } catch (error) {
      toast.error(error);
      console.log(error);
    }
  };

  const cancelByStudent = async id => {
    try {
      const response = await cancelBookingStudent(id, token);
      console.log(response);
      if (response && response?.statusCode === 200) {
        Swal.fire({
          title: 'Cancel Successful!',
          text: `Your booking has been cancel successfully.`,
          icon: 'success',
          confirmButtonText: 'OK',
          timer: 3000, // Đóng sau 3 giây
          timerProgressBar: true // Hiển thị progress bar khi đếm thời gian
        });
        setStatus('CANCELED');
      } else toast.error(response?.message);
    } catch (error) {
      toast.error(error);
      console.log(error);
    }
  };

  const handleAccept = () => {
    Swal.fire({
      title: 'Are you sure?',
      html: `Are you sure accept this booking?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, accept it',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true // Đảo ngược vị trí của nút xác nhận và hủy
    }).then(result => {
      if (result.isConfirmed) {
        acceptByMentor(idBooking);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'Cancelled accept booking!', 'error');
      }
    });
  };

  const handleReject = () => {
    Swal.fire({
      title: 'Are you sure?',
      html: `Are you sure reject this booking?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, reject it',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true // Đảo ngược vị trí của nút xác nhận và hủy
    }).then(result => {
      if (result.isConfirmed) {
        rejectByMentor(idBooking);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'Cancelled reject booking!', 'error');
      }
    });
  };

  const handleCancelMentor = () => {
    Swal.fire({
      title: 'Are you sure?',
      html: `Are you sure cancel this booking?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, cancel it',
      cancelButtonText: 'No!',
      reverseButtons: true // Đảo ngược vị trí của nút xác nhận và hủy
    }).then(result => {
      if (result.isConfirmed) {
        cancelByMentor(idBooking);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'Cancelled this action!', 'error');
      }
    });
  };

  const handleCancelStudent = () => {
    Swal.fire({
      title: 'Are you sure?',
      html: `Are you sure cancel this booking?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, cancel it',
      cancelButtonText: 'No!',
      reverseButtons: true // Đảo ngược vị trí của nút xác nhận và hủy
    }).then(result => {
      if (result.isConfirmed) {
        cancelByStudent(idBooking);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'Cancelled this action!', 'error');
      }
    });
  };

  return (
    <div className="min-h-[20vh] border shadow-md rounded-md p-3 w-full">
      {/* Tiêu đề với chữ tô đậm */}
      <h1 className="font-bold text-xl text-main-1">
        {roleProfile === 'mentor' ? (
          <span className={clsx(sameGroup && 'bg-yellow-400 p-1 rounded-md')}>Group: {group}</span>
        ) : (
          <span className={clsx(roleProfile === 'mentor' && 'text-red-500')}>Booking Mentor: {mentor}</span>
        )}
      </h1>

      <div className="flex p-2 justify-between">
        <div className="flex flex-col gap-2 text-md">
          <p>Day Booking: {dateCreated}</p>
          <p>Class: {className}</p>
          <p>Group: {group}</p>
          <p>Project: {project}</p>
        </div>
        <div className="flex flex-col gap-2 text-md">
          <p> Schedule: {schedule}</p>
          <p>Student Booking: {studentBook}</p>
          <p>Point Manner: {point}</p>
          <p>Total member: {totalMember}/5</p>
        </div>
        <div className="flex flex-col items-end justify-center gap-y-3 w-1/3 ">
          {roleProfile === 'mentor' ? (
            <>
              {status === 'PENDING' ? (
                <div className="flex flex-col w-full gap-3">
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
              ) : status === 'CONFIRMED' ? (
                <div className="flex flex-col w-full gap-3">
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
                    onClick={handleCancelMentor}
                    className="w-full min-w-[120px]"
                  />
                </div>
              ) : status === 'CANCELLED' ? (
                <Button
                  text={'Canceled'}
                  textColor={'text-white'}
                  bgColor={'bg-gray-500'}
                  bgHover={'hover:bg-gray-400 hover:cursor-not-allowed'}
                  htmlType={'button'}
                  className="w-full min-w-[120px]"
                />
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
              {status === 'PENDING' ? (
                <Button
                  text={'PENDING'}
                  textColor={'text-white'}
                  bgColor={'bg-yellow-500'}
                  bgHover={'hover:bg-yellow-400'}
                  htmlType={'button'}
                  acHover={'hover:cursor-not-allowed'}
                  className="w-full min-w-[120px]"
                />
              ) : status === 'CONFIRMED' ? (
                <div className="flex flex-col w-full gap-3">
                  <Button
                    text={'Accepted'}
                    textColor={'text-white'}
                    bgColor={'bg-green-500'}
                    bgHover={'hover:bg-green-400'}
                    htmlType={'button'}
                    className="w-full min-w-[120px]"
                    acHover={'hover:cursor-not-allowed'}
                  />
                  <Button
                    text={'Cancel'}
                    textColor={'text-white'}
                    bgColor={'bg-gray-500'}
                    bgHover={'hover:bg-gray-400'}
                    htmlType={'button'}
                    className="w-full min-w-[120px]"
                    acHover={'hover:cursor-pointer'}
                    onClick={handleCancelStudent}
                  />
                </div>
              ) : status === 'CANCELLED' ? (
                <Button
                  text={'Canceled'}
                  textColor={'text-white'}
                  bgColor={'bg-gray-500'}
                  bgHover={'hover:bg-gray-400 hover:cursor-not-allowed'}
                  htmlType={'button'}
                  className="w-full min-w-[120px]"
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
