import axiosConfig from '../axiosConfig';

export const getAllMentors = token =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: 'get',
        url: 'api/admin/get-all-mentors',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });

export const createMentor = (data, token) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: 'post',
        url: 'api/admin/create-mentor',
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

export const updateMentor = (data, id, token) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: 'post',
        url: `api/admin/update-mentor-by-id/${id}`,
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

export const deleteMentor = (id, token) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: 'delete',
        url: `api/admin/delete-mentor-by-id/${id}`,
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });
