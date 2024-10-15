// import React, { useState } from 'react';
// import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
// import { Modal, Button, Input, Form, List, Select } from 'antd';
// import Swal from 'sweetalert2';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-circular-progressbar/dist/styles.css';
// import 'react-toastify/dist/ReactToastify.css';

// const ProgressChart = ({ percentage }) => {
//   return (
//     <div className="w-full md:w-[280px] p-4">
//       <CircularProgressbar
//         value={parseFloat(percentage)}
//         text={`${percentage}%`}
//         styles={buildStyles({
//           textSize: '16px',
//           pathColor: `rgba(62, 152, 199, ${percentage / 100})`,
//           textColor: '#3e98c7',
//           trailColor: '#d6d6d6'
//         })}
//       />
//       <p className="flex justify-center mt-4 text-lg">{percentage}% Completed</p>
//     </div>
//   );
// };

// export const Progress = () => {
//   const [tasks, setTasks] = useState([]);
//   const [newTask, setNewTask] = useState({ taskName: '', description: '', status: 'Not Start' });
//   const [openAddTaskModal, setOpenAddTaskModal] = useState(false);
//   const [selectedTask, setSelectedTask] = useState(null);
//   const [selectedStatus, setSelectedStatus] = useState('Not Start');

//   const showAddTaskModal = () => {
//     setOpenAddTaskModal(true);
//   };

//   const handleAddTask = () => {
//     if (newTask.taskName && newTask.description) {
//       setTasks([...tasks, { ...newTask, id: tasks.length + 1 }]);
//       setNewTask({ taskName: '', description: '', status: 'Not Start' });
//       setOpenAddTaskModal(false);
//       toast.success('Task added successfully!', {
//         autoClose: 500
//       });
//     }
//   };

//   const handleDeleteTask = taskId => {
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
//         setTasks(tasks.filter(task => task.id !== taskId)); // Xóa task
//         Swal.fire('Deleted!', 'Your task has been deleted.', 'success');
//         setSelectedTask(null); // Đặt lại selectedTask
//         setOpenAddTaskModal(false); // Đóng modal sau khi xóa
//       }
//     });
//   };

//   <ToastContainer autoClose={500} />;

//   const calculateCompletionPercentage = () => {
//     const completedTasks = tasks.filter(task => task.status === 'Done').length;
//     return tasks.length > 0 ? ((completedTasks / tasks.length) * 100).toFixed(2) : 0.0;
//   };

//   const handleTaskClick = task => {
//     setSelectedTask(task);
//     setSelectedStatus(task.status);
//     setOpenAddTaskModal(true); // Mở modal khi chọn task
//   };

//   const handleUpdateTask = () => {
//     if (selectedTask) {
//       setTasks(tasks.map(task => (task.id === selectedTask.id ? { ...selectedTask, status: selectedStatus } : task)));
//       setSelectedTask(null);
//       setOpenAddTaskModal(false); // Đóng modal sau khi cập nhật
//       toast.success('Task updated successfully!', {
//         autoClose: 500
//       });
//       // Hiển thị thông báo khi sửa task thành công
//     }
//   };

//   const handleDeleteFromEdit = () => {
//     if (selectedTask) {
//       handleDeleteTask(selectedTask.id); // Gọi hàm xóa
//     }
//   };

//   return (
//     <div className="flex-col">
//       {/* Team Progress Section */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white p-8 rounded-lg shadow-lg">
//         {/* Total Projects */}
//         <div className="border border-2 border-sky-500 p-4 rounded-2xl shadow-lg bg-white">
//           <div className="flex justify-between items-center">
//             <h3 className="text-xl font-bold">Total Task</h3>
//             <p className="text-right text-blue-500 font-medium">Excellent Work</p>
//           </div>
//           <p className="text-2xl font-semibold">{tasks.length}</p>
//         </div>

//         {/* Task Done */}
//         <div className="border border-2 border-emerald-500 p-4 rounded-2xl shadow-lg bg-white">
//           <div className="flex justify-between items-center">
//             <h3 className="text-xl font-bold">Task Done</h3>
//             <p className="text-right text-green-500 font-medium">High Priority</p>
//           </div>
//           <p className="text-2xl font-semibold">
//             {tasks.filter(task => task.status === 'Done').length}/{tasks.length} Completed
//           </p>
//         </div>

