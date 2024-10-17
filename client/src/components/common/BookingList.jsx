import React, { useEffect, useState } from 'react';
import { BookingItem } from './BookingItem';
import { Segmented } from 'antd';
import { useUserStore } from '../../store/useUserStore';
import {
  getAllActiveBooking,
  getAllBookingForGroupByStatus,
  getAllBookingForMentorByStatus
} from '../../apis/BookingServices';
import { toast } from 'react-toastify';
import { convertDateMeeting, formatDate } from '../../utils/commonFunction';

function BookingList() {
  const [filter, setFilter] = useState('PENDING');
  const [bookings, setBookings] = useState([]);
  const { fullData, role, userData } = useUserStore();

  useEffect(() => {
    const token = localStorage.getItem('token');

    const fetchAllActiveBooking = async () => {
      try {
        let response;
        role === 'MENTOR'
          ? (response = await getAllBookingForMentorByStatus(userData?.id, filter, token))
          : (response = await getAllBookingForGroupByStatus(fullData?.groupDTO?.id, filter, token));

        console.log(response);
        response && response?.statusCode === 200 ? setBookings(response?.bookingDTOList) : setBookings([]);
      } catch (error) {
        toast.error(error.message);
        console.log(error.message);
      }
    };
    fetchAllActiveBooking();
  }, [userData?.id, filter, fullData?.groupDTO?.id]);

  return (
    <div>
      <Segmented
        options={['PENDING', 'CONFIRMED', 'CANCELLED', 'REJECTED']}
        value={filter}
        onChange={setFilter}
        className="mb-5"
      />
      <div>
        <div className="flex flex-col gap-3 p-3 bg-white rounded-md">
          {bookings?.length === 0 ? (
            <p className="text-red-500">Do not have any {filter} booking.</p>
          ) : (
            bookings?.map(booking => (
              <BookingItem
                //
                key={booking?.id}
                idBooking={booking?.id}
                className={booking?.group?.classDTO?.className}
                idGroup={booking?.group?.id}
                status={booking?.status}
                group={booking?.group?.groupName}
                point={booking?.pointPay}
                schedule={convertDateMeeting(booking?.mentorSchedule)}
                dateCreated={formatDate(booking?.dateCreated)}
                totalMember={booking?.group?.students?.length}
                project={booking?.group?.project?.projectName}
                studentBook={booking?.group?.students?.find(student => student?.groupRole === 'LEADER')?.user?.fullName}
                mentor={booking?.mentor?.user?.fullName}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default BookingList;
