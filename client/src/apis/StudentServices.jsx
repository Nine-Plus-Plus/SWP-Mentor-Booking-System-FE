import axiosConfig from '../axiosConfig';

// Phương thức lấy tất cả người dùng
export const getStudents = token =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: 'get',
        url: 'api/admin/get-all-students',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(response);
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
// Phương thức lấy người dùng bằng id
export const getStudentById = (id, token) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: 'get',
        url: `api/admin/get-student-by-id/${id}`,
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });
// Phương thức cập nhập người dùng

export const updateStudent = (id, data, token) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: 'put',
        url: `api/admin/update-student-by-id/${id}`,
        data: data,
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });

// Phương thức xóa người dùng
export const deleteStudent = (id, token) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: 'delete',
        url: `api/admin/delete-student-by-id/${id}`,
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });

// Phương thức thêm người dùng
export const createStudent = (data, token) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: 'post',
        url: `api/admin/create-student`,
        data: data,
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });
