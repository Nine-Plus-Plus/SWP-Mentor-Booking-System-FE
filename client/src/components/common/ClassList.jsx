import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import path from '../../utils/path';
import Search from './Search';
import UserItem from './UserItem';
import { useUserStore } from '../../store/useUserStore';
import { getStudentByIdAndSearch } from '../../apis/StudentServices';

const ClassList = ({ addGroup }) => {
  const [countMember, setCountMember] = useState(0);
  const [error, setError] = useState(null);
  const [students, setStudents] = useState([]);

  const [searchPayload, setSearchPayload] = useState({
    name: '',
    expertise: ''
  });

  console.log(searchPayload);
  const navigate = useNavigate();
  const { userData } = useUserStore();

  useEffect(() => {
    const fetchStudentByIdAndSearch = async () => {
      const token = localStorage.getItem('token');

      try {
        const response = await getStudentByIdAndSearch(
          userData.aclass.id,
          searchPayload.name || undefined,
          searchPayload.expertise || undefined,
          token
        );
        if (response && response.statusCode === 200) setStudents(response.studentsDTOList);
        else setStudents([]);
      } catch (error) {
        setError(error.message || 'Đã xảy ra lỗi');
      }
    };
    fetchStudentByIdAndSearch();
    console.log(students);
  }, [userData, searchPayload]);

  useEffect(() => {
    if (countMember >= 4) {
      navigate(`/${path.PUBLIC_STUDENT}/${path.STUDENT_GROUP}`);
      toast.success('Create Project Successfully!');
    }
  }, [countMember]);

  return (
    <div className="w-full h-full flex flex-col break-words gap-3">
      <Search setPayload={setSearchPayload} />
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
        {students.length === 0 ? (
          <p className="text-red-500">Không có sinh viên nào được tìm thấy.</p>
        ) : (
          students.map(student => (
            <UserItem
              key={student.id}
              roleItem={student.user.role.roleName}
              specialized={student.expertise}
              name={student.user.fullName}
              studentCode={student.studentCode}
              gender={student.user.gender}
              isAdded={false}
              idUser={student.user.id}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default ClassList;
