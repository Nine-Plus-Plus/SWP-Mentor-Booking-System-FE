import React, { useEffect, useState } from 'react'
import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'
import { Divider, Form, Input } from 'antd'
import { EyeInvisibleFilled, EyeTwoTone, GoogleCircleFilled, LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons'
import { Button } from '../index'
import icons from '../../utils/icon'
import { Link } from 'react-router-dom'

const Login = () => {
    const [isShowPass, setIsShowPass] = useState(false)
    const [form] = Form.useForm()
    const [payload, setPayload] = useState({})
    
    const { FaSignInAlt, FcGoogle } = icons

    const onFinish = values => {
        setPayload(values)
    }

    console.log(payload)

    return (
        <div className="w-full h-min-heigh-custom flex items-center justify-center">
            <div className='w-1/3 shadow-2xl p-6 gap-8 border
                flex flex-col items-center justify-center rounded-lg'>
                <h1 className='text-3xl font-semibold text-orange-600 font-Merriweather text-center'>
                    Welcome To Booking Mentor System
                </h1>
                <div className='flex justify-start items-center w-full gap-5 border-b text-lg font-bold'>
                    <span className='text-gray-600 border-b-4 border-orange-600'
                    >
                        Sign In
                    </span>
                </div>
                <div className='w-full'>
                    <Form
                        name='normal_login'
                        initialValues={{
                            remember: true
                        }}
                        form={form}
                        onFinish={onFinish}
                    >
                        <Form.Item
                            name='username'
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
                                className='text-xl'
                            />
                        </Form.Item>
                        <Form.Item
                            name='password'
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
                                className='text-xl'
                                suffix={
                                    isShowPass ?
                                        <EyeTwoTone className='text-gray-400' onClick={() => { setIsShowPass(false) }}/>
                                        :
                                        <EyeInvisibleFilled className='text-gray-400' onClick={() => { setIsShowPass(true) }}/>
                                }
                            />
                        </Form.Item>
                        <Form.Item>
                            {/* code here */}
                            <Link to="/public/forgot-pass" className='text-blue-600 hover:underline'>
                                Forgot password ?
                            </Link>
                        </Form.Item>
                        <Form.Item className='flex items-center justify-center w-full bg-ge'>
                            <Button
                                textColor='text-white'
                                bgColor='bg-main-1'
                                bgHover={'bg-main-2'}
                                text={'Sign In'}
                                IcAfter={FaSignInAlt}
                            />
                        </Form.Item>
                        <Divider style={{borderColor:'#C1C1C1'}}>
                            Sign in with
                        </Divider>
                        <Button
                            IcAfter={FcGoogle}
                            bgColor='bg-gray-100'
                            bgHover={'bg-blue-300'}
                            type='button'
                        >
                        </Button>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default Login