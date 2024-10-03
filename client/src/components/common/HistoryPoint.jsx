import React from 'react';
import HistoryItem from './HistoryItem';

export const HistoryPoint = ({ pointHistoryId, points, status, dateCreated, bookingId }) => {
  return (
    <div>
      {/* div chứa points */}
      <div className="flex justify-end pr-40">
        <div className="inline-flex px-3 py-1 font-medium text-white bg-blue-700 rounded-lg">
          <span>Total Point: </span>
        </div>
        {/* <div className="inline-flex px-3 py-1 font-medium text-white bg-green-700 rounded-lg">
        <span>Balance: </span> 
      </div> */}
      </div>

      {/* Tạo các HistoryItem trực tiếp */}
      <div className="p-3 bg-white rounded-md flex flex-col gap-5">
        <HistoryItem
          dateCreated={'Tuesday, Oct 1, 2024'}
          pointHistoryId={111}
          status={'Purchased'}
          points={-10}
          bookingId={121}
        />
        <HistoryItem
          dateCreated={'Thurday, Sep 18, 2024'}
          pointHistoryId={112}
          status={'Earned'}
          points={50}
          bookingId={122}
        />
        <HistoryItem
          dateCreated={'Saturday, Feb 6, 2024'}
          pointHistoryId={113}
          status={'Bonus'}
          points={20}
          bookingId={123}
        />
      </div>
    </div>
  );
};
export default HistoryPoint;
