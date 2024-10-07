import { Button, Table, Form, Modal, Input, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { createSemester, deleteSemester, getAllSemester } from '../../apis/SemesterServices';
import dayjs from 'dayjs';

const SemesterManager = () => {
  const [semesters, setSemesters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchSemesters = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await getAllSemester(token);
        setSemesters(
          response.data.semesterDTOList.map(semester => ({
            ...semester,
            dateCreated: dayjs(semester.dateCreated).format('HH:mm DD-MM-YYYY')
          }))
        );
      } catch (err) {
        setError(err?.message || 'Đã xảy ra lỗi');
      } finally {
        setLoading(false);
      }
    };

    fetchSemesters();
  }, []);

  const showCreateModal = () => {
    form.resetFields(); // Xóa các giá trị trong form
    setIsCreateModalVisible(true); // Hiển thị modal tạo người dùng
  };

  const handleCreateSemester = async () => {
    const token = localStorage.getItem('token');

    try {
      const values = await form.validateFields();
      const dataCreate = form.getFieldValue();
      console.log(dataCreate);

      const response = await createSemester(dataCreate, token);
      console.log(response);

      if (response && response.data.statusCode === 201) {
        //   setStudents([...students, response.studentsDTOList]);
        setIsCreateModalVisible(false);
        message.success('Student created successfully');
      } else {
        message.error('Failed to create student');
      }
    } catch (error) {
      console.error('Create student error:', error);
      message.error('Failed to create student: ' + error.message);
    }
  };

  const handleDelete = async semesterId => {
    const token = localStorage.getItem('token');
    try {
      const response = await deleteSemester(semesterId, token);
      if (response && response.data.statusCode === 200) {
        message.success('Semester deleted successfully');
        setSemesters(prevSemester => prevSemester.filter(semester => semester.id !== semesterId)); // Cập nhật danh sách người dùng
      } else {
        message.error('Failed to delete student: ' + response.data.message);
      }
    } catch (error) {
      console.error('Delete semester error:', error);
      message.error('Failed to delete semester: ' + error.message);
    }
  };

  const handleCancelCreate = () => {
    form.resetFields();
    setIsCreateModalVisible(false);
  };

  const columns = [
    {
      title: 'No',
      dataIndex: 'no',
      key: 'no',
      render: (text, record, index) => index + 1
    },
    {
      title: 'Semester',
      dataIndex: 'semesterName',
      key: 'semesterName'
    },
    {
      title: 'Date Create',
      dataIndex: 'dateCreated',
      key: 'dateCreated'
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <Button className="bg-red-500 text-white  w-2/5" onClick={() => handleDelete(record.id)}>
          Delete
        </Button>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-2">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Semester List</h1>
      <Button type="primary" onClick={showCreateModal} style={{ marginBottom: '10px' }}>
        Create Semester
      </Button>
      <Table columns={columns} dataSource={semesters} bordered rowKey="id" pagination={{ pageSize: 10 }} />
      {/* Modal for creating semester */}

      <Modal
        title="Create semester"
        open={isCreateModalVisible}
        onOk={handleCreateSemester}
        onCancel={handleCancelCreate}
      >
        <div className="max-h-96 overflow-y-auto p-5">
          <Form form={form} layout="vertical">
            <Form.Item
              label="Semester Name"
              name="semesterName"
              rules={[
                {
                  required: true,
                  message: 'Please input your semester name!'
                }
              ]}
            >
              <Input />
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </div>
  );
};

export default SemesterManager;
