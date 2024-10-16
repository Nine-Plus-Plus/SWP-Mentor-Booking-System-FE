import React, { useState, useEffect } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import 'chart.js/auto';

export const AdminHome = () => {
  const [mentorRatings, setMentorRatings] = useState([]);
  const [bookingStatus, setBookingStatus] = useState({
    accepted: 0,
    rejected: 0,
    canceled: 0
  });

  const [totalMentors, setTotalMentors] = useState(0);
  const [totalStudents, setTotalStudents] = useState(0);
  const [totalBookings, setTotalBookings] = useState(0);
  const [totalGroups, setTotalGroups] = useState(0);

  useEffect(() => {
    const fetchMockData = () => {
      const mockMentorRatings = Array.from({ length: 724 }, () => Math.random() * 5);
      const mockBookingStatus = {
        accepted: 65,
        rejected: 25,
        canceled: 10
      };

      const mockTotals = {
        mentors: 120,
        students: 450,
        bookings: 300,
        groups: 15
      };

      setTimeout(() => {
        setMentorRatings(mockMentorRatings);
        setBookingStatus(mockBookingStatus);
        setTotalMentors(mockTotals.mentors);
        setTotalStudents(mockTotals.students);
        setTotalBookings(mockTotals.bookings);
        setTotalGroups(mockTotals.groups);
      }, 2000);
    };

    fetchMockData();
  }, []);

  const roundStarRating = rating => {
    if (rating < 0.25) return 0;
    if (rating < 0.75) return 0.5;
    if (rating < 1.25) return 1;
    if (rating < 1.75) return 1.5;
    if (rating < 2.25) return 2;
    if (rating < 2.75) return 2.5;
    if (rating < 3.25) return 3;
    if (rating < 3.75) return 3.5;
    if (rating < 4.25) return 4;
    if (rating < 4.75) return 4.5;
    return 5;
  };

  const starCounts = [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5].map(star => {
    return mentorRatings.filter(rating => roundStarRating(rating) === star).length;
  });

  const barData = {
    labels: [
      '0 Star',
      '0.5 Stars',
      '1 Star',
      '1.5 Stars',
      '2 Stars',
      '2.5 Stars',
      '3 Stars',
      '3.5 Stars',
      '4 Stars',
      '4.5 Stars',
      '5 Stars'
    ],
    datasets: [
      {
        label: 'Number of Mentors',
        backgroundColor: '#4F46E5',
        borderColor: '#3730A3',
        borderWidth: 1,
        hoverBackgroundColor: '#4338CA',
        hoverBorderColor: '#3730A3',
        data: starCounts
      }
    ]
  };

  const barOptions = {
    maintainAspectRatio: false,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Stars',
          font: {
            size: 16,
            weight: 'bold',
            family: 'Arial, sans-serif'
          }
        },
        beginAtZero: true
      },
      y: {
        title: {
          display: true,
          text: 'Number of Mentors',
          font: {
            size: 16,
            weight: 'bold',
            family: 'Arial, sans-serif'
          }
        },
        beginAtZero: true,
        ticks: {
          stepSize: 20
        }
      }
    }
  };

  const pieOptions = {
    maintainAspectRatio: false
  };

  const pieData = {
    labels: ['Accepted', 'Rejected', 'Canceled'],
    datasets: [
      {
        data: [bookingStatus.accepted, bookingStatus.rejected, bookingStatus.canceled],
        backgroundColor: ['#10B981', '#EF4444', '#F59E0B'],
        hoverBackgroundColor: ['#059669', '#DC2626', '#D97706']
      }
    ]
  };

  return (
    <div className="w-full mx-auto items-center">
      {/* <h1 className="text-3xl font-bold text-center mb-5 text-gray-800">Admin Dashboard</h1> */}
      <div className="flex gap-3 h-3/5">
        <div className=" bg-white p-6 rounded-lg shadow-2xl col-span-2 w-2/3">
          <h2 className="text-2xl font-semibold mb-4 text-center text-gray-700">Mentor Ratings</h2>
          <div style={{ height: '300px' }}>
            <Bar data={barData} options={barOptions} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-2xl col-span-1 w-1/3">
          <h2 className="text-2xl font-semibold mb-4 text-center text-gray-700">Booking Status</h2>
          <div style={{ height: '250px' }}>
            <Pie data={pieData} options={pieOptions} />
          </div>
          <ul className="mt-4 text-center">
            <li className="text-green-600 font-medium">Accepted: {bookingStatus.accepted}%</li>
            <li className="text-red-600 font-medium">Rejected: {bookingStatus.rejected}%</li>
            <li className="text-yellow-600 font-medium">Canceled: {bookingStatus.canceled}%</li>
          </ul>
        </div>
      </div>
      <div className="gap-3 pt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
        <div className="bg-white p-8 rounded-lg border-2 border-sky-500 shadow-2xl flex flex-col items-center">
          <h3 className="text-xl font-semibold">Total Mentors</h3>
          <p className="text-2xl font-bold">{totalMentors}</p>
        </div>
        <div className="bg-white p-8 rounded-lg border-2 border-emerald-500 shadow-2xl flex flex-col items-center">
          <h3 className="text-xl font-semibold">Total Students</h3>
          <p className="text-2xl font-bold">{totalStudents}</p>
        </div>
        <div className="bg-white p-8 rounded-lg border-2 border-orange-500 shadow-2xl flex flex-col items-center">
          <h3 className="text-xl font-semibold">Total Bookings</h3>
          <p className="text-2xl font-bold">{totalBookings}</p>
        </div>
        <div className="bg-white p-8 rounded-lg border-2 border-yellow-500 shadow-2xl flex flex-col items-center">
          <h3 className="text-xl font-semibold">Total Groups</h3>
          <p className="text-2xl font-bold">{totalGroups}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
