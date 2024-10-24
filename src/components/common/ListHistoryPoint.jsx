import React, { useEffect, useState } from 'react';
import HistoryPointItem from './HistoryPointItem';
import { useUserStore } from '../../store/useUserStore';
import { getGroupHistoryPoint, getHistoryPointByStudentId } from '../../apis/HistoryPointServices';

export const ListHistoryPoint = ({ pointHistoryId, status, dateCreated, bookingId }) => {
  const [points, setPoints] = useState([]);
  const { userData } = useUserStore();

  useEffect(() => {
    const token = localStorage.getItem('token');

    const fetchAllHistoryPoint = async () => {
      if (!userData?.id || !token) return;
      try {
        const response = await getHistoryPointByStudentId(userData?.id, token);
        console.log('Response from API:', response);
        if (response?.statusCode === 200) {
          setPoints(response?.pointHistoryDTOList || []);
        } else {
          setPoints([]);
        }
      } catch (error) {
        console.error('Error fetching history points: ', error);
        setPoints([]);
      }
    };

    fetchAllHistoryPoint();
  }, [userData]);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-start pr-40">
        <div className="inline-flex px-3 py-1 font-medium text-white bg-main-1 rounded-lg">
          <span>Total Point: {userData?.point}</span>
        </div>
      </div>

      {/* Tạo các HistoryPointItem trực tiếp */}
      <div className="p-3 bg-white rounded-md flex flex-col gap-5">
        {points?.length === 0 ? (
          <p className="text-red-500">Do not have any transaction point!!!</p>
        ) : (
          points?.map(point => (
            <HistoryPointItem
              key={point?.id}
              dateCreated={point?.dateCreated}
              pointHistoryId={point?.id}
              status={point?.status}
              points={point?.point}
              booking={point?.booking}
              mentorBooking={point?.booking?.mentor?.user?.fullName}
            />
          ))
        )}
      </div>
    </div>
  );
};
export default ListHistoryPoint;
