import React, { useEffect, useState } from 'react';
import GroupItem from './GroupItem';
import { useUserStore } from '../../store/useUserStore';
import { getGroupByClassId } from '../../apis/GroupServices';
import Loading from './Loading';

const ListGroup = () => {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userData } = useUserStore();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const fetchGroupClass = async () => {
      try {
        const classId = userData?.aclass?.id;
        setLoading(true);
        const response = await getGroupByClassId(classId, token);
        console.log(response);

        if (response && response?.statusCode === 200) setGroups(response?.groupDTOList);
        else setGroups([]);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    userData?.aclass?.id && fetchGroupClass();
    setLoading(false);
  }, [userData?.aclass?.id]);

  return (
    <div className="flex flex-col gap-3 p-3 bg-white rounded-md">
      {loading && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-white bg-opacity-70">
          <Loading />
        </div>
      )}
      <h1 className="text-2xl font-semibold"> Class: {userData?.aclass?.className}</h1>
      <div className="flex flex-col gap-3 p-3 bg-white rounded-md">
        {groups?.length === 0 ? (
          <p className="text-red-500">Do not have any group!</p>
        ) : (
          groups?.map(group => (
            <GroupItem
              key={group?.id}
              idGroup={group?.id}
              groupName={group?.groupName}
              idTopic={group?.project?.topic?.topicName}
              totalPoint={group?.totalPoint}
              process={group?.project?.percentage}
              totalMember={group?.students}
              projectName={group?.project?.projectName}
              leader={group?.students?.find(student => student?.groupRole === 'LEADER')?.user?.fullName}
              leaderId={group?.students?.find(student => student?.groupRole === 'LEADER')?.user?.id}
              urlFile={group?.fileURL}
            />
          ))
        )}
      </div>
    </div>
  );
};
export default ListGroup;