//         {/* Task in Progress */}
//         <div className="border border-2 border-yellow-500 p-4 rounded-2xl shadow-lg bg-white">
//           <div className="flex justify-between items-center">
//             <h3 className="text-xl font-bold">Task in Progress</h3>
//             <p className="text-right text-yellow-500 font-medium">In Progress</p>
//           </div>
//           <p className="text-2xl font-semibold">
//             {tasks.filter(task => task.status === 'In Progress').length}/{tasks.length} Running
//           </p>
//         </div>
//       </div>

//       <div className="flex gap-3 pt-5">
//         {/* Today's Task Section */}
//         <div className="bg-white p-8 rounded-lg shadow-lg w-2/3">
//           <h2 className="text-2xl font-bold text-gray-800 mb-6">Project's Task</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//             {/* Task 1 */}
//             {tasks.map(task => (
//               <div
//                 key={task.id}
//                 className="border p-6 rounded-lg shadow-lg bg-white"
//                 onClick={() => handleTaskClick(task)}
//               >
//                 <div className="flex space-x-2 mb-4">
//                   {/* <span className="bg-blue-100 text-blue-600 px-3 py-1 text-xs font-semibold rounded-full">Design</span>
//                   <span className="bg-yellow-100 text-yellow-600 px-3 py-1 text-xs font-semibold rounded-full">
//                     Apps
//                   </span> */}
//                 </div>
//                 <h3 className="text-xl font-bold mb-2">{task.taskName}</h3>
//                 <p className="text-sm text-gray-400 mb-4">Created: {new Date().toLocaleDateString()}</p>
//                 <p className="mb-4 text-ellipsis overflow-hidden whitespace-nowrap">{task.description}</p>

//                 {/* <p className="text-gray-500 mb-4">Works with: Team A</p> */}
//                 <div className="flex space-x-4 mt-4">
//                   <div className="flex flex-col items-center w-full">
//                     <span
//                       className={`text-black-500 mb-4 p-2 rounded-lg ${
//                         task.status === 'Not Start' ? 'bg-gray-400 text-white' : 'bg-transparent'
//                       }`}
//                     >
//                       Not Start
//                     </span>
//                   </div>

//                   <div className="flex flex-col items-center w-full">
//                     <span
//                       className={`text-black-500 mb-4 p-2 rounded-lg ${
//                         task.status === 'In Progress' ? 'bg-yellow-500 text-white' : 'bg-transparent'
//                       }`}
//                     >
//                       In Progress
//                     </span>
//                   </div>

//                   <div className="flex flex-col items-center w-full">
//                     <span
//                       className={`text-black-500 mb-4 p-2 rounded-lg ${
//                         task.status === 'Done' ? 'bg-green-500 text-white' : 'bg-transparent'
//                       }`}
//                     >
//                       Done
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             ))}

//             {/* Add Task Button */}
//             <div className="border p-6 rounded-lg shadow-lg flex items-center justify-center bg-white">
//               <button className="text-blue-500 font-semibold" onClick={showAddTaskModal}>
//                 + Add Task
//               </button>
//             </div>
//           </div>

//           {/* Modal chỉnh sửa và thêm task */}
//           <Modal
//             title={selectedTask ? 'Edit Task' : 'Add Task'}
//             open={openAddTaskModal}
//             onCancel={() => {
//               setOpenAddTaskModal(false);
//               setSelectedTask(null); // Reset selectedTask khi đóng modal
//             }}
//             footer={[
//               <Button
//                 key="cancel"
//                 onClick={() => {
//                   setOpenAddTaskModal(false);
//                   setSelectedTask(null); // Reset selectedTask khi đóng modal
//                 }}
//               >
//                 Cancel
//               </Button>,
//               selectedTask && (
//                 <Button key="delete" onClick={handleDeleteFromEdit} type="primary" danger>
//                   Delete
//                 </Button>
//               ),
//               <Button key="submit" type="primary" onClick={selectedTask ? handleUpdateTask : handleAddTask}>
//                 {selectedTask ? 'Save Changes' : 'Add Task'}
//               </Button>
//             ]}
//           >
//             <Form layout="vertical">
//               <Form.Item label="Task Name">
//                 <Input
//                   value={selectedTask ? selectedTask.taskName : newTask.taskName}
//                   onChange={e => {
//                     if (selectedTask) {
//                       setSelectedTask({ ...selectedTask, taskName: e.target.value });
//                     } else {
//                       setNewTask({ ...newTask, taskName: e.target.value });
//                     }
//                   }}
//                 />
//               </Form.Item>
//               <Form.Item label="Description">
//                 <Input.TextArea
//                   value={selectedTask ? selectedTask.description : newTask.description}
//                   onChange={e => {
//                     if (selectedTask) {
//                       setSelectedTask({ ...selectedTask, description: e.target.value });
//                     } else {
//                       setNewTask({ ...newTask, description: e.target.value });
//                     }
//                   }}
//                 />
//               </Form.Item>
//               <Form.Item label="Status">
//                 <Select
//                   value={selectedTask ? selectedStatus : newTask.status}
//                   onChange={status => {
//                     if (selectedTask) {
//                       setSelectedStatus(status);
//                     } else {
//                       setNewTask({ ...newTask, status });
//                     }
//                   }}
//                 >
//                   <Select.Option value="Not Start">Not Start</Select.Option>
//                   <Select.Option value="In Progress">In Progress</Select.Option>
//                   <Select.Option value="Done">Done</Select.Option>
//                 </Select>
//               </Form.Item>
//             </Form>
//           </Modal>
//         </div>

