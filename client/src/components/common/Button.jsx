import React, { memo } from 'react'

const Button = ({text, textColor, bgColor, bgHover, IcAfter, onClick, fullWidth, type='submit' }) => {
    return (
        <button
            type={type}
            className={`w-full ${textColor} ${bgColor} ${fullWidth} 
            flex items-center justify-center gap-1 cursor-pointer text-xl
            p-2 rounded-lg hover:underline px-12 font-semibold hover:${bgHover}`}
            onClick={onClick}
        >
            {IcAfter && <IcAfter />}
            {text}
        </button>
    )
}

export default memo(Button)