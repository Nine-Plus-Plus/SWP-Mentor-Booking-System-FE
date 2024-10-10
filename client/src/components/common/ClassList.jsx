import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import path from '../../utils/path';
import Search from './Search';
import UserItem from './UserItem';

const ClassList = ({ addGroup }) => {
  const [countMember, setCountMember] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (countMember >= 4) {
      navigate(`/${path.PUBLIC_STUDENT}/${path.STUDENT_GROUP}`);
      toast.success('Create Project Successfully!');
    }
  }, [countMember]);

  return (
    <div className="w-full h-full flex flex-col break-words gap-3">
      <Search />
      {addGroup && <p className="text-2xl font-semibold text-red-500">Limit member: {countMember}/4</p>}
      <div className=" bg-white flex flex-col gap-5 p-3 rounded-md">
        {!addGroup && (
          <UserItem
            roleItem={'Mentor'}
            name={'Thầy Lâm'}
            specialized={'DOTNET, React, Spring Boot'}
            gender={'Male'}
            star={4.5}
          />
        )}
        <UserItem
          roleItem={'Student'}
          name={'Trịnh Quốc Thắng'}
          specialized={'NodeJS'}
          gender={'Male'}
          addGroup={addGroup}
          setCountMember={setCountMember}
          countMember={countMember}
          isAdded={false}
        />
        <UserItem
          roleItem={'Student'}
          name={'Trịnh Quốc Thắng'}
          specialized={'NodeJS'}
          gender={'Male'}
          addGroup={addGroup}
          setCountMember={setCountMember}
          countMember={countMember}
          isAdded={true}
        />
        <UserItem
          roleItem={'Student'}
          name={'Trịnh Quốc Thắng'}
          specialized={'NodeJS'}
          gender={'Male'}
          addGroup={addGroup}
          setCountMember={setCountMember}
          countMember={countMember}
          isAdded={true}
        />
        <UserItem
          roleItem={'Student'}
          name={'Trịnh Quốc Thắng'}
          specialized={'NodeJS'}
          gender={'Male'}
          addGroup={addGroup}
          setCountMember={setCountMember}
          countMember={countMember}
          isAdded={false}
        />
        <UserItem
          roleItem={'Student'}
          name={'Trịnh Quốc Thắng'}
          specialized={'NodeJS'}
          gender={'Male'}
          addGroup={addGroup}
          setCountMember={setCountMember}
          countMember={countMember}
          isAdded={false}
        />
        <UserItem
          roleItem={'Student'}
          name={'Trịnh Quốc Thắng'}
          specialized={'NodeJS'}
          gender={'Male'}
          addGroup={addGroup}
          setCountMember={setCountMember}
          countMember={countMember}
          isAdded={false}
        />
      </div>
    </div>
  );
};

export default ClassList;