//         <div className="flex-col w-1/3">
//           {/* Progress Chart Section */}
//           <div className="bg-white p-8 rounded-lg shadow-lg">
//             <h2 className="text-2xl font-bold text-gray-800 mb-6">Overall Progress</h2>
//             <div className="flex justify-center items-center  p-8">
//               <ProgressChart percentage={calculateCompletionPercentage()} />
//             </div>
//           </div>

//           {/* Meeting Schedule */}
//           {/* <div className="gap-3 pt-5">
//             <div className="flex-col bg-white rounded-lg shadow-lg p-8">
//               <h2 className="text-2xl font-bold text-gray-800 mb-6">Meeting Schedule</h2>
//               <div className="border p-4 rounded-lg bg-white">
//                 <p className="text-lg font-semibold">Product Weekly Design</p>
//                 <p className="text-gray-500">04/04/2024 - 16:00 WIB</p>
//                 <p className="text-blue-500">Gmeet Conference</p>
//               </div>
//             </div>
//           </div> */}
//         </div>
//       </div>

//       <ToastContainer />
//     </div>
//   );
// };
// export default Progress;


import React, { useState } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { Modal, Button, Input, Form, List, Select } from 'antd';
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';

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
          trailColor: '#d6d6d6',
        })}
      />
      <p className="flex justify-center mt-4 text-lg">{percentage}% Completed</p>
    </div>
  );
};

