import React, { useEffect, useState } from 'react';
import { Search, UserItem } from '../index';
import { getAllMentorByNameSkillDate } from '../../apis/MentorServices';
import { capitalizeFirstLetter, convertSkillArray } from '../../utils/commonFunction';
import { useUserStore } from '../../store/useUserStore';

const MentorList = () => {
  const [error, setError] = useState(null);
  const [mentors, setMentors] = useState([]);
  const { userData } = useUserStore();
  const [searchPayload, setSearchPayload] = useState({
    name: '',
    skill: '',
    date: ''
  });

  useEffect(() => {
    const fetchMentorByCondition = async () => {
      const token = localStorage.getItem('token');
      try {
        const skills = searchPayload?.skill?.length ? searchPayload.skill.join(',') : undefined;
        const name = searchPayload?.name || undefined;

        const response = await getAllMentorByNameSkillDate(
          name,
          skills,
          // dateFrom || undefined,
          // dateTo || undefined,
          token
        );
        console.log(response);
        if (response && response.statusCode === 200) setMentors(response.mentorsDTOList);
        else setMentors([]);
      } catch (error) {
        setError(error.message || 'Đã xảy ra lỗi');
      }
    };
    fetchMentorByCondition();
  }, [searchPayload]);

  return (
    <div className="w-full h-full flex flex-col break-words gap-3">
      <Search searchFor={'mentor'} setPayload={setSearchPayload} />
      <div className="p-3 bg-white rounded-md flex flex-col gap-5">
        {mentors.length === 0 ? (
          <p className="text-red-500">No instructors were found.</p>
        ) : (
          mentors.map(mentor => (
            <UserItem
              key={mentor.id}
              roleItem={capitalizeFirstLetter(mentor?.user?.role?.roleName)}
              name={mentor?.user?.fullName}
              specialized={convertSkillArray(mentor?.skills)}
              gender={mentor?.user?.gender}
              star={mentor?.star}
              sameClass={mentor?.assignedClass?.id === userData?.aclass?.id}
              showSchedule={true}
              idUser={mentor?.user?.id}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default MentorList;
