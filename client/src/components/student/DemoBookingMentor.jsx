import React from 'react';

export const DemoBookingMentor = () => {
  return (
    <div className="flex-col">
      {/* Header */}
      <div className="flex justify-between items-center p-5 bg-white shadow-md rounded-3xl">
        <div className="flex items-center gap-4">
          <img src="/public/avatar.png" className="w-10 h-10 rounded-full" alt="Leader" />
          <div className="text-left">
            <p className="font-semibold">Student Booking</p>
            <p className="text-gray-500">Student Code</p>
          </div>
        </div>
        {/* <div className="flex gap-4 items-center">
          <input type="text" placeholder="Search" className="border px-4 py-2 rounded" />
          <BellOutlined /> <MessageOutlined />
          </div> */}
      </div>

      {/* Content */}
      <div className="flex gap-3 pt-5 ">
        {/* Profile info */}
        <div className="bg-white p-8 rounded-lg shadow-lg w-2/5">
          <div className="flex flex-col items-center">
            <img src="/public/avatar.png" className="w-16 h-16 rounded-full mb-4" alt="Mentor" />
            <div className="text-center">
              <h2 className="font-bold">Mentor</h2>
              <p className="text-gray-500">MentorCode</p>
            </div>
          </div>
          {/* Action buttons */}
          {/* <div className="mt-4 flex justify-center gap-4">
              <button className="p-2 bg-gray-200 rounded">Call</button>
              <button className="p-2 bg-gray-200 rounded">Message</button>
              <button className="p-2 bg-gray-200 rounded">Video</button>
            </div> */}

          {/* Chat */}
          <div className="bg-white p-5  mt-5">
            <p className="font-bold">Information</p>
            <div className="bg-gray-100 p-3 rounded mb-2">Booking Id</div>
            <div className="bg-gray-100 p-3 rounded mb-2">Group Id</div>
            <div className="bg-gray-100 p-3 rounded mb-2">Schedule Id</div>
            <div className="bg-gray-100 p-3 rounded mb-2">Point Pay</div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="flex-col w-3/5">
          <div className="flex bg-white rounded-lg shadow-lg p-8 ">
            <div className="mb-5">
              <h3 className="font-semibold">Group Infomation</h3>
              <ul>
                <li className="flex text-left items-center gap-4 mb-3">
                  <img src="/public/avatar.png" className="w-8 h-8 rounded-full" alt="Mem1" />
                  <div>
                    <p className="font-semibold">Member1</p>
                    <p className="text-gray-500">Front-End</p>
                  </div>
                </li>
                <li className="flex text-left items-center gap-4 mb-3">
                  <img src="/public/avatar.png" className="w-8 h-8 rounded-full" alt="Mem1" />
                  <div>
                    <p className="font-semibold">Member2</p>
                    <p className="text-gray-500">Front-End</p>
                  </div>
                </li>
                <li className="flex text-left items-center gap-4 mb-3">
                  <img src="/public/avatar.png" className="w-8 h-8 rounded-full" alt="Mem1" />
                  <div>
                    <p className="font-semibold">Member3</p>
                    <p className="text-gray-500">Back-end</p>
                  </div>
                </li>
                <li className="flex text-left items-center gap-4 mb-3">
                  <img src="/public/avatar.png" className="w-8 h-8 rounded-full" alt="Mem1" />
                  <div>
                    <p className="font-semibold">Member4</p>
                    <p className="text-gray-500">Front-end</p>
                  </div>
                </li>
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
export default DemoBookingMentor;
