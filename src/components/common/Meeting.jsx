import React, { useState, useEffect } from 'react';
import { useUserStore } from '../../store/useUserStore';
import { useParams } from 'react-router-dom';

export const Meeting = ({ mentorRating, mentorSchedule, meetUrl, pointPay }) => {
  const { role, userData } = useUserStore();
  const { name, id } = useParams();
  const [meetings, setMeetings] = useState([]); // State lưu thông tin các cuộc họp
  const [isMentor, setIsMentor] = useState(false); // Kiểm tra vai trò của người dùng
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [mentors, setMentors] = useState([]);

  let roleProfile = name ? name.toUpperCase() : role;

  useEffect(() => {
    // Kiểm tra xem người dùng có phải là Mentor không
    setIsMentor(userData?.role === 'MENTOR');

    // Gọi API hoặc lấy dữ liệu từ state liên quan đến cuộc họp và booking (demo)
    const fetchMeetings = async () => {
      // Giả lập dữ liệu meeting (có thể thay bằng API call)
      const demoMeetings = [
        {
          id: 1,
          title: 'Project Onboarding',
          time: '11:00 - 12:30',
          date: 'Monday, 20 February',
          groupInfo: [
            { id: 1, name: 'Member1', role: 'Front-End' },
            { id: 2, name: 'Member2', role: 'Back-End' },
            { id: 3, name: 'Member3', role: 'Mentor' }
          ]
        }
      ];
      setMeetings(demoMeetings);
    };

    fetchMeetings();
  }, [userData]);

  return (
    <div className="flex-col">
      {/* Header */}
      <div className="flex justify-between items-center p-5 bg-white shadow-md rounded-3xl">
        <div className="flex items-center gap-4">
          <img src="/public/avatar.png" className="w-10 h-10 rounded-full" alt="Leader" />
          <div className="text-left">
            <p className="font-semibold">Meeting for {isMentor ? 'Mentor' : 'Student'}</p>
            <p className="text-gray-500">{isMentor ? 'Mentor Code' : 'Student Code'}</p>
          </div>
        </div>

        {/* Các nút hành động */}
        <div className="flex gap-4 items-center">
          {isMentor ? (
            <>
              <button className="bg-blue-500 text-white px-4 py-2 rounded">Paste Meeting URL</button>
              <button className="bg-green-500 text-white px-4 py-2 rounded">View Feedback</button>
            </>
          ) : (
            <>
              <button className="bg-blue-500 text-white px-4 py-2 rounded">Get Meeting URL</button>
              <button className="bg-green-500 text-white px-4 py-2 rounded">View Feedback</button>
            </>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex gap-3 pt-5 ">
        {/* Profile info */}
        <div className="bg-white p-8 rounded-lg shadow-lg w-2/5">
          <div className="flex flex-col items-center">
            <img src="/public/avatar.png" className="w-16 h-16 rounded-full mb-4" alt="Mentor" />
            <div className="text-center">
              <h2 className="font-bold">{isMentor ? 'Mentor' : 'Student'}</h2>
              <p className="text-gray-500">{isMentor ? 'MentorCode' : 'StudentCode'}</p>
            </div>
          </div>
          {/* Action buttons */}
          {/* <div className="mt-4 flex justify-center gap-4">
            <button className="p-2 bg-gray-200 rounded">Call</button>
            <button className="p-2 bg-gray-200 rounded">Message</button>
            <button className="p-2 bg-gray-200 rounded">Video</button>
          </div> */}

          {/* Information */}
          <div className="bg-white p-5 mt-5">
            <p className="font-bold">Information</p>
            {isMentor ? (
              <>
                {/* Mentor view */}
                <div className="bg-gray-100 p-3 rounded mb-2">
                  {selectedMentor ? selectedMentor.projectName : 'Select a mentor'}
                </div>
                <div className="bg-gray-100 p-3 rounded mb-2">{selectedMentor ? selectedMentor.groupName : ''}</div>
                <div className="bg-gray-100 p-3 rounded mb-2">
                  {selectedMentor ? <a href={selectedMentor.meetUrl}>Join Meeting</a> : ''}
                </div>
                <div className="bg-gray-100 p-3 rounded mb-2">{selectedMentor ? selectedMentor.pointPay : ''}</div>
              </>
            ) : (
              <>
                {/* Student view */}
                <div className="bg-gray-100 p-3 rounded mb-2">Mentor Star Rating: {mentorRating}</div>
                <div className="bg-gray-100 p-3 rounded mb-2">Mentor Schedule: {mentorSchedule}</div>
                <div className="bg-gray-100 p-3 rounded mb-2">Meet URL: {meetUrl}</div>
              </>
            )}

            <div className="bg-gray-100 p-3 rounded mb-2">Point Pay: {pointPay}</div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="flex-col w-3/5">
          <div className="flex bg-white rounded-lg shadow-lg p-8 ">
            <div className="mb-5">
              <h3 className="font-semibold">Meeting Infomation</h3>
              <ul>
                {mentors.map((mentor, index) => (
                  <li
                    key={index}
                    className="flex text-left items-center gap-4 mb-3 cursor-pointer"
                    onClick={() => setSelectedMentor(mentor)}
                  >
                    <img src="/public/avatar.png" className="w-8 h-8 rounded-full" alt={`Mentor ${index}`} />
                    <div>
                      <p className="font-semibold">{mentor.name}</p>
                      <p className="text-gray-500">{mentor.skills.join(', ')}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Meeting */}
          <div className="gap-3 pt-5">
            <div className="flex-col bg-white rounded-lg shadow-lg p-8">
              <h3 className="font-semibold mb-3">Project onboarding</h3>
              <p className="text-gray-500 mb-2">11:00 - 12:30</p>
              <p className="text-gray-500 mb-2">Monday, 20 February</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Meeting;
