import React from 'react';
import { BookingItem } from '../common/BookingItem';

function Activity() {
  return (
    <div className="flex flex-col gap-3 p-3 bg-white rounded-md">
      {/* Booking 1 - Pending */}
      <BookingItem
        mentor="John Doe"
        dateCreated="2024-10-01"
        className="SE1874"
        schedule="2024-10-10 10:00 AM"
        studentBook="Alice"
        totalMember={3}
        point={9.5}
        group={"Test"}
        project={"KOI"}
        status="pending"
      />

      {/* Booking 2 - Accepted */}
      <BookingItem
        mentor="Jane Smith"
        dateCreated="2024-09-25"
        className="SE1874"
        schedule="2024-10-12 3:00 PM"
        studentBook="Bob"
        point={8.7}
        totalMember={5}
        group={"9++"}
        project={"KOI"}
        status="accepted"
      />

      {/* Booking 3 - Rejected */}
      <BookingItem
        mentor="Tom Hanks"
        dateCreated="2024-09-30"
        className="SE1874"
        schedule="2024-10-14 1:00 PM"
        studentBook="Charlie"
        point={7.2}
        totalMember={2}
        group={"9++"}
        project={"KOI"}
        status="rejected"
      />
    </div>
  );
}

export default Activity;


// import React, { useEffect, useState } from 'react';
// import { BookingItem } from '../common/BookingItem';
// import { getMyProfile } from '../../apis/UserServices'; // Giả sử đây là API bạn muốn gọi

// function Activity() {
//   const [bookings, setBookings] = useState([]);

//   useEffect(() => {
//     const fetchBookings = async () => {
//       try {
//         const response = await getMyProfile(); // Gọi API
//         setBookings(response.data); // Cập nhật dữ liệu bookings từ API
//       } catch (error) {
//         console.error("Error fetching bookings:", error);
//       }
//     };

//     fetchBookings();
//   }, []);

//   return (
//     <div className="flex flex-col gap-3 p-3 bg-white rounded-md">
//       {bookings.map((booking) => (
//         <BookingItem
//           key={booking.id} // Giả sử mỗi booking có một id duy nhất
//           mentor={booking.mentor}
//           dateCreated={booking.dateCreated}
//           className={booking.className}
//           schedule={booking.schedule}
//           studentBook={booking.studentBook}
//           totalMember={booking.totalMember}
//           point={booking.point}
//           group={booking.group}
//           project={booking.project}
//           status={booking.status}
//         />
//       ))}
//     </div>
//   );
// }

// export default Activity;
