import React from 'react';
import { Table } from 'antd';

export const ReviewList = () => {
  const columns = [
    {
      title: 'No.',
      key: 'index',
      render: (text, record, index) => index + 1
    },
    {
      title: 'Mentor Name',
      dataIndex: 'mentorName',
      key: 'name'
    },
    {
      title: 'Date Created',
      dataIndex: 'dateCreated',
      key: 'dateCreated '
    },
    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      render: () => <a>View</a>
    }
  ];

  const data = [
    {
      key: '1',
      mentorName: 'Alice Johnson',
      dateCreated: '2024-10-20'
    },
    {
      key: '2',
      mentorName: 'Bob Smith',
      dateCreated: '2024-10-21'
    },
    {
      key: '3',
      mentorName: 'Carol Williams',
      dateCreated: '2024-10-22'
    }
  ];

  return (
    <div className="w-full h-full bg-gray-100 p-2">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Review List</h1>
      <Table columns={columns} bordered dataSource={data} rowKey="id" pagination={{ pageSize: 10 }} />
    </div>
  );
};
export default ReviewList;
