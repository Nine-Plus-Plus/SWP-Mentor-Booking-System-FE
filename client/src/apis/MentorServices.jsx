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

export const updateMentor = (id, data, token) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: 'put',
        url: `api/admin/update-mentor/${id}`,
        data: data,
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(response);

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
        url: `api/admin/delete-user/${id}`,
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(response);

      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });

export const getClassByIdMentor = (id, token) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: 'get',
        url: `api/user/get-class-by-mentor/${id}`,
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });

export const getAllMentorByNameSkillDate = (name, skill, token) =>
  new Promise(async (resolve, reject) => {
    console.log(name, skill, token);

    try {
      const response = await axiosConfig({
        method: 'get',
        url: `api/user/get-mentor-by-name-skills/`,
        params: {
          name: name,
          skillIds: skill
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });
