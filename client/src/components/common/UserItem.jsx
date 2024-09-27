import React from 'react'
import Button from './Button'
import clsx from 'clsx'

const UserItem = ({
    role,
    name,
    code,
    specialized,
    gender,
    addGroup
}) => {
    return (
        <div className='border shadow-md rounded-md h-[180px]'>
            <div className='h-[179px] flex w-full gap-4'>
                <img
                    src='/public/avatar1.jpg'
                    alt='avatar'
                    className='object-cover w-[160px] h-full rounded-md'
                />
                <div className='flex items-center justify-between w-full p-3'>
                    <div className='flex flex-col justify-between h-full gap-5'>
                        <div className='flex'>
                            <h1 className={clsx('font-bold text-xl', role === 'Mentor' && 'text-red-500 bg-yellow-400 p-1 rounded-md')}>
                                {role}
                            </h1>
                        </div>
                        <div className='flex flex-col gap-2 text-md'> 
                            <p>
                                {role === 'Mentor' ? 'Mentor' : 'Student'} name: {name}
                            </p>
                            <p>
                                {role === 'Mentor' ? 'Mentor' : 'Student'} code: {code}
                            </p>
                            <p>
                                {role === 'Mentor' ? 'Skill' : 'Specialized'}: {specialized}
                            </p>
                            <p>
                                Gender: {gender}
                            </p>
                        </div>
                    </div>
                    <Button
                        text={"View Detail"}
                        fullWidth={"w-1/5"}
                        htmlType={"button"}
                        bgColor={"bg-orange-500"}
                        textColor={"text-white"}
                        textSize={"text-sm"}
                        bgHover={"hover:bg-orange-400 hover:text-gray-100"}
                        onClick={() => {}}
                    />
                </div>
            </div>
        </div>
    )
}

export default UserItem