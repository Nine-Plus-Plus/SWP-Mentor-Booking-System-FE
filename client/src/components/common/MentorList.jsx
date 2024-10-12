import React, { useState } from 'react';
import { Search, UserItem } from '../index';

const MentorList = () => {
  const [searchPayload, setSearchPayload] = useState({
    name: '',
    skill: '',
    date: ''
  });
  console.log(searchPayload);

  return (
    <div className="w-full h-full flex flex-col break-words gap-3">
      <Search searchFor={'mentor'} setPayload={setSearchPayload} />
      <div className="p-3 bg-white rounded-md flex flex-col gap-5">
        <UserItem
          roleItem={'Mentor'}
          name={'Trịnh Quốc Thắng'}
          specialized={'React'}
          gender={'Male'}
          star={5}
          sameClass={true}
          showSchedule={true}
        />
        <UserItem
          roleItem={'Mentor'}
          name={'Trịnh Quốc Thắng'}
          specialized={'DOTNET'}
          gender={'Male'}
          star={4.5}
          sameClass={false}
          showSchedule={true}
        />
        <UserItem
          roleItem={'Mentor'}
          name={'Trịnh Quốc Thắng'}
          specialized={'DELOY'}
          gender={'Male'}
          star={4}
          sameClass={true}
          showSchedule={true}
        />
        <UserItem
          roleItem={'Mentor'}
          name={'Trịnh Quốc Thắng'}
          specialized={'React'}
          gender={'Male'}
          star={2}
          sameClass={false}
          showSchedule={true}
        />
        <UserItem
          roleItem={'Mentor'}
          name={'Trịnh Quốc Thắng'}
          specialized={'React'}
          gender={'Male'}
          star={4.5}
          sameClass={true}
          showSchedule={true}
        />
        <UserItem
          roleItem={'Mentor'}
          name={'Trịnh Quốc Thắng'}
          specialized={'React'}
          gender={'Male'}
          star={4}
          sameClass={false}
          showSchedule={true}
        />
        <UserItem
          roleItem={'Mentor'}
          name={'Trịnh Quốc Thắng'}
          specialized={'React'}
          gender={'Male'}
          star={5}
          sameClass={false}
          showSchedule={true}
        />
        <UserItem
          roleItem={'Mentor'}
          name={'Trịnh Quốc Thắng'}
          specialized={'React'}
          gender={'Male'}
          star={3.5}
          sameClass={false}
          showSchedule={true}
        />
      </div>
    </div>
  );
};

export default MentorList;
