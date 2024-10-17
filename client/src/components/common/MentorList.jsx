import React, { useEffect, useState } from 'react';
import { Search, UserItem } from '../index';
import { getAllMentorByNameSkillDate } from '../../apis/MentorServices';
import { capitalizeFirstLetter, convertSkillArray } from '../../utils/commonFunction';
import { useUserStore } from '../../store/useUserStore';
import dayjs from 'dayjs';

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
        const skills = searchPayload?.skill?.length > 0 ? searchPayload.skill.join(',') : undefined;
        const name = searchPayload?.name || '';
        const availableFrom = searchPayload?.date[0]?.format('DD-MM-YYYY HH:mm') || undefined;
        const availableTo = searchPayload?.date[1]?.format('DD-MM-YYYY HH:mm') || undefined;

        const response = await getAllMentorByNameSkillDate(name, skills, availableFrom, availableTo, token);
        if (response && response.statusCode === 200) setMentors(response.mentorsDTOList);
        else setMentors([]);
      } catch (error) {
        setError(error.message || 'Đã xảy ra lỗi');
      }
    };
    fetchMentorByCondition();
  }, []);

  useEffect(() => {
    const fetchMentorByCondition = async () => {
      const token = localStorage.getItem('token');
      try {
        const skills = searchPayload?.skill?.length > 0 ? searchPayload.skill.join(',') : undefined;
        const name = searchPayload?.name || '';
        const availableFrom = searchPayload?.date[0]?.format('DD-MM-YYYY HH:mm') || undefined;
        const availableTo = searchPayload?.date[1]?.format('DD-MM-YYYY HH:mm') || undefined;
        const response = await getAllMentorByNameSkillDate(name, skills, availableFrom, availableTo, token);
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
              schedule={mentor?.mentorSchedules}
              showSchedule={mentor?.mentorSchedules?.length > 0 ? true : false}
              idUser={mentor?.user?.id}
              code={mentor?.mentorCode}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default MentorList;
