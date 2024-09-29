
import { DatePicker } from 'antd';
import React from 'react';

const MentorItem = () => {
  // example for today's labels and invalids
  const myLabels = React.useMemo(() => {
    return [
      {
        start: '2024-09-28',
        textColor: '#e1528f',
        title: '3 SPOTS'
      }
    ];
  }, []);

  const myInvalid = React.useMemo(() => {
    return [
      {
        start: '2024-09-28T08:00',
        end: '2024-09-28T13:00'
      },
      {
        start: '2024-09-28T15:00',
        end: '2024-09-28T17:00'
      },
      {
        start: '2024-09-28T19:00',
        end: '2024-09-28T20:00'
      }
    ];
  }, []);

  return (
    <div>
      <DatePicker
        controls={['calendar', 'timegrid']}
        min="2024-09-28T00:00"
        max="2025-03-28T00:00"
        minTime="08:00"
        maxTime="19:59"
        stepMinute={60}
        labels={myLabels}
        invalid={myInvalid}
      />
    </div>
  );
};

export default MentorItem;
