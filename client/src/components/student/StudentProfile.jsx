import React, { useState, useCallback, useEffect } from 'react';
import { getMyProfile } from '../../apis/UserServices';
import Button from '../../utils/Button';
import CopyToClipboard from 'react-copy-to-clipboard';
import { toast } from 'react-toastify';

function StudentProfile() {
  const [profile, setProfile] = useState({
    id: 1809, // Default id if not available
    photo: '',
    fullName: 'Test User',
    gender: 'male',
    email: 'test@example.com',
    phone: '123-456-7890',
    birthDate: '2000-01-01',
    dateCreated: '2024-01-01',
    address: '123 Main St'
  });
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
            width: 'auto',
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
        if (token) {
          const response = await getMyProfile(token);
          console.log('API Response:', response); // Kiểm tra log dữ liệu trả về
          const user = response.usersDTO || {};
          console.log('User DTO:', user); // Kiểm tra dữ liệu trong `usersDTO`
          setProfile({
            id: user.id || profile.id,
            fullName: user.fullName || 'NULL',
            email: user.email || 'NULL',
            birthDate: user.birthDate || 'NULL',
            photo: user.photo || profile.photo,
            address: user.address || 'NULL',
            phone: user.phone || 'NULL',
            gender: user.gender || 'NULL',
            dateCreated: user.dateCreated || 'NULL'
          });
        } else {
          setError('Token không tồn tại');
        }
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
    <div className="max-w-7xl mx-auto p-4">
      {/* Profile Header */}
      <div className="bg-white p-8 rounded-lg shadow-lg mb-6">
        <div className="flex items-center">
          <img
            src={profile.photo || '/public/avatar-default.jpg'}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover mr-4"
          />
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">{profile.fullName}</h2>
            <div className="subtitle-text with-clipboard-copy">
              <span>ID: {profile.id}</span>
              <Button
                className="copy-clipboard-button"
                stylingMode="text"
                onClick={copyToClipboard(profile.id)} // Sử dụng profile.id
                activeStateEnabled={false}
                focusStateEnabled={false}
                hoverStateEnabled={false}
              >
                <img src="/public/clipboard-icon.png" alt="Copy to clipboard" className="inline-block w-4 h-4 ml-1" />
              </Button>

              {/* <CopyToClipboard text={profile.id} onCopy={onCopyHandler}>
                <button>
                  <img src="/public/clipboard-icon.png" alt="Copy to clipboard" className="inline-block w-4 h-4 ml-1" />{' '}
                </button>
              </CopyToClipboard>
              {isCopied && toast.info('Text Copied')} */}
            </div>
          </div>
        </div>
      </div>

      {/* Basic Info */}
      <div className="bg-white p-8 rounded-lg shadow-lg mb-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">Basic Infomation</h3>
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
            <label className="block text-gray-700 text-sm font-medium">Date Created</label>
            <input
              type="text"
              value={profile.dateCreated}
              readOnly
              className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-lg"
            />
          </div>
        </div>
      </div>

      {/* Contact and Address Section */}
      <div className="bg-white p-8 rounded-lg shadow-lg mb-6">
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
    </div>
  );
}

// const UserProfileContent = ({
//   username,
//   email,
//   birthDate,
//   photo,
//   address,
//   phone,
//   gender,
//   dateCreated,
//   handleDataChanged,
//   handleContentScrolled
// }) => {
//   const { isXSmall } = useScreenSize(); // Đo kích thước màn hình (nếu cần thiết)

//   const onScroll = useCallback(
//     reachedTop => {
//       handleContentScrolled(reachedTop); // Xử lý khi nội dung được cuộn
//     },
//     [handleContentScrolled]
//   );

//   return (
//     <ScrollView className="view-wrapper-scroll" onScroll={onScroll}>
//       <div className="cards-container">
//         {/* Thẻ thông tin cơ bản */}
//         <ProfileCard
//           wrapperCssClass="profile-card basic-info-card"
//           title="Basic Info"
//           colCount={4}
//           cardData={{ username, email, dateCreated, birthDate, gender }}
//           onDataChanged={handleDataChanged}
//         >
//           <div className="basic-info-top-item profile-card-top-item">
//             <FormPhoto link={photo} editable size={80} />
//             <div>
//               <div className="title-text">{username}</div>
//               <div className="subtitle-text with-clipboard-copy">
//                 <span>ID: {id}</span>
//                 <Button
//                   icon="copy"
//                   className="copy-clipboard-button"
//                   stylingMode="text"
//                   onClick={copyToClipboard(id)}
//                   activeStateEnabled={false}
//                   focusStateEnabled={false}
//                   hoverStateEnabled={false}
//                 />
//               </div>
//             </div>
//           </div>
//         </ProfileCard>

