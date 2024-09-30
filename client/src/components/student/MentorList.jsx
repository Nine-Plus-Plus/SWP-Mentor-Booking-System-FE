import React from 'react';
import { UserItem } from '../index';

const MentorList = () => {
  return (
    <div className="p-3 bg-white rounded-md flex flex-col gap-5">
      <UserItem
        role={'Mentor'}
        name={'Trịnh Quốc Thắng'}
        specialized={'React'}
        gender={'Male'}
        star={5}
        sameClass={true}
        showSchedule={true}
      />
      <UserItem
        role={'Mentor'}
        name={'Trịnh Quốc Thắng'}
        specialized={'DOTNET'}
        gender={'Male'}
        star={4.5}
        sameClass={false}
        showSchedule={true}
      />
      <UserItem
        role={'Mentor'}
        name={'Trịnh Quốc Thắng'}
        specialized={'DELOY'}
        gender={'Male'}
        star={4}
        sameClass={true}
        showSchedule={true}
      />
      <UserItem
        role={'Mentor'}
        name={'Trịnh Quốc Thắng'}
        specialized={'React'}
        gender={'Male'}
        star={2}
        sameClass={false}
        showSchedule={true}
      />
      <UserItem
        role={'Mentor'}
        name={'Trịnh Quốc Thắng'}
        specialized={'React'}
        gender={'Male'}
        star={4.5}
        sameClass={true}
        showSchedule={true}
      />
      <UserItem
        role={'Mentor'}
        name={'Trịnh Quốc Thắng'}
        specialized={'React'}
        gender={'Male'}
        star={4}
        sameClass={false}
        showSchedule={true}
      />
      <UserItem
        role={'Mentor'}
        name={'Trịnh Quốc Thắng'}
        specialized={'React'}
        gender={'Male'}
        star={5}
        sameClass={false}
        showSchedule={true}
      />
      <UserItem
        role={'Mentor'}
        name={'Trịnh Quốc Thắng'}
        specialized={'React'}
        gender={'Male'}
        star={3.5}
        sameClass={false}
        showSchedule={true}
      />
    </div>
  );
};

export default MentorList;
