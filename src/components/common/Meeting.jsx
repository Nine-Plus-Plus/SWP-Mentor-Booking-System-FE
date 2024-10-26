import React, { useState, useEffect } from 'react';
import { useUserStore } from '../../store/useUserStore';
import { Await, useParams } from 'react-router-dom';
import { Pagination, Modal, Input, Form } from 'antd';
import {
  acceptBooking,
  getAllBookingForGroupByStatus,
  getAllBookingForMentorByStatus
} from '../../apis/BookingServices';
import { convertDateMeeting } from '../../utils/commonFunction';
import Button from './Button';
import Rating from '@mui/material/Rating';
import { Stack } from '@mui/material';
import { toast } from 'react-toastify';
import { createReview } from '../../apis/ReviewServices';

export const Meeting = ({ mentorRating, mentorSchedule, meetUrl, pointPay }) => {
  const { role, fullData, userData } = useUserStore();
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { name, id } = useParams();
  const [bookings, setBookings] = useState([]);
  const [selectedMeeting, setSelectedMeeting] = useState(null);
  const [filter, setFilter] = useState('CONFIRMED');
  const [showAllMeetings, setShowAllMeetings] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 4; // Number of bookings per page

  let roleProfile = name ? name.toUpperCase() : role;

  //lấy thông tin Booking mới nhất
  const latestBooking = bookings?.sort((a, b) => new Date(b.dateCreated) - new Date(a.dateCreated))[0];
  const dateTimeStringFrom = latestBooking?.mentorSchedule?.availableFrom;
  let datePartFrom = '';
  let timePartFrom = '';
  if (latestBooking && latestBooking?.mentorSchedule?.availableFrom) {
    const dateTimeString = latestBooking.mentorSchedule.availableFrom;
    [datePartFrom, timePartFrom] = dateTimeStringFrom.split(' ');
  }

  const dateTimeStringTo = latestBooking?.mentorSchedule?.availableTo;
  let datePartTo = '';
  let timePartTo = '';
  if (latestBooking && latestBooking?.mentorSchedule?.availableTo) {
    const dateTimeString = latestBooking.mentorSchedule.availableTo;
    [datePartTo, timePartTo] = dateTimeStringTo.split(' ');
  }

  // Calculate the bookings to display for the current page
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = currentPage * pageSize;
  const currentBookings = bookings
    ?.sort((a, b) => new Date(b.dateCreated) - new Date(a.dateCreated))
    ?.slice(startIndex, endIndex);

  // Để xem hết Meeting
  const toggleViewAll = () => {
    setShowAllMeetings(!showAllMeetings);
  };
  
  useEffect(() => {
    const token = localStorage.getItem('token');

    const fetchAllConfirmedBooking = async () => {
      try {
        let response;
        roleProfile === 'MENTOR'
          ? (response = await getAllBookingForMentorByStatus(userData?.id, filter, token))
          : (response = await getAllBookingForGroupByStatus(fullData?.groupDTO?.id, filter, token));
        console.log('Meeting', response);
        response && response?.statusCode === 200 ? setBookings(response?.bookingDTOList) : setBookings([]);
      } catch (error) {
        console.log('Booking Error: ', error.message);
      }
    };
    fetchAllConfirmedBooking();
  }, [userData?.id, filter, fullData?.groupDTO?.id]);

  // const handleCreateReview = async data => {
  //   const token = localStorage.getItem('token');
  //   try {
  //     const response = await createReview(data, token);
  //     console.log(response);
  //   } catch (error) {
  //     console.log('Review Error: ', error);
  //   }  
  // };  

  const handleCreateReview = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await form.validateFields();
      const user = roleProfile === 'MENTOR' ? response?.mentorsDTO : response?.studentsDTO;
      const createData = {
        ...values,
        rating,
        user_id: {
          id: profile?.code
        },
        user_receive_id: {
          selectedMeeting
        }   
      }
    } catch (error) {
      
    }
  }

  const handleRatingChange = (event, newValue) => {
    setRating(newValue);
  };

  const handleCommentChange = event => {
    setComment(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    // Submit review logic here
    setIsModalOpen(false); // Close modal after submission
  };

  const showReviewModal = () => {
    // Check condition and display toast error if necessary
    if (!selectedMeeting) {
      toast.error('Please select one Meeting first!');
      console.log('Not choosee Meeting');
    } else {
      setIsModalOpen(true);
    }
  };

  // Handler for page change
  const onPageChange = page => {
    setCurrentPage(page);
  };

  const handleSendReview = () => {};

  return (
    <div className="flex-col">
      {/* Header */}
      <div className="flex justify-between items-center p-5 bg-white shadow-md rounded-3xl">
        <div className="flex items-center gap-4">
          <img src={userData?.user?.avatar} className="w-10 h-10 rounded-full" alt="Avatar" />
          <div className="text-left">
            <p className="font-semibold">Meeting for {userData?.user?.fullName}</p>
            <p className="text-gray-500">{roleProfile === 'STUDENT'? (userData?.studentCode) : (userData?.mentorCode)}</p>
          </div>
        </div>

        {/* Các nút hành động */}
        <div className="flex gap-4 items-center">
          <>
            <button className="bg-blue-500 text-white px-4 py-2 rounded">Paste Meeting URL</button>
            <Button
              text={'View review'}
              htmlType={'button'}
              bgColor={'bg-orange-500'}
              textColor={'text-white'}
              textSize={'text-sm'}
              bgHover={'hover:text-gray-100'}
              onClick={showReviewModal}
            />
          </>

          <Modal
            title={null} 
            open={isModalOpen}
            onCancel={() => {
              form.resetFields();
              setIsModalOpen(false);
              setSelectedMeeting(null);
            }}
            footer={null} // Tắt footer mặc định
          >
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <form className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md" onSubmit={handleSendReview}>
                <h2 className="text-3xl font-bold text-center mb-4">
                  How are you feeling about {selectedMeeting?.mentor?.user?.fullName || ''}?
                </h2>
                <p className="text-center mb-4 text-gray-400 text-sm">
                  Your input is valuable in helping us better understand your needs and tailor our service accordingly.
                </p>
                {roleProfile === 'STUDENT' ? (
                  <Stack spacing={2} className="mb-6">
                  <div className="flex justify-center mb-6">
                    <Rating
                      name="Review-rating"
                      value={rating}
                      precision={0.5}
                      onChange={handleRatingChange}
                      size="large"
                    />
                  </div>
                </Stack>
                ) : null}
                <div className="mb-6">
                  <textarea
                    className="w-full p-4 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-orange-500"
                    rows="6"
                    placeholder="Add a Comment..."
                    value={comment}
                    onChange={handleCommentChange}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-orange-400 to-orange-600 text-white py-3 px-4 rounded-lg hover:from-orange-500 hover:to-orange-700 transition-all"
                >
                  Submit Now
                </button>
                <button
                  type="button"
                  className="w-full mt-2 text-gray-500 py-2"
                  onClick={() => {
                    form.resetFields();
                    setIsModalOpen(false);
                    setSelectedMeeting(null);
                  }}
                >
                  Cancel
                </button>
              </form>
            </div>
          </Modal>
        </div>
      </div>

      {/* Content */}
      <div className="flex gap-3 pt-5 ">
        {/* Profile info */}
        <div className="bg-white p-5 rounded-lg shadow-lg w-1/2">
          {selectedMeeting && currentBookings && currentBookings.length > 0 ? (
            <div className="flex flex-col items-center">
              {roleProfile === 'STUDENT' ? (
                // Hiển thị thông tin mentor nếu roleProfile là 'STUDENT'
                <div key={selectedMeeting?.mentor?.id} className="flex flex-col items-center">
                  <img
                    src={selectedMeeting?.mentor?.user?.avatar || 'MentorAvatar'}
                    className="w-16 h-16 rounded-full mb-4"
                    alt="Mentor"
                  />
                  <div className="text-center">
                    <h2 className="font-bold">{selectedMeeting?.mentor?.user?.fullName || 'MentorName'}</h2>
                    <p className="text-gray-500">{selectedMeeting?.mentor?.mentorCode || 'MentorCode'}</p>
                  </div>
                </div>
              ) : (
                // Hiển thị thông tin leader nếu roleProfile không phải là 'STUDENT'
                selectedMeeting?.group?.students?.map(student =>
                  student?.groupRole === 'LEADER' ? (
                    <div key={student?.id} className="flex flex-col items-center">
                      <img
                        src={student?.user?.avatar || 'Leader Avatar'}
                        className="w-16 h-16 rounded-full mb-4"
                        alt="Leader"
                      />
                      <div className="text-center">
                        <h2 className="font-bold">{student?.user?.fullName || 'Leader Name'}</h2>
                        <p className="text-gray-500">{student?.studentCode || 'Leader Code'}</p>
                      </div>
                    </div>
                  ) : null
                )
              )}
            </div>
          ) : (
            <p className="flex justify-center align-content text-red-500">
              There is no Meeting, Please choose your Meeting information
            </p>
          )}

          {/* Thông tin chi tiết */}
          {selectedMeeting && (
            <div className="bg-white p-8 mt-5">
              <p className="font-bold">Information</p>
              <div>
                <div className="bg-gray-100 p-3 rounded-2xl g-5 mb-2">
                  Mentor Star: {selectedMeeting?.mentor?.star || 'NULL'}
                </div>
                <div className="bg-gray-100 p-3 rounded-2xl g-5 mb-2">
                  Schedule:
                  {selectedMeeting?.mentorSchedule
                    ? `${convertDateMeeting(selectedMeeting.mentorSchedule)}`
                    : 'No Meeting yet'}
                </div>
                <div className="bg-gray-100 p-3 rounded-2xl g-5 mb-2">PointPay: {selectedMeeting?.pointPay || '0'}</div>
                <div className="bg-gray-100 p-3 rounded-2xl g-5 mb-2">
                  MeetURL:{' '}
                  {selectedMeeting?.meetURL ? <a href={selectedMeeting.meetURL}>Join Meeting</a> : 'No meeting yet'}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Sidebar */}
        <div className="flex-col w-1/2">
          <div className="flex-col bg-white rounded-lg shadow-lg p-8 ">
            <h3 className="font-semibold mb-3">Project onboarding</h3>
            {latestBooking ? (
              <>
                <p className="text-gray-500 mb-2">Date: {datePartFrom || 'No data'}</p>
                <p className="text-gray-500 mb-2">Time: {timePartFrom + ' - ' + timePartTo || 'No data'}</p>
              </>
            ) : (
              <p className="text-gray-500 mb-2">No booking yet</p>
            )}
          </div>

          {/* Meeting */}
          <div className="gap-3 pt-5">
            <div className="flex-col bg-white rounded-lg shadow-lg p-8 h-[340px]">
              <Pagination
                align="end"
                current={currentPage}
                pageSize={pageSize}
                total={bookings?.length}
                onChange={onPageChange}
              />
              <div className="mb-3">
                <h3 className="font-semibold">Meeting Infomation</h3>
              </div>
              <div>
                <ul>
                  {currentBookings && currentBookings.length > 0 ? (
                    currentBookings.map((booking, index) =>
                      booking ? (
                        <li
                          key={booking?.id}
                          className="flex text-left items-center gap-4 mb-3 cursor-pointer"
                          onClick={() => setSelectedMeeting(booking)} // Lưu thông tin mentor đã chọn
                        >
                          {roleProfile === 'STUDENT' ? (
                            <>
                              <img src={booking?.mentor?.user?.avatar} className="w-8 h-8 rounded-full" alt="Mentor" />
                              <div>
                                <p className="font-semibold">{booking?.mentor?.user?.fullName}</p>
                                <p className="text-gray-500">
                                  {booking?.mentor?.skills?.map(skill => skill.skillName).join(', ')}
                                </p>
                              </div>
                            </>
                          ) : (
                            <div>
                              <p className="font-semibold">{booking?.group?.groupName}</p>
                              <p className="text-gray-500">{booking?.group?.classDTO?.className}</p>
                            </div>
                          )}
                        </li>
                      ) : null
                    )
                  ) : (
                    <p>You have not had any booking yet</p>
                  )}
                </ul>
              </div>
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Meeting;
