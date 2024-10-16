import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { toast, ToastContainer } from 'react-toastify';
import { Modal, Form, Input, DatePicker, Space, Button } from 'antd';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';
import dayjs from 'dayjs'; // Nhớ import dayjs ở đầu file
import {
  createSchedule,
  deleteScheduleById,
  getAllScheduleByIdMentor,
  updateSchedule
} from '../../apis/ScheduleServices';
import { useUserStore } from '../../store/useUserStore';

const localizer = momentLocalizer(moment);
const { RangePicker } = DatePicker;

const Schedule = () => {
  const [events, setEvents] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [dateRange, setDateRange] = useState([null, null]);
  const [error, setError] = useState(null);
  const { userData } = useUserStore();

  const onOk = value => {
    console.log('onOk: ', value);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    const fetchAllScheduleOfMentor = async () => {
      try {
        const response = await getAllScheduleByIdMentor(userData.id, token);

        if (response && response?.statusCode === 200) {
          const formattedEvents = response.mentorScheduleDTOList.map(schedule => ({
            id: schedule.id,
            title: 'Available',
            start: dayjs(schedule.availableFrom, 'DD-MM-YYYY HH:mm').toDate(),
            end: dayjs(schedule.availableTo, 'DD-MM-YYYY HH:mm').toDate()
          }));
          setEvents(formattedEvents);
        } else {
          setEvents([]);
        }
      } catch (error) {
        setError(error?.message || 'Đã xảy ra lỗi');
      }
    };

    fetchAllScheduleOfMentor();
  }, [userData]);

  // Hàm xử lý khi chọn khoảng thời gian mới
  const handleSelect = ({ start, end }) => {
    setIsEditing(false);
    setSelectedEvent({ start, end });
    form.setFieldsValue({
      range: [dayjs(start), dayjs(end)]
    });
    setDateRange([dayjs(start), dayjs(end)]);
    setIsModalVisible(true);
  };

  // Hàm xử lý khi chọn sự kiện
  const handleSelectEvent = event => {
    console.log(event);

    setIsEditing(true);
    setSelectedEvent(event);
    form.setFieldsValue({
      title: event.title,
      range: [dayjs(event.start), dayjs(event.end)]
    });
    setDateRange([dayjs(event.start), dayjs(event.end)]);
    setIsModalVisible(true);
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem('token');
    const data = {
      mentor: {
        id: userData.id
      },
      availableFrom: dateRange[0].format('DD-MM-YYYY HH:mm'),
      availableTo: dateRange[1].format('DD-MM-YYYY HH:mm')
    };
    try {
      if (!isEditing) {
        const response = await createSchedule(data, token);
        console.log(response);
        const added = {
          id: response.mentorScheduleDTO.id,
          title: 'Available',
          start: dayjs(response.mentorScheduleDTO.availableFrom, 'DD-MM-YYYY HH:mm').toDate(),
          end: dayjs(response.mentorScheduleDTO.availableTo, 'DD-MM-YYYY HH:mm').toDate()
        };
        if (response && response?.statusCode === 200) {
          toast.success('Event created successfully', {
            autoClose: 500
          });
          setEvents([...events, added]);
        } else {
          toast.error('Event create successfully' + response.data.message, {
            autoClose: 500
          });
        }
      } else {
        const response = await updateSchedule(selectedEvent.id, data, token);
        const updated = {
          id: response?.mentorScheduleDTO?.id,
          title: 'Available',
          start: dayjs(response?.mentorScheduleDTO?.availableFrom, 'DD-MM-YYYY HH:mm').toDate(),
          end: dayjs(response?.mentorScheduleDTO?.availableTo, 'DD-MM-YYYY HH:mm').toDate()
        };
        if (response && response?.statusCode === 200) {
          toast.success('Event update successfully!', {
            autoClose: 5000
          });
          setEvents(events.map(event => (event.id === updated.id ? updated : event)));

          // Thêm sự kiện mới vào danh sách
        } else {
          toast.error('Failed to create event: ' + response.data.message, {
            autoClose: 5000
          });
        }
      }
      handleModalCancel();
    } catch (error) {
      console.error('Schedule handling error:', error);
      toast.error('An error occurred: ' + error);
    }
  };

  const handleDelete = async id => {
    const token = localStorage.getItem('token');
    try {
      const response = await deleteScheduleById(id, token);
      if (response && response?.statusCode === 200) {
        toast.success('Event deleted successfully', {
          autoClose: 500
        });
        setEvents(prevEvents => prevEvents.filter(event => event.id !== id));
      } else {
        toast.error('Event deleted successfully' + response.data.message, {
          autoClose: 500
        });
      }
      handleModalCancel(); // Đóng modal sau khi xóa
    } catch (error) {
      console.error('Delete Schedule error:', error);
      message.error('Failed to delete Schedule: ' + error.message);
    }
  };

  // Hàm đóng modal và đặt lại các trường trong form
  const handleModalCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setDateRange([null, null]);
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">Schedule</h1>
      {/* <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        selectable
        onSelectSlot={handleSelect} // Xử lý chọn khoảng thời gian
        onSelectEvent={handleSelectEvent} // Xử lý chọn sự kiện
      /> */}
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        selectable
        onSelectSlot={handleSelect}
        onSelectEvent={handleSelectEvent}
        eventPropGetter={event => {
          const now = new Date();
          if (event.end < now) {
            return { className: 'bg-gray-500 text-white opacity-50' }; // Sự kiện đã qua sẽ có màu xám và mờ
          }
          return {};
        }}
      />
      <Modal
        title={isEditing ? 'Edit Event' : 'New Event'}
        open={isModalVisible}
        onCancel={handleModalCancel}
        footer={null}
      >
        <Form form={form} onFinish={handleSubmit} initialValues={{ title: 'Available' }}>
          <Form.Item
            name="title"
            label="Event Title"
            rules={[{ required: true, message: 'Please input the event title!' }]}
          >
            <Input disabled />
          </Form.Item>
          <Form.Item
            name="range"
            label="Event Duration"
            rules={[{ type: 'array', required: true, message: 'Please select time!' }]}
          >
            <RangePicker
              showTime={{
                format: 'HH:mm'
              }}
              format="DD-MM-YYYY HH:mm"
              onChange={(value, dateString) => {
                setDateRange(value);
              }}
              onOk={onOk}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {isEditing ? 'Save' : 'Add'}
            </Button>

            {isEditing && (
              <Button
                className="ml-2 bg-red-600 text-white hover:bg-red-700"
                onClick={() =>
                  Swal.fire({
                    title: 'Are you sure?',
                    text: 'Do you want to delete this event?',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, delete it!'
                  }).then(result => {
                    handleDelete(selectedEvent.id);
                  })
                }
              >
                Delete
              </Button>
            )}
            <Button className="ml-2" onClick={handleModalCancel}>
              Cancel
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Schedule;
