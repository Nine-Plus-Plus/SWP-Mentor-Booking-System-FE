import { Form, Select, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { getAllSemester } from '../../apis/SemesterServices';
import Search from 'antd/es/transfer/search';
import dayjs from 'dayjs';
import { getAllGroupBySemesterId } from '../../apis/GroupServices';

const GroupManager = () => {
  const [semesters, setSemesters] = useState([]);
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSemester, setSelectedSemester] = useState(null);
  const [form] = Form.useForm();
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const fetchSemesters = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await getAllSemester(token);
        console.log(response?.data);

        if (response?.data?.statusCode === 200) {
          setSemesters(
            response?.data?.semesterDTOList?.map(semester => ({
              ...semester,
              dateCreated: dayjs(semester.dateCreated).format('HH:mm DD-MM-YYYY')
            }))
          );
        }
      } catch (err) {
        setError(err?.message || 'Đã xảy ra lỗi');
      } finally {
        setLoading(false);
      }
    };
    fetchSemesters();
  }, []);

  useEffect(() => {
    if (semesters?.length > 0) {
      setSelectedSemester(semesters[0].id);
    }
  }, [semesters]);

  useEffect(() => {
    console.log(selectedSemester);

    const token = localStorage.getItem('token');
    const fetchAllGroup = async () => {
      const response = await getAllGroupBySemesterId(selectedSemester, searchText, token);
      console.log(response);

      if (response?.statusCode === 200) {
        setGroups(response?.groupDTOList);
      }
    };
    fetchAllGroup();
  }, [selectedSemester, searchText]);

  const columns = [
    {
      title: 'No',
      dataIndex: 'no',
      key: 'no',
      render: (text, record, index) => index + 1
    },
    {
      title: 'Group Name',
      dataIndex: 'groupName',
      key: 'groupName'
    },
    {
      title: 'Total Point',
      dataIndex: 'totalPoint',
      key: 'totalPoint',
      render: text => <span className="text-yellow-500 border border-yellow-500 p-1 rounded">{text}</span>
    },
    {
      title: 'Class',
      dataIndex: ['classDTO', 'className'],
      key: 'className',
      render: text => <span className="text-green-500 border border-green-500 p-1 rounded">{text}</span>
    },
    {
      title: 'Leader',
      key: 'leader',
      render: (text, record) => {
        const leader = record.students.find(student => student.groupRole === 'LEADER');
        return leader ? leader.user.fullName : 'N/A';
      }
    },
    {
      title: 'Project Name',
      dataIndex: ['project', 'projectName'],
      key: 'projectName'
    },
    {
      title: 'Topic',
      dataIndex: ['project', 'topic', 'topicName'],
      key: 'topicName'
    },
    {
      title: 'Specification',
      dataIndex: 'fileURL',
      key: 'fileURL',
      render: text => (
        <a
          href={text}
          target="_blank"
          rel="noopener noreferrer"
          className={`${
            text ? 'text-blue-500 border border-blue-500' : 'text-red-500 border border-red-500'
          } p-1 rounded`}
        >
          {text ? 'Download File' : 'Not Yet'}
        </a>
      )
    }
  ];

  const onChange = e => {
    setSearchText(e.target.value);
  };

  return (
    <div className="w-full h-full bg-gray-100">
      <div className="flex gap-3">
        <Select
          placeholder="Semester"
          value={selectedSemester}
          onChange={value => setSelectedSemester(value)}
          style={{ backgroundColor: '#D1D5DB', width: '10vw' }}
        >
          {semesters?.map(semester => (
            <Select.Option key={semester.id} value={semester.id}>
              {semester.semesterName}
            </Select.Option>
          ))}
        </Select>
        {/* search */}
        <div className="w-[25vw] mb-3">
          <Search placeholder="input search text" onChange={onChange} />
        </div>
      </div>
      <Table
        columns={columns}
        dataSource={groups}
        bordered
        rowKey="id"
        pagination={{ pageSize: 10 }}
        scroll={{ y: 430 }}
      />
    </div>
  );
};

export default GroupManager;