//         {/* Thẻ liên hệ */}
//         <ProfileCard
//           wrapperCssClass="profile-card contacts-card"
//           title="Contacts"
//           cardData={{ email, phone }}
//           onDataChanged={handleDataChanged}
//         >
//           <div className="profile-card-top-item">
//             <div className="image-wrapper">
//               <i className="dx-icon dx-icon-mention" />
//             </div>
//             <div>
//               <div className="title-text">{phone}</div>
//               <div className="subtitle-text with-clipboard-copy">
//                 {email}
//                 <Button
//                   icon="copy"
//                   className="copy-clipboard-button"
//                   stylingMode="text"
//                   onClick={copyToClipboard(email)}
//                   activeStateEnabled={false}
//                   focusStateEnabled={false}
//                   hoverStateEnabled={false}
//                 />
//               </div>
//             </div>
//           </div>
//         </ProfileCard>

//         {/* Thẻ địa chỉ */}
//         <ProfileCard
//           wrapperCssClass="profile-card address-card"
//           title="Address"
//           cardData={{ address }}
//           onDataChanged={handleDataChanged}
//         >
//           <div className="profile-card-top-item">
//             <div className="image-wrapper">
//               <i className="dx-icon dx-icon-map" />
//             </div>
//             <div>
//               <div className="title-text">{address}</div>
//             </div>
//           </div>
//         </ProfileCard>
//       </div>
//     </ScrollView>
//   );
// };

// const UserProfileContentWithLoadPanel = withLoadPanel(UserProfileContent);
// return (
//   <div className="view-host user-profile">
//     <div className="view-wrapper max-w-7xl mx-auto p-4">
//       <UserProfileContentWithLoadPanel
//         basicInfoItems={<BasicInfoComponent />}
//         contactItems={<ContactInfoComponent />}
//         addressItems={<AddressComponent />}
//         profileData={<ProfileDataComponent />}
//         handleDataChanged={handleDataChanged}
//         handleContentScrolled={handleContentScrolled}
//         hasData={!loading}
//         loading={loading}
//         panelProps={{
//           container: '.view-wrapper',
//           position: { of: '.content' }
//         }}
//       />
//     </div>
//   </div>
// );

// return (
//   <div className="min-h-screen bg-gray-100 flex items-center justify-center">
//     <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
//       <h1 className="text-2xl font-bold mb-4 text-gray-800">User Profile</h1>
//       {profile.photo && (
//         <div className="mb-4 flex justify-center">
//           <img
//             src={profile.photo}
//             alt="Profile"
//             className="w-32 h-32 object-cover rounded-full border-2 border-gray-300"
//           />
//         </div>
//       )}
//       <div className="mb-4">
//         <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="name">
//           Name
//         </label>
//         <input
//           id="name"
//           type="text"
//           value={profile.username}
//           readOnly
//           className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm bg-gray-100"
//         />
//       </div>
//       <div className="mb-4">
//         <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="email">
//           Email
//         </label>
//         <input
//           id="email"
//           type="email"
//           value={profile.email}
//           readOnly
//           className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm bg-gray-100"
//         />
//       </div>
//       <div className="mb-4">
//         <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="birthDate">
//           Birth Date
//         </label>
//         <input
//           id="birthDate"
//           type="text"
//           value={profile.birthDate}
//           readOnly
//           className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm bg-gray-100"
//         />
//       </div>
//       <div className="mb-4">
//         <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="address">
//           Address
//         </label>
//         <input
//           id="address"
//           type="text"
//           value={profile.address}
//           readOnly
//           className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm bg-gray-100"
//         />
//       </div>
//       <div className="mb-4">
//         <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="phone">
//           Phone
//         </label>
//         <input
//           id="phone"
//           type="text"
//           value={profile.phone}
//           readOnly
//           className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm bg-gray-100"
//         />
//       </div>

//       <div className="flex items-center justify-end">
//         <button className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
//           Save
//         </button>
//       </div>
//     </div>
//   </div>
//   );
// }

export default StudentProfile;
