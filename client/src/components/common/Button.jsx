import React, { memo } from 'react';
import { Link } from 'react-router-dom';

const Button = ({
  to,
  text,
  textColor,
  bgColor,
  bgHover,
  IcBefore,
  onClick,
  fullWidth,
  htmlType,
  isLoading,
  textSize
}) => {
  return to ? (
    <Link to={to}>
      <button
        type={htmlType}
        className={`${textColor} ${bgColor} ${fullWidth} 
            flex items-center justify-center gap-1 cursor-pointer ${textSize}
            p-2 rounded-lg hover:underline px-12 font-semibold ${bgHover}`}
        onClick={onClick}
      >
        {IcBefore && <IcBefore />}
        {text}
        {isLoading && <i className="fa-solid fa-circle-notch fa-spin text-sm"></i>}
      </button>
    </Link>
  ) : (
    <button
      type={htmlType}
      className={`${textColor} ${bgColor} ${fullWidth} 
            flex items-center justify-center gap-1 cursor-pointer ${textSize}
            p-2 rounded-lg hover:underline px-12 font-semibold ${bgHover}`}
      onClick={onClick}
    >
      {IcBefore && <IcBefore />}
      {text}
      {isLoading && <i className="fa-solid fa-circle-notch fa-spin text-sm"></i>}
    </button>
  );
};

export default memo(Button);
