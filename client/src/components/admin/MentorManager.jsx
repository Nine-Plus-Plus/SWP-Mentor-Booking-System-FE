import { Button, DatePicker, Form, Input, InputNumber, message, Modal, Radio, Select, Table, Tag } from 'antd';
import React, { useEffect, useState } from 'react';
import { createMentor, deleteMentor, getAllMentors, updateMentor } from '../../apis/MentorServices';
import { getAllSemester } from '../../apis/SemesterServices';
import { getAllSkill } from '../../apis/SkillServices';
import dayjs from 'dayjs';
import { colors } from '../../utils/constant';

const MentorManager = () => {
  const [mentors, setMentors] = useState([]);
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [form] = Form.useForm();
  const { Option } = Select;

  useEffect(() => {
    const fetchMentors = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await getAllMentors(token);
        console.log(response);

        setMentors(response.mentorsDTOList);
      } catch (err) {
        setError(err.message || 'Đã xảy ra lỗi');
      } finally {
        setLoading(false);
      }
    };

    fetchMentors();
  }, []);

  useEffect(() => {
    const fetchSkill = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await getAllSkill(token);
        setSkills(response.data.skillsDTOList);
      } catch (err) {
        setError(err.message || 'Đã xảy ra lỗi');
      } finally {
        setLoading(false);
      }
    };
    fetchSkill();
  }, []);

  // Create Mentor
  const showCreateModal = () => {
    setSelectedMentor(null);
    form.resetFields();
    setIsCreateModalVisible(true);
  };

  const handleCreateMentor = async () => {
    const token = localStorage.getItem('token');
    try {
      const values = await form.validateFields();
      const createData = {
        ...form.getFieldsValue(),
        birthDate: dayjs(values.birthDate).format('YYYY-MM-DD'),
        skills: form.getFieldsValue().skills.map(skillId => ({ id: skillId }))
      };

      const response = await createMentor(createData, token);
      console.log(response);

      if (response && response.statusCode === 200) {
        setMentors(prevMentors => [
          ...prevMentors,
          {
            ...response.mentorsDTO, // Dữ liệu mentor mới
            skills: response.mentorsDTO.skills.map(skill => {
              // Tìm kỹ năng từ state
              const skillDetail = skills.find(s => s.id === skill.id);
              return skillDetail ? { id: skillDetail.id, skillName: skillDetail.skillName } : skill;
            })
          }
        ]);
        setIsCreateModalVisible(false);
        message.success('Mentor created successfully');
      } else {
        message.error('Failed to create mentor');
      }
    } catch (error) {
      console.error('Create mentor error:', error);
      message.error('Failed to create mentor: ' + error.message);
    }
  };

  const handleUpdate = async () => {
    const token = localStorage.getItem('token');
    try {
      const values = await form.validateFields();
      const updateData = { ...form.getFieldsValue(), birthDate: dayjs(values.birthDate).format('YYYY-MM-DD') };
      const response = await updateMentor(selectedMentor.id, updateData, token);

      if (response && response.statusCode === 200) {
        // Cập nhật lại danh sách người dùng với thông tin mới
        // setMentors(
        //   mentors.map(mentor => (mentor.id === response.mentorsDTOList.id ? response.mentorsDTOList : mentor))
        // );
        setIsUpdateModalVisible(false);
        message.success('Mentor updated successfully');
      } else {
        message.error('Failed to update mentor');
      }
    } catch (error) {
      console.error('Update mentor error:', error);
      message.error('Failed to update mentor: ' + error.message);
    }
  };

  const handleDelete = async mentorId => {
    const token = localStorage.getItem('token');
    try {
      const response = await deleteMentor(mentorId, token);

      if (response && response.statusCode === 200) {
        message.success('Mentor deleted successfully');
        setMentors(prevMentors => prevMentors.filter(mentor => mentor.id !== mentorId)); // Cập nhật danh sách người dùng
      } else {
        message.error('Failed to delete mentor: ' + response.data.message);
      }
    } catch (error) {
      console.error('Delete mentor error:', error);
      message.error('Failed to delete mentor: ' + error.message);
    }
  };

  const handleCancelCreate = () => {
    form.resetFields();
    setIsCreateModalVisible(false);
  };

  const handleCancelUpdate = () => {
    form.resetFields();
    setIsUpdateModalVisible(false);
  };

  const showUpdateModal = mentor => {
    setSelectedMentor(mentor);
    form.setFieldsValue({
      fullName: mentor.fullName,
      username: mentor.username,
      email: mentor.email,
      passsword: mentor.passsword,
      skillName: mentor.skillName,
      totalTimeRemain: mentor.totalTimeRemain,
      star: mentor.star,
      birthDate: mentor.birthDate,
      address: mentor.address,
      phone: mentor.phone,
      gender: mentor.gender,
      avatar: mentor.avatar
    });
    setIsUpdateModalVisible(true);
  };

  const columns = [
    {
      title: 'No',
      dataIndex: 'no',
      key: 'no',
      render: (text, record, index) => index + 1
    },
    {
      title: 'Avarta',
      dataIndex: ['user', 'avatar'],
      key: 'avatar'
    },
    {
      title: 'Full Name',
      dataIndex: ['user', 'fullName'],
      key: 'fullName'
    },
    {
      title: 'Email',
      dataIndex: ['user', 'email'],
      key: 'email'
    },
    {
      title: 'Birth Date',
      dataIndex: ['user', 'birthDate'],
      key: 'birthDate'
    },
    {
      title: 'Mentor Code',
      dataIndex: ['mentorCode'],
      key: 'mentorCode'
    },
    {
      title: 'Skill',
      dataIndex: 'skills',
      key: 'skills',
      render: skills => (
        <>
          {skills?.map((skill, index) => (
            <Tag color={colors[skill.id % colors.length]} key={skill.id}>
              {skill.skillName}
            </Tag>
          ))}
        </>
      )
    },
    {
      title: 'Phone',
      dataIndex: ['user', 'phone'],
      key: 'phone'
    },
    {
      title: 'Star',
      dataIndex: 'star',
      key: 'star'
    },
    {
      title: 'Time-Remaining',
      dataIndex: 'totalTimeRemain',
      key: 'totalTimeRemain'
    },
    {
      title: 'Gender',
      dataIndex: ['user', 'gender'],
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
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Mentor List</h1>
      <Button type="primary" onClick={showCreateModal} style={{ marginBottom: '10px' }}>
        Create Mentor
      </Button>
      <Table columns={columns} bordered dataSource={mentors} rowKey="id" pagination={{ pageSize: 10 }} />

      {/* Modal for updating mentor */}
      <Modal title="Update Mentor" open={isUpdateModalVisible} onOk={handleUpdate} onCancel={handleCancelUpdate}>
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
              label="Star"
              name="star"
              rules={[
                {
                  required: true,
                  message: 'Please select a star rating!'
                }
              ]}
            >
              <Select placeholder="Select a star rating">
                <Select.Option value={1}>1 Star</Select.Option>
                <Select.Option value={2}>2 Stars</Select.Option>
                <Select.Option value={3}>3 Stars</Select.Option>
                <Select.Option value={4}>4 Stars</Select.Option>
                <Select.Option value={5}>5 Stars</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="Total Time Remain"
              name="totalTimeRemain"
              rules={[
                {
                  required: true,
                  message: 'Please input the total time remaining!'
                },
                {
                  type: 'number',
                  message: 'Please enter a valid number!',
                  transform: value => Number(value) // Chuyển đổi giá trị đầu vào thành số
                },
                {
                  validator: (_, value) => {
                    if (value < 0) {
                      return Promise.reject(new Error('Total time remaining must be greater than zero!'));
                    }
                    return Promise.resolve();
                  }
                }
              ]}
            >
              <InputNumber min={0} />
            </Form.Item>
            <Form.Item label="Birth Date" name="birthDate">
              <DatePicker format="DD-MM-YYYY" />
            </Form.Item>
            <Form.Item
              label="Mentor Code"
              name="mentorCode"
              rules={[
                {
                  required: true,
                  message: 'Please input your mentor code!'
                }
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item label="Skill" name="skills">
              <Select mode="multiple" placeholder="Select skills" style={{ width: '100%' }}>
                {skills?.map(skill => (
                  <Option key={skill.id} value={skill.id}>
                    {skill.skillName}
                  </Option>
                ))}
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
                <Radio value="MALE">Male</Radio>
                <Radio value="FEMALE">Female</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item label="Avatar" name="avatar">
              <Input />
            </Form.Item>
          </Form>
        </div>
      </Modal>

      {/* Modal for creating mentor */}
      <Modal title="Create mentor" open={isCreateModalVisible} onOk={handleCreateMentor} onCancel={handleCancelCreate}>
        <div className="max-h-96 overflow-y-auto p-5">
          <Form form={form} layout="vertical" initialValues={{ gender: 'MALE' }}>
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
              label="Mentor Code"
              name="mentorCode"
              rules={[
                {
                  required: true,
                  message: 'Please input your mentor code!'
                }
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item label="Skill" name="skills">
              <Select mode="multiple" placeholder="Select skills" style={{ width: '100%' }}>
                {skills?.map(skill => (
                  <Option key={skill.id} value={skill.id}>
                    {skill.skillName}
                  </Option>
                ))}
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
                <Radio value="MALE">Male</Radio>
                <Radio value="FEMALE">Female</Radio>
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
};

export default MentorManager;
