import { DatePicker, Space } from 'antd';
import React, { useState } from 'react';
import { Button } from '../index';
import path from '../../utils/path';

const Search = ({ searchFor }) => {
  const { RangePicker } = DatePicker;

  const [payload, setPayload] = useState({
    name: '',
    skill: '',
    date: ''
  });

  const onOk = value => {
    setPayload(preData => ({ ...preData, date: value }));
  };

  const handleOnChanges = e => {
    const { name, value } = e.target;
    setPayload(preData => ({ ...preData, [name]: value }));
    console.log(payload);
  };

  const handleSubmit = () => {
    console.log(payload);
  };

  return (
    <div className="flex w-full gap-3 h-[7vh] p-2 bg-[#F5F5F5] rounded-md">
      <input
        className="rounded-md w-1/5 text-lg p-1"
        type="input"
        placeholder="Name"
        name="name"
        onChange={handleOnChanges}
      />

      <input
        className="rounded-md w-1/5 text-lg p-1"
        type="input"
        placeholder="Skill"
        name="skill"
        onChange={handleOnChanges}
      />
      {searchFor === 'mentor' && (
        <RangePicker
          showTime={{
            format: 'HH:mm'
          }}
          format="DD-MM-YYYY HH:mm"
          onChange={(value, dateString) => {
            console.log('Selected Time: ', value);
            console.log('Formatted Selected Time: ', dateString);
            setPayload(preData => ({ ...preData, date: dateString }));
          }}
          onOk={onOk}
        />
      )}

      <Button
        text={'Search'}
        textColor={'text-white'}
        bgColor={'bg-main-1'}
        bgHover={'hover:bg-main-2'}
        fullWidth={'w-1/12'}
        htmlType={'button'}
        onClick={handleSubmit}
      />
    </div>
  );
};

export default Search;
