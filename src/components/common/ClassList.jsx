import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import path from '../../utils/path';
import Search from './Search';
import UserItem from './UserItem';
import { useUserStore } from '../../store/useUserStore';
import { getStudentByIdAndSearch } from '../../apis/StudentServices';
import { capitalizeFirstLetter, convertSkillArray } from '../../utils/commonFunction';
import { Pagination } from 'antd';
import Loading from './Loading';

const ClassList = ({ addGroup }) => {
  const [countMember, setCountMember] = useState(0);
  const [error, setError] = useState(null);
  const [students, setStudents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const topRef = useRef(null);
  const [loading, setLoading] = useState(true);

  const [searchPayload, setSearchPayload] = useState({
    name: '',
    expertise: ''
  });

  const navigate = useNavigate();
  const { userData, mentorOfClass, role } = useUserStore();

  useEffect(() => {
    const fetchStudentByClassIdAndSearch = async () => {
      const token = localStorage.getItem('token');

      try {
        const response = await getStudentByIdAndSearch(
          userData?.aclass.id,
          searchPayload?.name || undefined,
          searchPayload?.expertise || undefined,
          token
        );
        if (response?.statusCode === 200) setStudents(response.studentsDTOList);
        else setStudents([]);
      } catch (error) {
        setError(error.message || 'Đã xảy ra lỗi');
      } finally {
        setLoading(false);
      }
    };
    fetchStudentByClassIdAndSearch();
    setLoading(false);
  }, [userData, searchPayload]);

  useEffect(() => {
    if (countMember >= 4) {
      navigate(`/${path.PUBLIC_STUDENT}/${path.STUDENT_GROUP}`);
      toast.success('Create Project Successfully!');
    }
  }, [countMember]);

  const currentStudent = students.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const onChangePage = page => {
    setCurrentPage(page);
    topRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  if (loading) {
    return <div className="text-center text-gray-700">Loading...</div>;
  }

  return (
    <div className="w-full h-full flex flex-col break-words gap-3">
      {/* {loading && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-white bg-opacity-70">
          <Loading />
        </div>
      )} */}
      <Search setPayload={setSearchPayload} />
      {addGroup && <p className="text-2xl font-semibold text-red-500">Limit member: {countMember}/4</p>}
      <div className=" bg-white flex flex-col gap-5 p-3 rounded-md" ref={topRef}>
        {!addGroup && mentorOfClass && role === 'STUDENT' && (
          <UserItem
            roleItem={'Mentor'}
            name={mentorOfClass?.mentorInf?.fullName}
            specialized={convertSkillArray(userData?.aclass?.mentor?.skills)}
            gender={mentorOfClass?.mentorInf?.gender}
            star={userData?.aclass?.mentor?.star}
            sameClass={true}
            idUser={mentorOfClass?.mentorInf?.id}
            code={userData?.aclass?.mentor?.mentorCode}
            avatar={mentorOfClass?.mentorInf?.avatar}
          />
        )}
        {currentStudent?.length === 0 ? (
          <p className="text-red-500">No students were found.</p>
        ) : (
          currentStudent?.map(student => (
            <UserItem
              key={student.id}
              roleItem={capitalizeFirstLetter(student?.user?.role?.roleName)}
              specialized={student?.expertise}
              name={student?.user?.fullName}
              gender={student?.user?.gender}
              isAdded={false}
              idUser={student?.user?.id}
              code={student?.studentCode}
              avatar={student?.user?.avatar}
            />
          ))
        )}
        {currentStudent?.length !== 0 && (
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={students.length}
            onChange={onChangePage}
            showSizeChanger={false}
          />
        )}
      </div>
    </div>
  );
};

export default ClassList;
