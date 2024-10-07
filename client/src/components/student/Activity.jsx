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
        group={"9++"}
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
