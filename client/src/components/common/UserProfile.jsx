import React, { useState, useCallback, useEffect } from 'react';
import { getMyProfile } from '../../apis/UserServices';
import CopyAction from './CopyAction';
import { toast } from 'react-toastify';
import { useParams, useSearchParams } from 'react-router-dom';

function StudentProfile() {
  const param = useParams();
  console.log('Params:', param);
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDataChanged, setIsDataChanged] = useState(false);
  const [isContentScrolled, setIsContentScrolled] = useState(false);

  // Xử lý cuộn trang
  const handleContentScrolled = useCallback(reachedTop => {
    setIsContentScrolled(!reachedTop);
  }, []);

  // Cập nhật trạng thái dữ liệu khi có thay đổi
  const handleDataChanged = useCallback(() => {
    setIsDataChanged(true);
  }, []);

  const copyToClipboard = text => event => {
    window.navigator.clipboard
      ?.writeText(text)
      .then(() => {
        const tipText = 'Text copied';
        toast.success(tipText, {
          autoClose: 500, // thời gian tự động đóng thông báo (500ms)
          style: {
            position: { of: event.currentTarget, offset: '0 -30' }, // Sử dụng event.currentTarget
            minWidth: `${tipText.length + 2}ch`, // Thiết lập độ rộng tối thiểu
            width: 'auto'
          }
        });
      })
      .catch(err => console.error('Failed to copy text: ', err));
  };

  const [isCopied, setIsCopied] = useState(false);
  const onCopyHandler = () => {
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 1000); // Hide the success message after 1 seconds
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('Token không tồn tại');
          return;
        }

        // Gọi API để lấy profile
        const response = await getMyProfile(token);
        // Kiểm tra dữ liệu trả về từ API
        const user = response.usersDTO || {};
        console.log('User DTO:', user);

        // Cập nhật state với dữ liệu từ API
        setProfile({
          id: user.id || 'N/A',
          userName: user.username || 'N/A',
          fullName: user.fullName || 'N/A',
          email: user.email || 'N/A',
          birthDate: user.birthDate || 'N/A',
          photo: user.photo || '/public/avatar-default.jpg',
          address: user.address || 'N/A',
          phone: user.phone || 'N/A',
          gender: user.gender || 'N/A',
          dateCreated: user.dateCreated || 'N/A'
        });
      } catch (err) {
        console.error('Lỗi khi gọi API:', err);
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
    <div className="w-full mx-auto p-2 items-center flex justify-center flex-col">
      {/* Profile Header */}
      <div className="bg-white rounded-lg shadow-lg mb-6 w-[80vw] relative flex flex-col pb-2">
        <div className="h-[calc(20vh+100px)]">
          <img
            src={profile.photo || '/public/cover.jpg'}
            alt="Profile"
            className="w-full object-cover h-[20vh] rounded-tl-md rounded-tr-md"
          />
          <div className="flex items-center justify-center absolute inset-0 mt-[10vh] mx-auto bg-white w-[170px] rounded-full z-[999] h-[170px]">
            <img
              src={profile.photo || '/public/avatar-default.jpg'}
              alt="cover"
              className="w-[150px] h-[150px] rounded-full object-cover"
            />
          </div>
        </div>
        <div className="flex flex-col items-center mt">
          {/* code edit */}
          <h1 className="text-3xl font-semibold">Student</h1>
          <h2 className="text-xl font-semibold text-gray-900">{profile.userName}</h2>
          <div className="subtitle-text with-clipboard-copy">
            <span>Student code: {profile.id}</span>
            <CopyAction
              className="copy-clipboard-button"
              stylingMode="text"
              onClick={copyToClipboard(profile.id)} // Sử dụng profile.id
              activeStateEnabled={false}
              focusStateEnabled={false}
              hoverStateEnabled={false}
            >
              <img src="/public/clipboard-icon.png" alt="Copy to clipboard" className="inline-block w-4 h-4 ml-1" />
            </CopyAction>
          </div>
        </div>
      </div>

      {/* Profile Content */}
      <div className="flex gap-3 w-[80vw]">
        {/* Contact and Address Section */}
        <div className="bg-white p-8 rounded-lg shadow-lg w-2/5">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Contact & Address</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 text-sm font-medium">Phone</label>
              <input
                type="text"
                value={profile.phone}
                readOnly
                className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-medium">Email</label>
              <input
                type="text"
                value={profile.email}
                readOnly
                className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-lg"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-gray-700 text-sm font-medium">Address</label>
              <input
                type="text"
                value={profile.address}
                readOnly
                className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-lg"
              />
            </div>
          </div>
        </div>
        {/* Basic Info */}
        <div className="bg-white p-8 rounded-lg shadow-lg w-3/5">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Student Infomation</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 text-sm font-medium">Full Name</label>
              <input
                type="text"
                value={profile.fullName}
                readOnly
                className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-medium">Gender</label>
              <input
                type="text"
                value={profile.gender}
                readOnly
                className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-medium">Birth Date</label>
              <input
                type="text"
                value={profile.birthDate}
                readOnly
                className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-medium">Class</label>
              <input
                type="text"
                value={'SE18B02'}
                readOnly
                className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-medium">Expertise</label>
              <input
                type="text"
                value={'NodeJS'}
                readOnly
                className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-medium">Point</label>
              <input
                type="text"
                value={profile.dateCreated}
                readOnly
                className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-medium">Group Project</label>
              <input
                type="text"
                value={'Nine ++'}
                readOnly
                className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-medium">Role In Group</label>
              <input
                type="text"
                value={'Member'}
                readOnly
                className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentProfile;
