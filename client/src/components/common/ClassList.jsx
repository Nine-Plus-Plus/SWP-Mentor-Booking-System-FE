import React, { useEffect } from 'react';
import { UserItem } from '../index';

const ClassList = ({ addGroup }) => {
  return (
    <div className=" bg-white flex flex-col gap-5 p-3 rounded-md">
      <UserItem
        role={'Mentor'}
        name={'Thầy Lâm'}
        specialized={'DOTNET, React, Spring Boot'}
        gender={'Male'}
        star={4.5}
      />
      <UserItem role={'Student'} name={'Trịnh Quốc Thắng'} specialized={'NodeJS'} gender={'Male'} />
      <UserItem role={'Student'} name={'Trịnh Quốc Thắng'} specialized={'NodeJS'} gender={'Male'} />
      <UserItem role={'Student'} name={'Trịnh Quốc Thắng'} specialized={'NodeJS'} gender={'Male'} />
      <UserItem role={'Student'} name={'Trịnh Quốc Thắng'} specialized={'NodeJS'} gender={'Male'} />
      <UserItem role={'Student'} name={'Trịnh Quốc Thắng'} specialized={'NodeJS'} gender={'Male'} />
      <UserItem role={'Student'} name={'Trịnh Quốc Thắng'} specialized={'NodeJS'} gender={'Male'} />
    </div>
  );
};

export default ClassList;
