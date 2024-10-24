import React, { useEffect, useState } from 'react';
import HistoryPointItem from './HistoryPointItem';
import { useUserStore } from '../../store/useUserStore';
import { getGroupHistoryPoint, getHistoryPointByStudentId } from '../../apis/HistoryPointServices';

export const ListHistoryPoint = ({ pointHistoryId, status, dateCreated, bookingId }) => {
  const [points, setPoints] = useState([]);
  const { userData } = useUserStore();

  // Hàm gọi API để lấy lịch sử điểm
  useEffect(() => {
    const token = localStorage.getItem('token'); // Lấy token từ localStorage

    const fetchAllHistoryPoint = async () => {
      if (!userData?.id || !token) return; // Kiểm tra nếu không có userId hoặc token thì thoát

      try {
        const response = await getHistoryPointByStudentId(userData?.id, token); // Gọi API lấy lịch sử điểm
        console.log('Response from API:', response);

        // Kiểm tra dữ liệu trả về và cập nhật state
        if (response?.statusCode === 200) {
          setPoints(response?.pointHistoryDTOList || []); // Đảm bảo pointHistoryDTOList có giá trị
        } else {
          setPoints([]); // Nếu statusCode không phải 200 thì set rỗng
        }
      } catch (error) {
        console.error('Error fetching history points: ', error);
        setPoints([]); // Nếu có lỗi thì set points rỗng
      }
    };

    fetchAllHistoryPoint(); // Gọi API
  }, [userData]); // Chỉ chạy lại khi userData thay đổi

  return (
    <div className="flex flex-col gap-3">
      {/* div chứa points */}
      <div className="flex justify-start pr-40">
        <div className="inline-flex px-3 py-1 font-medium text-white bg-main-1 rounded-lg">
          {/* fix */}
          <span>Total Point: 100</span>
        </div>
      </div>

      {/* Tạo các HistoryPointItem trực tiếp */}
      <div className="p-3 bg-white rounded-md flex flex-col gap-5">
        {points?.length === 0 ? (
          <p className="text-red-500">Do not have any point</p>
        ) : (
          points?.map(point => (
            <HistoryPointItem
              key={point?.id} // Đảm bảo mỗi item có key duy nhất
              dateCreated={point?.dateCreated}
              pointHistoryId={point?.id}
              status={point?.status}
              points={point?.point}
              bookingId={point?.bookingId}
            />
          ))
        )}
        {/* <HistoryPointItem
          dateCreated={'Tuesday, Oct 1, 2024'}
          pointHistoryId={111}
          status={'Purchased'}
          points={-10}
          bookingId={121}
        />
        <HistoryPointItem
          dateCreated={'Thurday, Sep 18, 2024'}
          pointHistoryId={112}
          status={'Earned'}
          points={50}
          bookingId={122}
        />
        <HistoryPointItem
          dateCreated={'Saturday, Feb 6, 2024'}
          pointHistoryId={113}
          status={'Bonus'}
          points={20}
          bookingId={123}
        />
        <HistoryPointItem
          dateCreated={'Saturday, Feb 6, 2024'}
          pointHistoryId={113}
          status={'Bonus'}
          points={-20}
          bookingId={123}
        /> */}
      </div>
    </div>
  );
};
export default ListHistoryPoint;
