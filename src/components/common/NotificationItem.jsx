import React, { useEffect, useState } from 'react';
import Button from './Button';
import Swal from 'sweetalert2';
import { createNoti, updateAction } from '../../apis/NotificationServices';
import { useUserStore } from '../../store/useUserStore';
import { toast } from 'react-toastify';
import { addNewMember } from '../../apis/GroupServices';
import { formattedContent } from '../../utils/commonFunction';

const NotificationItem = ({
  type,
  notiId,
  senderId,
  content,
  groupId,
  daySent,
  senderName,
  groupName,
  studentSenderId,
  updateActionClick,
  notiAction
}) => {
  const { userData, isUpdate, setIsUpdate } = useUserStore();
  const [loadingAcceptAdd, setLoadingAcceptAdd] = useState(false);
  const [loadingRejectAdd, setLoadingRejectAdd] = useState(false);

  const handleCreateNoti = async (data, dataUpdate, accept) => {
    const token = localStorage.getItem('token');
    try {
      accept ? setLoadingAcceptAdd(true) : setLoadingRejectAdd(true);
      const response = await createNoti(data, token);
      console.log(response);
      if (response?.statusCode === 200) {
        dataUpdate && handleUpdateAction(dataUpdate);
      }
    } catch (error) {
      console.log(error);
    } finally {
      accept ? setLoadingAcceptAdd(false) : setLoadingRejectAdd(false);
    }
  };

  const handleUpdateAction = async data => {
    const token = localStorage.getItem('token');
    try {
      const response = await updateAction(notiId, data, token);
      console.log(response);
      if (response?.statusCode === 200) {
        updateActionClick();
        toast.success();
      }
    } catch (error) {
      console.log(error);
      toast.error();
    }
  };

  const handleAddMember = async idStudent => {
    const token = localStorage.getItem('token');
    try {
      const addMemberData = {
        id: idStudent
      };
      setLoadingAcceptAdd(true);
      const response = await addNewMember(groupId, addMemberData, token);
      console.log(response);
      if (response?.statusCode === 200) {
        setIsUpdate(!isUpdate);
        if (idStudent !== userData?.id) {
          Swal.fire({
            title: 'Added Successful!',
            text: `Add student to new  group successfully.`,
            icon: 'success',
            confirmButtonText: 'OK',
            timer: 3000, // Đóng sau 3 giây
            timerProgressBar: true // Hiển thị progress bar khi đếm thời gian
          });
          const dataUpdate = {
            action: 'ACCEPT'
          };
          const dataSent = {
            message: `Leader ${userData.user.fullName} accept you from group: ${groupName} !`,
            type: 'MESSAGE',
            sender: {
              id: userData.user.id
            },
            reciver: {
              id: senderId
            },
            groupDTO: {
              id: groupId
            }
          };
          handleCreateNoti(dataSent, dataUpdate, true);
        } else {
          const dataUpdate = {
            action: 'ACCEPT'
          };
          // handleUpdateAction(dataUpdate);
          const dataSent = {
            message: `${userData.user.fullName} accepted come your group !`,
            type: 'MESSAGE',
            sender: {
              id: userData.user.id
            },
            reciver: {
              id: senderId
            },
            groupDTO: {
              id: groupId
            }
          };
          handleCreateNoti(dataSent, dataUpdate, true);
          Swal.fire({
            title: 'Accept Successful!',
            text: `You became a new member of group!`,
            icon: 'success',
            confirmButtonText: 'OK',
            timer: 3000, // Đóng sau 3 giây
            timerProgressBar: true // Hiển thị progress bar khi đếm thời gian
          });
        }
      } else toast.error(response?.message);
    } catch (error) {
      toast.error(message);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAcceptJoin = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Accept student to group!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      confirmButtonColor: '#dd6633',
      cancelButtonText: 'No, cancel.',
      reverseButtons: false
    }).then(result => {
      if (result.isConfirmed) {
        handleAddMember(studentSenderId);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          title: 'Cancelled',
          text: 'Cancelled this action!',
          icon: 'error',
          confirmButtonText: 'OK', // Văn bản nút xác nhận
          confirmButtonColor: '#d33' // Màu nút xác nhận
        });
      }
    });
  };

  const handleAcceptAdd = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: `Become a member of group:${groupName}!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, join in',
      confirmButtonColor: '#dd6633',
      cancelButtonText: 'No, cancel.',
      reverseButtons: false
    }).then(result => {
      if (result.isConfirmed) {
        handleAddMember(userData?.id);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'Cancelled this action!', 'error');
      }
    });
  };

  const handleRejectJoin = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Reject student join group!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, reject',
      confirmButtonColor: '#dd6633',
      cancelButtonText: 'No, cancel.',
      reverseButtons: false
    }).then(result => {
      if (result.isConfirmed) {
        setLoadingRejectAdd(true);
        const dataUpdate = {
          action: 'REJECT'
        };
        // handleUpdateAction(dataUpdate);
        const dataSent = {
          message:
            userData?.groupRole === 'LEADER'
              ? `Leader ${userData.user.fullName} reject you join group: ${groupName} !`
              : `${userData.user.fullName} reject your invent became a member of group: ${groupName} `,
          type: 'MESSAGE',
          sender: {
            id: userData?.user?.id
          },
          reciver: {
            id: senderId
          },
          groupDTO: {
            id: groupId
          }
        };
        handleCreateNoti(dataSent, dataUpdate, false);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          title: 'Cancelled',
          text: 'Cancelled this action!',
          icon: 'error',
          confirmButtonText: 'OK', // Văn bản nút xác nhận
          confirmButtonColor: '#d33' // Màu nút xác nhận
        });
      }
    });
  };

  useEffect(() => {
    console.log(loadingRejectAdd);
  }, [loadingRejectAdd]);

  return (
    <div className=" border shadow-md rounded-md p-3 w-full ">
      <h1 className="font-bold text-xl text-main-1"> Notification {type.toLowerCase()} </h1>
      <div className="flex p-2 justify-between">
        <div className="flex flex-col gap-2 text-md">
          <p>
            <span className="font-bold">Day sent:</span> {daySent}
          </p>
          <p>
            <span className="font-bold">Sender: </span>
            {senderName}
          </p>
          <p>
            <span className="font-bold">Content: </span>
            {formattedContent(content)}
          </p>
        </div>
        <div className="flex items-center justify-center flex-col gap-3 w-1/6">
          {type === 'ADDGROUP' && !notiAction ? (
            <>
              <Button
                text={'Accept'}
                textColor={'text-white'}
                bgColor={'bg-green-500'}
                bgHover={'hover:bg-green-400'}
                htmlType={'button'}
                fullWidth={'w-full'}
                onClick={() => {
                  userData?.groupRole === 'LEADER' ? handleAcceptJoin() : handleAcceptAdd();
                }}
                isLoading={loadingAcceptAdd}
              />
              <Button
                text={'Reject'}
                textColor={'text-white'}
                bgColor={'bg-red-500'}
                htmlType={'button'}
                fullWidth={'w-full'}
                onClick={() => handleRejectJoin()}
                isLoading={loadingRejectAdd}
              />
            </>
          ) : notiAction === 'ACCEPT' ? (
            <Button
              text={'Accepted'}
              textColor={'text-white'}
              bgColor={'bg-green-500'}
              bgHover={'hover:bg-green-400'}
              htmlType={'button'}
              fullWidth={'w-full'}
              acHover={'hover:cursor-not-allowed'}
            />
          ) : (
            notiAction === 'REJECT' && (
              <Button
                text={'Rejected'}
                textColor={'text-white'}
                bgColor={'bg-red-500'}
                bgHover={'hover:bg-red-400'}
                htmlType={'button'}
                fullWidth={'w-full'}
                acHover={'hover:cursor-not-allowed'}
              />
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationItem;