export const Progress = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ taskName: '', description: '', status: 'Not Start' });
  const [openAddTaskModal, setOpenAddTaskModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState('Not Start');
  const [showAllTasks, setShowAllTasks] = useState(false); // Thêm trạng thái cho View All

  const showAddTaskModal = () => {
    setOpenAddTaskModal(true);
  };

  const handleAddTask = () => {
    if (newTask.taskName && newTask.description) {
      setTasks([...tasks, { ...newTask, id: tasks.length + 1 }]);
      setNewTask({ taskName: '', description: '', status: 'Not Start' });
      setOpenAddTaskModal(false);
      toast.success('Task added successfully!', {
        autoClose: 500,
      });
    }
  };

  const handleDeleteTask = (taskId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won’t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        setTasks(tasks.filter((task) => task.id !== taskId));
        Swal.fire('Deleted!', 'Your task has been deleted.', 'success');
        setSelectedTask(null);
        setOpenAddTaskModal(false);
      }
    });
  };

  const calculateCompletionPercentage = () => {
    const completedTasks = tasks.filter((task) => task.status === 'Done').length;
    return tasks.length > 0 ? ((completedTasks / tasks.length) * 100).toFixed(2) : 0.0;
  };

  const handleTaskClick = (task) => {
    setSelectedTask(task);
    setSelectedStatus(task.status);
    setOpenAddTaskModal(true);
  };

  const handleUpdateTask = () => {
    if (selectedTask) {
      setTasks(
        tasks.map((task) =>
          task.id === selectedTask.id ? { ...selectedTask, status: selectedStatus } : task
        )
      );
      setSelectedTask(null);
      setOpenAddTaskModal(false);
      toast.success('Task updated successfully!', {
        autoClose: 500,
      });
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
          <p className="text-2xl font-semibold">{tasks.length}</p>
        </div>

        {/* Task Done */}
        <div className="border border-2 border-emerald-500 p-4 rounded-2xl shadow-lg bg-white">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold">Task Done</h3>
            <p className="text-right text-green-500 font-medium">High Priority</p>
          </div>
          <p className="text-2xl font-semibold">
            {tasks.filter((task) => task.status === 'Done').length}/{tasks.length} Completed
          </p>
        </div>

        {/* Task in Progress */}
        <div className="border border-2 border-yellow-500 p-4 rounded-2xl shadow-lg bg-white">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold">Task in Progress</h3>
            <p className="text-right text-yellow-500 font-medium">In Progress</p>
          </div>
          <p className="text-2xl font-semibold">
            {tasks.filter((task) => task.status === 'In Progress').length}/{tasks.length} Running
          </p>
        </div>
      </div>

      <div className="flex gap-3 pt-5">
        {/* Today's Task Section */}
        <div className="bg-white p-8 rounded-lg shadow-lg w-2/3">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Project's Task</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {tasks.slice(0, showAllTasks ? tasks.length : 3).map((task) => (
              <div
                key={task.id}
                className="border p-6 rounded-lg shadow-lg bg-white"
                onClick={() => handleTaskClick(task)}
              >
                <h3 className="text-xl text-red-500 font-bold mb-2">{task.taskName}</h3>
                <p className="text-sm text-gray-400 mb-4">Created: {new Date().toLocaleDateString()}</p>
                <p className="mb-4 text-ellipsis overflow-hidden whitespace-nowrap">{task.description}</p>
                <div className="flex space-x-4 mt-4">
                  <div className={`flex flex-col items-center w-full ${task.status === 'Not Start' ? 'bg-gray-400 text-white rounded-lg' : ''}`}>
                    Not Start
                  </div>
                  <div className={`flex flex-col items-center w-full ${task.status === 'In Progress' ? 'bg-yellow-500 text-white rounded-lg' : ''}`}>
                    In Progress
                  </div>
                  <div className={`flex flex-col items-center w-full ${task.status === 'Done' ? 'bg-green-500 text-white rounded-lg' : ''}`}>
                    Done
                  </div>
                </div>
              </div>
            ))}

            {/* Add Task Button */}
            <div className="border p-6 rounded-lg shadow-lg flex items-center justify-center bg-white">
              <button className="text-blue-500 font-semibold" onClick={showAddTaskModal}>
                + Add Task
              </button>
            </div>
          </div>

          {tasks.length > 3 && (
            <div className="flex justify-center mt-4">
              <button className="text-blue-500 font-semibold" onClick={toggleViewAll}>
                {showAllTasks ? 'View Less' : 'View All'}
              </button>
            </div>
          )}

          {/* Modal chỉnh sửa và thêm task */}
          <Modal
            title={selectedTask ? 'Edit Task' : 'Add Task'}
            open={openAddTaskModal}
            onCancel={() => {
              setOpenAddTaskModal(false);
              setSelectedTask(null);
            }}
            footer={[
              <Button
                key="cancel"
                onClick={() => {
                  setOpenAddTaskModal(false);
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
              <Button key="submit" type="primary" onClick={selectedTask ? handleUpdateTask : handleAddTask}>
                {selectedTask ? 'Save Changes' : 'Add Task'}
              </Button>,
            ]}
          >
            <Form layout="vertical">
              <Form.Item label="Task Name">
                <Input
                  value={selectedTask ? selectedTask.taskName : newTask.taskName}
                  onChange={(e) => {
                    if (selectedTask) {
                      setSelectedTask({ ...selectedTask, taskName: e.target.value });
                    } else {
                      setNewTask({ ...newTask, taskName: e.target.value });
                    }
                  }}
                />
              </Form.Item>
              <Form.Item label="Description">
                <Input.TextArea
                  value={selectedTask ? selectedTask.description : newTask.description}
                  onChange={(e) => {
                    if (selectedTask) {
                      setSelectedTask({ ...selectedTask, description: e.target.value });
                    } else {
                      setNewTask({ ...newTask, description: e.target.value });
                    }
                  }}
                />
              </Form.Item>
              <Form.Item label="Status">
                <Select
                  value={selectedTask ? selectedStatus : newTask.status}
                  onChange={(value) => {
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
          <div className='bg-white p-8 rounded-lg shadow-lg'>
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
