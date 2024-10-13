import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { toast, ToastContainer } from 'react-toastify';
import { Modal, Form, Input, DatePicker, Space, Button } from 'antd';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';

const localizer = momentLocalizer(moment);
const { RangePicker } = DatePicker;

const Schedule = () => {
  const [events, setEvents] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  // Trạng thái cho khoảng thời gian đã chọn
  const [dateRange, setDateRange] = useState([null, null]);

  const onOk = value => {
    console.log('onOk: ', value);
  };

  // Hàm xử lý khi chọn khoảng thời gian mới
  const handleSelect = ({ start, end }) => {
    setIsEditing(false); // Không phải là chế độ chỉnh sửa
    setSelectedEvent({ start, end }); // Lưu thông tin sự kiện
    form.setFieldsValue({
      title: 'Lỗi hoài mệt ghê', // Đặt tiêu đề rỗng khi tạo mới
      range: [moment(start), moment(end)] // Đặt khoảng thời gian
    });
    setDateRange([moment(start), moment(end)]); // Cập nhật khoảng thời gian
    setIsModalVisible(true); // Mở modal
  };

  // Hàm xử lý khi chọn sự kiện
  const handleSelectEvent = event => {
    setIsEditing(true); // Chế độ chỉnh sửa
    setSelectedEvent(event); // Lưu thông tin sự kiện được chọn
    form.setFieldsValue({
      title: event.title, // Đặt tiêu đề sự kiện
      range: [moment(event.start), moment(event.end)] // Đặt khoảng thời gian
    });
    setDateRange([moment(event.start), moment(event.end)]); // Cập nhật khoảng thời gian
    setIsModalVisible(true); // Mở modal
  };

  // Hàm xử lý xóa sự kiện
  const handleDelete = event => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this event?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(result => {
      if (result.isConfirmed) {
        // Lọc sự kiện để xóa
        setEvents(events.filter(e => e !== event));
        toast.success('Event deleted successfully', {
          autoClose: 500
        });
        handleModalCancel(); // Đóng modal sau khi xóa
      }
    });
  };
  
  const onFinish = values => {
    const { title, range } = values;

    const newEvent = {
      title,
      start: range[0].toDate(), // Chuyển đổi thời gian bắt đầu
      end: range[1].toDate() // Chuyển đổi thời gian kết thúc
    };

    // Kiểm tra xung đột với các sự kiện hiện có
    const isConflict = events.some(
      event =>
        event !== selectedEvent &&
        moment(newEvent.start).isBefore(event.end) &&
        moment(newEvent.end).isAfter(event.start)
    );

    // Nếu có xung đột, thông báo lỗi
    if (isConflict) {
      toast.error('Event time conflicts with an existing event!', { autoClose: 500 });
      return;
    }

    // Cập nhật danh sách sự kiện
    if (isEditing) {
      setEvents(events.map(event => (event === selectedEvent ? newEvent : event)));
      toast.success('Event updated successfully', {
        autoClose: 600
      });
    } else {
      setEvents([...events, newEvent]); // Thêm sự kiện mới
      toast.success('Event added successfully', {
        autoClose: 600
      });
    }

    // Đóng modal và đặt lại các trường trong form
    setIsModalVisible(false);
    form.resetFields();
    setDateRange([null, null]);
  };

  // Hàm đóng modal và đặt lại các trường trong form
  const handleModalCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setDateRange([null, null]);
  };

  // Hàm xử lý thay đổi khoảng thời gian
  const handleRangeChange = value => {
    setDateRange(value);
    form.setFieldsValue({ range: value });
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">Schedule</h1>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        selectable
        onSelectSlot={handleSelect} // Xử lý chọn khoảng thời gian
        onSelectEvent={handleSelectEvent} // Xử lý chọn sự kiện
      />

      <Modal
        title={isEditing ? 'Edit Event' : 'New Event'}
        open={isModalVisible}
        onCancel={handleModalCancel}
        footer={null}
      >
        <Form form={form} onFinish={onFinish}>
          <Form.Item
            name="title"
            label="Event Title"
            rules={[{ required: true, message: 'Please input the event title!' }]}
          >
            <Input />
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
                format="YYYY-MM-DD HH:mm"
                onChange={(value, dateString) => {
                  console.log('Selected Time: ', value);
                  console.log('Formatted Selected Time: ', dateString);
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
                onClick={() => handleDelete(selectedEvent)}
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

      {/* Hiển thị thông báo */}
      <ToastContainer />
    </div>
  );
};

export default Schedule;
