import React from 'react';
// import Button from './Button';

export const HistoryItem = ({ pointHistoryId, points, status, dateCreated, bookingId }) => {
  return (
    <>
      {/* Đặt nền */}
      <div className=" bg-white flex flex-col gap-5  rounded-md">
        {/* CSS từng board */}
        <div className="border-2 shadow-xl rounded-md h-[150px]">
          {/* Căn giữa bảng */}
          <div className="flex items-center justify-between p-4 rounded-md ">
            <div className="flex items-center space-x-3 gap-10">
              <img src="/LeetCoin.png" alt="transaction icon" className="w-20 h-20 rounded-full" />
              <div>
                <div className="flex items-center gap-1">
                  <h1 className="font-bold text-xl text-blue-500">{status}</h1>
                </div>
                <p>
                  <span className="font-bold">Point history id:</span> {pointHistoryId}
                </p>
                <p>
                  <span className="font-bold">Booking ID:</span> {bookingId}
                </p>
              </div>
              <div className="flex-1 text-center text-base font-bold"> {dateCreated} </div>
            </div>
            <div className="text-right">
              <p className={`font-semibold ${points > 0 ? 'text-blue-500' : 'text-red-500'}`}>
                {points > 0 ? `+${points}` : points} Points
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default HistoryItem;
