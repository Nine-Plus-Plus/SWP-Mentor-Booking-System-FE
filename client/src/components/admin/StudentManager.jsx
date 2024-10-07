import React, { useState, useEffect } from 'react';
import { getStudents, getStudentById, updateStudent, deleteStudent, createStudent } from '../../apis/StudentServices';
import { Table, Button, message, Form, Modal, Input, Radio, Select, DatePicker } from 'antd';
import dayjs from 'dayjs';

function StudentManager() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchStudents = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await getStudents(token);
        setStudents(response.data.studentsDTOList);
      } catch (err) {
        setError(err.message || 'Đã xảy ra lỗi');
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  // Delete student
  const handleDelete = async studentId => {
    const token = localStorage.getItem('token');
    try {
      const response = await deleteStudent(studentId, token);

      if (response && response.statusCode === 200) {
        message.success('Student deleted successfully');
        setStudents(prevStudents => prevStudents.filter(student => student.id !== studentId)); // Cập nhật danh sách người dùng
      } else {
        message.error('Failed to delete student: ' + response.data.message);
      }
    } catch (error) {
      console.error('Delete student error:', error);
      message.error('Failed to delete student: ' + error.message);
    }
  };

  // Update student
  const showUpdateModal = student => {
    setSelectedStudent(student);
    form.setFieldsValue({
      fullName: student.fullName,
      username: student.username,
      email: student.email,
      passsword: student.passsword,
      expire: student.expire,
      semester: student.semester,
      class: student.class,
      birthDate: student.birthDate,
      address: student.address,
      phone: student.phone,
      gender: student.gender,
      avatar: student.avatar
    });
    setIsUpdateModalVisible(true);
  };

  const handleUpdate = async () => {
    const token = localStorage.getItem('token');
    try {
      const values = await form.validateFields();
      const updateData = { ...form.getFieldsValue(), birthDate: dayjs(values.birthDate).format('DD-MM-YYYY') };
      const response = await updateStudent(selectedStudent.id, updateData, token);

      if (response && response.statusCode === 200) {
        // Cập nhật lại danh sách người dùng với thông tin mới
        setStudents(
          students.map(student => (student.id === response.studentsDTOList.id ? response.studentsDTOList : student))
        );
        setIsUpdateModalVisible(false);
        message.success('Student updated successfully');
      } else {
        message.error('Failed to update student');
      }
    } catch (error) {
      console.error('Update student error:', error);
      message.error('Failed to update student: ' + error.message);
    }
  };

  const handleCancelUpdate = () => {
    form.resetFields();
    setIsUpdateModalVisible(false);
  };

  // Create Student
  const showCreateModal = () => {
    setSelectedStudent(null); // Không chọn user nào vì đang tạo mới
    form.resetFields(); // Xóa các giá trị trong form
    setIsCreateModalVisible(true); // Hiển thị modal tạo người dùng
  };

  const handleCreateStudent = async () => {
    const token = localStorage.getItem('token');
    try {
      const values = await form.validateFields();
      const createData = { ...form.getFieldsValue(), birthDate: dayjs(values.birthDate).format('DD-MM-YYYY') };
      const response = await createStudent(createData, token);

      if (response && response.statusCode === 200) {
        setStudents([...students, response.studentsDTOList]);
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

  const handleCancelCreate = () => {
    form.resetFields();
    setIsCreateModalVisible(false);
  };

  if (loading) {
    return <div className="text-center text-gray-700">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  const columns = [
    {
      title: 'No',
      dataIndex: 'no',
      key: 'no',
      render: (text, record, index) => index + 1
    },
    {
      title: 'Avarta',
      dataIndex: 'avatar',
      key: 'avatar'
    },
    {
      title: 'Full Name',
      dataIndex: 'fullName',
      key: 'fullName'
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email'
    },
    {
      title: 'Birth Date',
      dataIndex: 'birthDate',
      key: 'birthDate'
    },
    {
      title: 'Semester',
      dataIndex: 'semester',
      key: 'semester'
    },
    {
      title: 'Class',
      dataIndex: 'class',
      key: 'class'
    },
    {
      title: 'Expire',
      dataIndex: 'expire',
      key: 'expire'
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone'
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender'
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <div className="flex flex-col gap-2">
          <Button
            className="bg-blue-500 text-white  w-full"
            onClick={() => showUpdateModal(record)}
            style={{ marginRight: '10px' }}
          >
            Update
          </Button>
          <Button className="bg-red-500 text-white  w-full" onClick={() => handleDelete(record.id)}>
            Delete
          </Button>
        </div>
      )
    }
  ];

  if (loading) {
    return <div className="text-center text-gray-700">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="w-full h-full bg-gray-100 p-2">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Student List</h1>
      <Button type="primary" onClick={showCreateModal} style={{ marginBottom: '10px' }}>
        Create Student
      </Button>
      <Table columns={columns} bordered dataSource={students} rowKey="id" pagination={{ pageSize: 10 }} />

      {/* Modal for updating student */}
      <Modal title="Update Student" open={isUpdateModalVisible} onOk={handleUpdate} onCancel={handleCancelUpdate}>
        <div className="max-h-96 overflow-y-auto p-5">
          <Form form={form} layout="vertical">
            <Form.Item
              label="FullName"
              name="fullName"
              rules={[
                {
                  required: true,
                  message: 'Please input your Name!'
                }
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Username"
              name="username"
              rules={[
                {
                  required: true,
                  message: 'Please input your username!'
                }
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: 'Please input your Gmail!'
                },
                {
                  type: 'email',
                  message: 'Please enter a valid email !'
                }
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item label="Birth Date" name="birthDate">
              <DatePicker format="DD-MM-YYYY" />
            </Form.Item>
            <Form.Item
              label="Semester"
              name="semester"
              rules={[
                {
                  required: true,
                  message: 'Please input your semester!'
                }
              ]}
            >
              <Select placeholder="Select your class">
                <Select.Option value="classA">Class A</Select.Option>
                <Select.Option value="classB">Class B</Select.Option>
                <Select.Option value="classC">Class C</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="Class"
              name="class"
              rules={[
                {
                  required: true,
                  message: 'Please input your class!'
                }
              ]}
            >
              <Select placeholder="Select your class">
                <Select.Option value="semester1">Semester 1</Select.Option>
                <Select.Option value="semester2">Semester 2</Select.Option>
                <Select.Option value="semester3">Semester 3</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="Expire"
              name="expire"
              rules={[
                {
                  required: true,
                  message: 'Please input your expire!'
                }
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item label="Address" name="address">
              <Input />
            </Form.Item>
            <Form.Item label="Phone" name="phone">
              <Input />
            </Form.Item>
            <Form.Item label="Gender" name="gender">
              <Radio.Group>
                <Radio value="male">Male</Radio>
                <Radio value="female">Female</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item label="Avatar" name="avatar">
              <Input />
            </Form.Item>
          </Form>
        </div>
      </Modal>

      {/* Modal for creating student */}
      <Modal
        title="Create student"
        open={isCreateModalVisible}
        onOk={handleCreateStudent}
        onCancel={handleCancelCreate}
      >
        <div className="max-h-96 overflow-y-auto p-5">
          <Form form={form} layout="vertical" initialValues={{ gender: 'male' }}>
            <Form.Item
              label="FullName"
              name="FullName"
              rules={[
                {
                  required: true,
                  message: 'Please input your Name!'
                }
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Username"
              name="username"
              rules={[
                {
                  required: true,
                  message: 'Please input your username!'
                }
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: 'Please input your Gmail!'
                },
                {
                  type: 'email',
                  message: 'Please enter a valid email !'
                }
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!'
                }
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item label="Birth Date" name="birthDate">
              <DatePicker format="DD-MM-YYYY" />
            </Form.Item>
            <Form.Item
              label="Student Code"
              name="studentCode"
              rules={[
                {
                  required: true,
                  message: 'Please input your student code!'
                }
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Expire"
              name="expire"
              rules={[
                {
                  required: true,
                  message: 'Please input your expire!'
                }
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Semester"
              name="semester"
              rules={[
                {
                  required: true,
                  message: 'Please input your semester!'
                }
              ]}
            >
              <Select placeholder="Select your class">
                <Select.Option value="classA">Class A</Select.Option>
                <Select.Option value="classB">Class B</Select.Option>
                <Select.Option value="classC">Class C</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="Class"
              name="class"
              rules={[
                {
                  required: true,
                  message: 'Please input your class!'
                }
              ]}
            >
              <Select placeholder="Select your class">
                <Select.Option value="semester1">Semester 1</Select.Option>
                <Select.Option value="semester2">Semester 2</Select.Option>
                <Select.Option value="semester3">Semester 3</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="Address" name="address">
              <Input />
            </Form.Item>
            <Form.Item label="Phone" name="phone">
              <Input />
            </Form.Item>
            <Form.Item
              label="Gender"
              name="gender"
              rules={[
                {
                  required: true,
                  message: 'Please input your gender!'
                }
              ]}
            >
              <Radio.Group>
                <Radio value="male">Male</Radio>
                <Radio value="female">Female</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item label="Avatar" name="avatar">
              <Input />
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </div>
  );
}

export default StudentManager;
