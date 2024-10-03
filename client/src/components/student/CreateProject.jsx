import { Form, Input } from 'antd';
import React, { useEffect, useState } from 'react';
import TopicList from '../common/TopicList';
import TextArea from 'antd/es/input/TextArea';
import Button from '../common/Button';
import { useNavigate } from 'react-router-dom';
import path from '../../utils/path';
import { toast } from 'react-toastify';

const CreateProject = () => {
  const [form] = Form.useForm();
  const [showTopic, setShowTopic] = useState(true);
  const navigate = useNavigate();
  const [showFormInput, setShowFormInput] = useState(false);
  useEffect(() => {
    setShowFormInput(!showTopic);
  }, [showTopic]);

  const [payloadProject, setPayloadProject] = useState({
    idTopic: '',
    projectName: '',
    className: 'se',
    description: ''
  });
  const [payloadGroup, setPayloadGroup] = useState({
    groupName: ''
  });

  const onFinish = values => {
    console.log('finish', values);
    handleSubmitProject(values);
  };

  const handleInputChange = e => {
    const { name, value } = e.target;
    name !== 'groupName'
      ? setPayloadProject(prev => ({
          ...prev,
          [name]: value
        }))
      : setPayloadGroup(value);
  };

  const handleSubmitProject = () => {
    navigate(`${path.STUDENT_GROUP}`);
    console.log(payloadProject);
    console.log(payloadGroup);
    toast.success('Create Project Successfully!');
  };

  return (
    <div className="w-full flex items-center justify-center bg-white p-5 rounded-md shadow-xl mx-auto">
      {showTopic && <TopicList setPayloadProject={setPayloadProject} setShowTopic={setShowTopic} />}
      {showFormInput && (
        <div className="w-4/5 flex flex-col gap-10 justify-center">
          <h1 className="text-3xl font-semibold text-center text-main-1">Project Form Create</h1>
          <Form name="form-create-project" initialValues={payloadProject} form={form} onFinish={onFinish}>
            <Form.Item name="idTopic">
              <Input placeholder="Number Topic" name="name" className="text-xl rounded-md" readOnly />
            </Form.Item>
            <Form.Item name="projectName">
              <Input placeholder="Project Name" name="projectName" className="text-xl rounded-md" readOnly />
            </Form.Item>
            <Form.Item name="className">
              <Input placeholder="Class" name="className" className="text-xl rounded-md" readOnly />
            </Form.Item>
            <Form.Item
              name="groupName"
              rules={[
                {
                  required: true,
                  message: 'Please input your group name!'
                }
              ]}
            >
              <Input
                placeholder="Group Name"
                name="groupName"
                className="text-xl rounded-md"
                onChange={handleInputChange}
              />
            </Form.Item>
            <Form.Item
              name="description"
              rules={[
                {
                  required: true,
                  message: 'Please input your description!'
                }
              ]}
            >
              <TextArea
                placeholder="Description"
                name="description"
                onChange={handleInputChange}
                className="rounded-md text-xl h-[20vh]"
                rows={5}
              />
            </Form.Item>
            <Form.Item>
              <Button
                fullWidth={'w-1/5'}
                bgColor="bg-main-1"
                bgHover="hover:bg-main-2"
                htmlType="submit" // Chuyển htmlType sang đây để xử lý form submit
                text={'Create'}
                textColor={'text-white'}
                textSize={'text-xl'}
              />
            </Form.Item>
          </Form>
        </div>
      )}
    </div>
  );
};

export default CreateProject;
