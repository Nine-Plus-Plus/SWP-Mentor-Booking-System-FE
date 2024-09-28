import React, { useState, useEffect } from 'react';
import { getMyProfile } from '../../apis/UserServices'; // Đảm bảo đường dẫn chính xác

function StudentProfile() {
  const [profile, setProfile] = useState({
    username: '',
    email: '',
    birthDate: '',
    photo: '',
    address: '',
    phone: '',
    gender: '',
    dateCreated: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const response = await getMyProfile(token);
          console.log('API Response:', response);
          const user = response.usersDTO;
          // Kiểm tra cấu trúc dữ liệu và gán giá trị tương ứng
          setProfile({
            username: user.username || '',
            email: user.email || '',
            birthDate: user.birthDate || '',
            photo: user.photo || '',
            address: user.address || '',
            phone: user.phone || '',
            gender: user.gender || '',
            dateCreated: user.dateCreated || ''
          });
        } else {
          setError('Token không tồn tại');
        }
      } catch (err) {
        setError(err.message || 'Đã xảy ra lỗi');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return <div className="text-center text-gray-700">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">User Profile</h1>
        {profile.photo && (
          <div className="mb-4 flex justify-center">
            <img
              src={profile.photo}
              alt="Profile"
              className="w-32 h-32 object-cover rounded-full border-2 border-gray-300"
            />
          </div>
        )}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="name">
            Name
          </label>
          <input
            id="name"
            type="text"
            value={profile.username}
            readOnly
            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm bg-gray-100"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={profile.email}
            readOnly
            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm bg-gray-100"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="birthDate">
            Birth Date
          </label>
          <input
            id="birthDate"
            type="text"
            value={profile.birthDate}
            readOnly
            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm bg-gray-100"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="address">
            Address
          </label>
          <input
            id="address"
            type="text"
            value={profile.address}
            readOnly
            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm bg-gray-100"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="phone">
            Phone
          </label>
          <input
            id="phone"
            type="text"
            value={profile.phone}
            readOnly
            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm bg-gray-100"
          />
        </div>

        <div className="flex items-center justify-end">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default StudentProfile;
