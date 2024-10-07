import { Button, Form, Input, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { getAllSkill } from '../../apis/SkillServices';

const SkillManager = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchSkills = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await getAllSkill(token);
        setSkills(response.data.skillsDTOList);
        setSkills(
          response.data.skillsDTOList.map(skill => ({
            ...skill,
            dateCreated: dayjs(skill.dateCreated).format('HH:mm DD-MM-YYYY'),
            dateUpdate: dayjs(skill.dateCreated).format('HH:mm DD-MM-YYYY')
          }))
        );
      } catch (err) {
        setError(err.message || 'Đã xảy ra lỗi');
      } finally {
        setLoading(false);
      }
    };
    fetchSkills();
  }, []);

  const showCreateModal = () => {
    setSelectedSkill(null); // Không chọn user nào vì đang tạo mới
    form.resetFields(); // Xóa các giá trị trong form
    setIsCreateModalVisible(true); // Hiển thị modal tạo người dùng
  };

  const columns = [
    {
      title: 'No',
      dataIndex: 'no',
      key: 'no',
      render: (text, record, index) => index + 1
    },
    {
      title: 'Skill Name',
      dataIndex: 'skillName',
      key: 'skillName'
    },
    {
      title: 'Email',
      dataIndex: 'skillDescription',
      key: 'skillDescription'
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

  return (
    <div className="w-full h-full bg-gray-100 p-2">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Skill List</h1>
      <Button type="primary" onClick={showCreateModal} style={{ marginBottom: '10px' }}>
        Create Skill
      </Button>
      <Table columns={columns} bordered dataSource={skills} rowKey="id" pagination={{ pageSize: 10 }} />

      {/* Modal for updating skill */}
      {/* <Modal title="Update Student" open={isUpdateModalVisible} onOk={handleUpdate} onCancel={handleCancelUpdate}>
        <div className="max-h-96 overflow-y-auto p-5">
          <Form form={form} layout="vertical">
            <Form.Item
              label="Skill Name"
              name="skillName"
              rules={[
                {
                  required: true,
                  message: 'Please input your skill name!'
                }
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Skill Description"
              name="skillDescription"
              rules={[
                {
                  required: true,
                  message: 'Please input your skill description!'
                }
              ]}
            >
              <Input />
            </Form.Item>
          </Form>
        </div>
      </Modal> */}

      {/* Modal for creating skill */}
      {/* <Modal title="Create Skill" open={isCreateModalVisible} onOk={handleCreateSkill} onCancel={handleCancelCreate}>
        <div className="max-h-96 overflow-y-auto p-5">
          <Form form={form} layout="vertical">
            <Form.Item
              label="Skill Name"
              name="skillName"
              rules={[
                {
                  required: true,
                  message: 'Please input your skill name!'
                }
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Skill Description"
              name="skillDescription"
              rules={[
                {
                  required: true,
                  message: 'Please input your skill description!'
                }
              ]}
            >
              <Input />
            </Form.Item>
          </Form>
        </div>
      </Modal> */}
    </div>
  );
};

export default SkillManager;
