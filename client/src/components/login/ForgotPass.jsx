import React, { useState } from 'react'
import { Form, Input } from 'antd'
import { MailOutlined } from '@ant-design/icons'
import { Button } from '../index'
import { useNavigate } from 'react-router-dom'

export const ForgotPass = () => {
    const [form] = Form.useForm()
    const [payload, setPayload] = useState({})
    const navigate = useNavigate()

    // Hàm xử lý sau khi form được submit
    const onFinish = values => {
        setPayload(values)
        console.log('Payload:', values)

        // Điều hướng người dùng đến trang 'send-recovery-otp' sau khi submit form
        navigate('/public/send-recovery-otp')
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
                    <span className='text-gray-600 border-b-4 border-orange-600'>
                        Find your account
                    </span>
                </div>
                <div className='w-full'>
                    <Form
                        name='normal_login'
                        initialValues={{ remember: true }}
                        form={form}
                        onFinish={onFinish}
                    >
                        <Form.Item
                            name='gmail'
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Gmail!'
                                }
                            ]}
                        >
                            <Input                                
                                prefix={<MailOutlined className="mr-2" />}
                                placeholder="Gmail"
                                className='text-xl'
                            />
                        </Form.Item>                        
                         
                        <Form.Item className='flex items-center justify-center w-full'>
                            <Button
                                textColor='text-white'
                                bgColor='bg-main-1'
                                bgHover='hover:bg-main-2'
                                text={'Next'}
                                htmlType='submit'
                            />
                        </Form.Item>                        
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default ForgotPass
