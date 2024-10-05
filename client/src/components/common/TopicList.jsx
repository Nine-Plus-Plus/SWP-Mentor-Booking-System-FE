import React from 'react';
import TopicItem from './TopicItem';

const TopicList = ({ setPayloadProject, setShowTopic }) => {
  return (
    <div className="bg-white rounded-md flex flex-col gap-5 w-full">
      <TopicItem setPayloadProject={setPayloadProject} setShowTopic={setShowTopic} />
    </div>
  );
};

export default TopicList;
