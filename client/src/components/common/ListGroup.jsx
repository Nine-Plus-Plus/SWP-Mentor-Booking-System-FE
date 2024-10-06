import React from 'react';
import GroupItem from './GroupItem';

const ListGroup = () => {
  return (
    <div className="flex flex-col gap-3 p-3 bg-white rounded-md">
      <GroupItem
        idGroup={2}
        groupName={'Seven Plus Plus'}
        idTopic={2}
        totalPoint={100}
        process={'30%'}
        totalMember={3}
        className={'SE18B03'}
        projectName={'Cá Koi'}
      />
      <GroupItem
        idGroup={2}
        groupName={'Seven Plus Plus'}
        idTopic={2}
        totalPoint={100}
        process={'30%'}
        totalMember={3}
        className={'SE18B03'}
        projectName={'Cá Koi'}
      />
      <GroupItem
        idGroup={1}
        groupName={'Nine Plus Plus'}
        idTopic={1}
        totalPoint={100}
        process={'80%'}
        totalMember={5}
        className={'SE18B03'}
        projectName={'Booking'}
      />
      <GroupItem
        idGroup={2}
        groupName={'Seven Plus Plus'}
        idTopic={2}
        totalPoint={100}
        process={'30%'}
        totalMember={3}
        className={'SE18B03'}
        projectName={'Cá Koi'}
      />
      <GroupItem
        idGroup={3}
        groupName={'Eight Plus Plus'}
        idTopic={3}
        totalPoint={100}
        process={'20%'}
        totalMember={5}
        className={'SE18B03'}
        projectName={'Thuật toán'}
      />
    </div>
  );
};

export default ListGroup;
