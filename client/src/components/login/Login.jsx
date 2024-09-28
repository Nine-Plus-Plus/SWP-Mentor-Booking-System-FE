import React, { useState } from 'react';
import clsx from 'clsx';
import { Divider, Form, Input } from 'antd';
import {
    EyeInvisibleFilled,
    EyeTwoTone,
    GoogleCircleFilled,
    LockOutlined,
    MailOutlined,
    UserOutlined
} from '@ant-design/icons';
import { Button } from '../index';
import icons from '../../utils/icon';
import { Link, useNavigate } from 'react-router-dom';
import { StudentLogin } from '../../apis/UserServices';
import { toast } from 'react-toastify';
import { useUserStore } from '../../store/useUserStore';

const Login = () => {
    const [isShowPass, setIsShowPass] = useState(false);
    const [form] = Form.useForm();
    const [payload, setPayload] = useState({ username: '', password: '' });
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const { setModal } = useUserStore();

    const { FaSignInAlt, FcGoogle } = icons;

    const onFinish = values => {
        setPayload(values);
    };

    const handleLogin = async () => {
        if (payload.username && payload.password) {
            setIsLoading(true);
            const response = await StudentLogin(payload);
            setIsLoading(false);
            if (response && response.data.token) {
                ///// set token
                setModal(response.data.token, 'student', 'Wyn', true);
                toast.success('Login SuccessFull');
                navigate('/student');
            } else {
                if (response && response.status === 400) toast.error(response.data.error);
            }
        }
    };

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setPayload((prev) => ({
        ...prev,
        [name]: value,
      }));
    };

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
                    <span className="text-gray-600 border-b-4 border-orange-600">Sign In</span>
                </div>
                <div className="w-full">
                    <Form
                        name="normal_login"
                        initialValues={{
                            remember: true
                        }}
                        form={form}
                        onFinish={onFinish}
                    >
                        <Form.Item
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Username!'
                                }
                            ]}
                        >
                            <Input
                                prefix={<UserOutlined className="mr-2" />}
                                placeholder="Username"
                                name="username"
                                className="text-xl"
                                onChange={handleInputChange} // Gán hàm xử lý onChange
                            />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Password!'
                                }
                            ]}
                        >
                            <Input
                                prefix={<LockOutlined className="mr-2" />}
                                type={isShowPass ? 'text' : 'password'}
                                placeholder="Password"
                                className="text-xl"
                                name="password"
                                onChange={handleInputChange} // Gán hàm xử lý onChange
                                suffix={
                                    isShowPass ? (
                                        <EyeTwoTone
                                            className="text-gray-400"
                                            onClick={() => {
                                                setIsShowPass(false);
                                            }}
                                        />
                                    ) : (
                                        <EyeInvisibleFilled
                                            className="text-gray-400"
                                            onClick={() => {
                                                setIsShowPass(true);
                                            }}
                                        />
                                    )
                                }
                            />
                        </Form.Item>
                        <Form.Item>
                            {/* code here */}
                            <Link to={'/'} className="text-blue-600 hover:underline">
                                Forgot password ?
                            </Link>
                        </Form.Item>
                        <Form.Item className="flex items-center justify-center w-full bg-ge">
                            <Button
                                textColor="text-white"
                                bgColor="bg-main-1"
                                bgHover="hover:bg-main-2"
                                text={'Sign In'}
                                htmlType="submit"
                                IcBefore={FaSignInAlt}
                                onClick={handleLogin}
                                isLoading={isLoading}
                            />
                        </Form.Item>
                        <Divider style={{ borderColor: '#C1C1C1' }}>Sign in with</Divider>
                        <Button
                            IcBefore={FcGoogle}
                            fullWidth={'w-full'}
                            bgColor="bg-gray-100"
                            bgHover="hover:bg-blue-300"
                            htmlType="button"
                        ></Button>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default Login;
