import React, { createElement, useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { Modal, Button, Input, Form, List, Select, message } from 'antd';
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
import { getAllProjects } from '../../apis/ProjectServices';
import { getAllTasks, createTask, deleteTask, updateTask } from '../../apis/ProjectTaskServices';
import { useUserStore } from '../../store/useUserStore';

const ProgressChart = ({ percentage }) => {
  return (
    <div className="w-full md:w-[280px] p-4">
      <CircularProgressbar
        value={parseFloat(percentage)}
        text={`${percentage}%`}
        styles={buildStyles({
          textSize: '16px',
          pathColor: `rgba(62, 152, 199, ${percentage / 100})`,
          textColor: '#3e98c7',
          trailColor: '#d6d6d6'
        })}
      />
      <p className="flex justify-center mt-4 text-lg">{percentage}% Completed</p>
    </div>
  );
};

export const Progress = () => {
  const [tasks, setTasks] = useState([]);
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newTask, setNewTask] = useState({ taskName: '', description: '', status: 'Not Start' });
  const [openCreateTaskModal, setOpenCreateTaskModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState('Not Start');
  const [showAllTasks, setShowAllTasks] = useState(false);
  const [form] = Form.useForm();
  const { fullData } = useUserStore();

  useEffect(() => {
    const fetchTask = async () => {
      const token = localStorage.getItem('token');
      setLoading(true);
      try {
        const response = await getAllTasks(token);
        console.log('All task: ', response);
        if (response?.statusCode === 200) setTasks(response?.projectTasksDTOList);
        else {
          setTasks([]);
        }
      } catch (error) {
        setError(error.message || 'Đã xảy ra lỗi');
      } finally {
        setLoading(false);
      }
    };

    fetchTask();

    console.log('Test tasks: ', tasks);
  }, []);

  useEffect(() => {
    const fetchProject = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await getAllProjects(token);
        setProject(response?.projectsDTOList);
      } catch (error) {
        setError(error.message || 'Đã xảy ra lỗi');
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, []);

  const showCreateModal = () => {
    setOpenCreateTaskModal(true);
  };

  const handleCreateTask = async () => {
    const token = localStorage.getItem('token');
    try {
      const value = await form.validateFields();
      const createData = {
        // ...form.getFieldValue()
        // taskName: value??.taskName,
        // description: value??.description,
        // status: value?.status,
        ...form.getFieldsValue(),
        projects: {
          id: fullData?.groupDTO?.project?.id
        }
      };

      const response = await createTask(createData, token);
      console.log('Task created: ', response);

      if (response?.statusCode === 200) {
        setTasks([...tasks, response?.projectTasksDTO]);

        setOpenCreateTaskModal(false);
        message.success('Project Task created successfully');
      } else {
        message.error('Failed to create Project Task');
      }
    } catch (error) {
      console.error('Create Project Task error: ', error);
      message.error('Failed to create Project Task: ' + error.message);
    }
    // if (newTask?.taskName && newTask?.description) {
    //   setTasks([...tasks, { ...newTask, id: tasks?.length + 1 }]);
    //   setNewTask({ taskName: '', description: '', status: 'Not Start' });
    //   setOpenCreateTaskModal(false);
    //   toast.success('Task Createed successfully!', {
    //     autoClose: 500,
    //   });
    // }
  };

  const DeleteTask = async taskId => {
    try {
      const token = localStorage.getItem('token');
      const response = await deleteTask(taskId, token);

      if (response && response.statusCode === 200) {
        Swal.fire({
          title: 'Delete Successful!',
          text: `Your task has been deleted.`,
          icon: 'success',
          confirmButtonText: 'OK',
          timer: 3000, // Đóng sau 3 giây
          timerProgressBar: true // Hiển thị progress bar khi đếm thời gian
        });
        setStatus('CONFIRMED');
      } else toast.error(response?.message);
    } catch (error) {
      toast.error(error);
      console.log(error);
    }
  };

  const handleDeleteTask = async taskId  => {
    Swal.fire({
      title: 'Are you sure?',
      html: `Are you sure delete this task?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it',
      cancelButtonText: 'No!',
      reverseButtons: true // Đảo ngược vị trí của nút xác nhận và hủy
    }).then (result => {
      if (result.isConfirmed) {
        DeleteTask(taskId);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Delete', 'Delete Task!', 'error');
      }
    });
  }

  //   Swal.fire({
  //     title: 'Are you sure?',
  //     text: 'You won’t be able to revert this!',
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonColor: '#d33',
  //     cancelButtonColor: '#3085d6',
  //     confirmButtonText: 'Yes, delete it!'
  //   }).then(result => {
  //     if (result.isConfirmed) {

  //       Swal.fire('Deleted!', 'Your task has been deleted.', 'success');
  //       setSelectedTask(null);
  //       setOpenCreateTaskModal(false);
  //     }
  //   });
  // };

  // const handleDeleteTask = async taskId => {
  //   const token = localStorage.getItem('token');
  //   try {
  //     const response = await deleteTask(taskId, token);
  //     Swal.fire({
  //       title: 'Are you sure?',
  //       text: 'You won’t be able to revert this!',
  //       icon: 'warning',
  //       showCancelButton: true,
  //       confirmButtonColor: '#d33',
  //       cancelButtonColor: '#3085d6',
  //       confirmButtonText: 'Yes, delete it!'
  //     }).then(result => {
  //       if (result.isConfirmed) {
  //         if (response && response.statusCode === 200) {
  //           Swal.fire('Deleted!', 'Your task has been deleted.', 'success');
  //           setTasks(tasks?.filter(task => task.id !== taskId));
  //           setSelectedTask(null);
  //           setOpenCreateTaskModal(false);
  //         } else {
  //           message.error('Failed to delete Project task: ' + response.data.message);
  //           message.error('statusCode: ' + response.statusCode);
  //         }
  //       }
  //     });
  //   } catch (error) {
  //     console.error('Delete Project task error:', error);
  //     message.error('Failed to delete Project task: ' + error.message);
  //   }
  // };

  const calculateCompletionPercentage = () => {
    const completedTasks = tasks?.filter(task => task?.status === 'Done')?.length;
    return tasks?.length > 0 ? ((completedTasks / tasks?.length) * 100).toFixed(2) : 0.0;
  };

  const handleTaskClick = task => {
    setSelectedTask(task);
    setSelectedStatus(task?.status);
    setOpenCreateTaskModal(true);
  };

  const handleUpdateTask = async () => {
    const token = localStorage.getItem('token');
    // if (selectedTask) {
    //   setTasks(tasks.map(task => (task.id === selectedTask.id ? { ...selectedTask, status: selectedStatus } : task)));
    //   setSelectedTask(null);
    //   setOpenCreateTaskModal(false);
    //   toast.success('Task updated successfully!', {
    //     autoClose: 500
    //   });
    // }
    try {
      const value = await form.validateFields();
      const updateData = {
        ...form.getFieldsValue(),
        projects: {
          id: fullData?.groupDTO?.project?.id
        }
      };
      console.log('Updata data: ', updateData);
      const response = await updateTask(selectedTask.id, updateData, token);

      if (response && response.statusCode === 200) {
        setTasks(tasks.map(task => (task.id === response.projectTasksDTO.id ? response.projectTasksDTO : task)));
        setOpenCreateTaskModal(false);
        message.success('Mentor updated successfully');
      } else {
        message.error('Failed to update Project Task');
      }
    } catch (error) {
      console.error('Update mentor error:', error);
      message.error('Failed to update mentor: ' + error.message);
    }
  };

  const handleDeleteFromEdit = () => {
    if (selectedTask) {
      handleDeleteTask(selectedTask.id);
    }
  };

  const toggleViewAll = () => {
    setShowAllTasks(!showAllTasks);
  };

  return (
    <div className="flex-col">
      {/* Team Progress Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white p-8 rounded-lg shadow-lg">
        {/* Total Projects */}
        <div className="border border-2 border-sky-500 p-4 rounded-2xl shadow-lg bg-white">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold">Total Task</h3>
            <p className="text-right text-blue-500 font-medium">Excellent Work</p>
          </div>
          <p className="text-2xl font-semibold">{tasks?.length}</p>
        </div>

        {/* Task Done */}
        <div className="border border-2 border-emerald-500 p-4 rounded-2xl shadow-lg bg-white">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold">Task Done</h3>
            <p className="text-right text-green-500 font-medium">High Priority</p>
          </div>
          <p className="text-2xl font-semibold">
            {tasks?.filter(task => task?.status === 'Done')?.length}/{tasks?.length} Completed
          </p>
        </div>

        {/* Task in Progress */}
        <div className="border border-2 border-yellow-500 p-4 rounded-2xl shadow-lg bg-white">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold">Task in Progress</h3>
            <p className="text-right text-yellow-500 font-medium">In Progress</p>
          </div>
          <p className="text-2xl font-semibold">
            {tasks?.filter(task => task?.status === 'In Progress')?.length}/{tasks?.length} Running
          </p>
        </div>
      </div>

      <div className="flex gap-3 pt-5">
        {/* Today's Task Section */}
        <div className="bg-white p-8 rounded-lg shadow-lg w-2/3">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Project's Task</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {tasks?.slice(0, showAllTasks ? tasks?.length : 3)?.map(
              (task, index) =>
                task && (
                  <div
                    key={task.id || index} // Sử dụng `index` làm key dự phòng nếu `task.id` bị thiếu
                    className="border p-6 rounded-lg shadow-lg bg-white"
                    onClick={() => handleTaskClick(task)}
                  >
                    <h3 className="text-xl text-red-500 font-bold mb-2">{task?.taskName}</h3>
                    <p className="text-sm text-gray-400 mb-4">
                      Date Created: {task?.dateCreated ? new Date(task?.dateCreated).toLocaleDateString() : 'Unknown'}
                    </p>
                    <p className="mb-4 text-ellipsis overflow-hidden whitespace-nowrap">{task?.description}</p>
                    <div className="flex space-x-4 mt-4">
                      <div
                        className={`flex flex-col items-center w-full ${
                          task?.status === 'Not Start' ? 'bg-gray-400 text-white rounded-lg' : ''
                        }`}
                      >
                        Not Start
                      </div>
                      <div
                        className={`flex flex-col items-center w-full ${
                          task?.status === 'In Progress' ? 'bg-yellow-500 text-white rounded-lg' : ''
                        }`}
                      >
                        In Progress
                      </div>
                      <div
                        className={`flex flex-col items-center w-full ${
                          task?.status === 'Done' ? 'bg-green-500 text-white rounded-lg' : ''
                        }`}
                      >
                        Done
                      </div>
                    </div>
                  </div>
                )
            )}

            {/* Create Task Button */}
            <div className="border p-6 rounded-lg shadow-lg flex items-center justify-center bg-white">
              <button className="text-blue-500 font-semibold" onClick={showCreateModal}>
                + Create Task
              </button>
            </div>
          </div>

          {tasks?.length > 3 && (
            <div className="flex justify-center mt-4">
              <button className="text-blue-500 font-semibold" onClick={toggleViewAll}>
                {showAllTasks ? 'View Less' : 'View All'}
              </button>
            </div>
          )}

          {/* Modal chỉnh sửa và thêm task */}
          <Modal
            title={selectedTask ? 'Edit Task' : 'Create Task'}
            open={openCreateTaskModal}
            onCancel={() => {
              setOpenCreateTaskModal(false);
              setSelectedTask(null);
            }}
            footer={[
              <Button
                key="cancel"
                onClick={() => {
                  setOpenCreateTaskModal(false);
                  setSelectedTask(null);
                }}
              >
                Cancel
              </Button>,
              selectedTask && (
                <Button key="delete" onClick={handleDeleteFromEdit} type="primary" danger>
                  Delete
                </Button>
              ),
              <Button key="submit" type="primary" onClick={selectedTask ? handleUpdateTask : handleCreateTask}>
                {selectedTask ? 'Save Changes' : 'Create Task'}
              </Button>
            ]}
          >
            <Form form={form} layout="vertical">
              <Form.Item
                label="TaskName"
                name="taskName"
                rules={[
                  {
                    required: true,
                    message: 'Please input task name!'
                  }
                ]}
              >
                <Input
                // value={selectedTask ? selectedTask?.taskName : newTask?.taskName}
                // onChange={e => {
                //   if (selectedTask) {
                //     setSelectedTask({ ...selectedTask, taskName: e.target.value });
                //   } else {
                //     setNewTask({ ...newTask, taskName: e.target.value });
                //   }
                // }}
                />
              </Form.Item>
              <Form.Item
                label="Description"
                name="description"
                rules={[
                  {
                    required: true,
                    message: 'Please input task description!'
                  }
                ]}
              >
                <Input.TextArea
                // value={selectedTask ? selectedTask?.description : newTask?.description}
                // onChange={e => {
                //   if (selectedTask) {
                //     setSelectedTask({ ...selectedTask, description: e.target.value });
                //   } else {
                //     setNewTask({ ...newTask, description: e.target.value });
                //   }
                // }}
                />
              </Form.Item>
              <Form.Item label="Status">
                <Select
                  value={selectedTask ? selectedStatus : newTask.status}
                  onChange={value => {
                    if (selectedTask) {
                      setSelectedStatus(value);
                    } else {
                      setNewTask({ ...newTask, status: value });
                    }
                  }}
                >
                  <Select.Option value="Not Start">Not Start</Select.Option>
                  <Select.Option value="In Progress">In Progress</Select.Option>
                  <Select.Option value="Done">Done</Select.Option>
                </Select>
              </Form.Item>
            </Form>
          </Modal>
        </div>

        {/* Progress Chart Section */}
        <div className="w-1/3">
          {/* Overall Progress (Progress Bar) */}
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Overall Progress</h2>
            <div className="flex justify-center items-center  p-8">
              <ProgressChart percentage={calculateCompletionPercentage()} />
            </div>
          </div>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Progress;
