import React, { useState } from 'react';
import { Form, Input } from 'antd';
import { EyeInvisibleFilled, EyeTwoTone, LockOutlined } from '@ant-design/icons';
import { Button } from '../index';
import { useNavigate } from 'react-router-dom';
import { StudentLogin } from '../../apis/UserServices';
import { toast } from 'react-toastify';
import { useUserStore } from '../../store/useUserStore';

export const ChangePass = () => {
  const [isShowPass, setIsShowPass] = useState(false);
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { setModal } = useUserStore();

  // Hàm xử lý khi submit form
  const onFinish = async values => {
    const { newPassword } = values;
    setIsLoading(true);
    const response = await StudentLogin({ password: newPassword });
    setIsLoading(false);
    if (response && response.data.token) {
      setModal(response.data.token, 'student', 'Wyn', true);
      toast.success('Password Changed Successfully');
      navigate('/student');
    } else {
      toast.error('Fail to change password!!!');
    }
  };

  // Hàm xác nhận mật khẩu có khớp hay không
  const validateConfirmPassword = ({ getFieldValue }) => ({
    validator(_, value) {
      if (!value || getFieldValue('newPassword') === value) {
        return Promise.resolve();
      }
      return Promise.reject(new Error('Passwords do not match!'));
    }
  });

  return (
    <div className="w-full h-min-heigh-custom flex items-center justify-center">
      <div
        className="w-1/3 shadow-2xl p-6 gap-8 border
                flex flex-col items-center justify-center rounded-lg"
      >
        <h1 className="text-3xl font-semibold text-orange-600 font-Merriweather text-center">
          Welcome To Booking Mentor System
        </h1>
        <div className="flex justify-start items-center w-full gap-5 border-b text-lg font-bold">
          <span className="text-gray-600 border-b-4 border-orange-600">Change Password</span>
        </div>
        <div className="w-full">
          <Form name="change_password" form={form} onFinish={onFinish}>
            {/* Trường nhập New Password */}
            <Form.Item
              name="newPassword"
              rules={[
                {
                  required: true,
                  message: 'Please input your New Password!'
                }
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="mr-2" />}
                type={isShowPass ? 'text' : 'password'}
                placeholder="New Password"
                className="text-xl"
                iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleFilled />)}
              />
            </Form.Item>

            {/* Trường nhập Confirm Password */}
            <Form.Item
              name="confirmPassword"
              dependencies={['newPassword']}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: 'Please confirm your New Password!'
                },
                validateConfirmPassword // Thêm quy tắc kiểm tra mật khẩu khớp
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="mr-2" />}
                type={isShowPass ? 'text' : 'password'}
                placeholder="Confirm Password"
                className="text-xl"
                iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleFilled />)}
              />
            </Form.Item>

            {/* Nút Confirm */}
            <Form.Item className="flex items-center justify-center w-full">
              <Button
                textColor="text-white"
                bgColor="bg-main-1"
                bgHover="hover:bg-main-2"
                text={'Confirm'}
                htmlType="submit"
                isLoading={isLoading}
              />
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ChangePass;
