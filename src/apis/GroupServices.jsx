import axiosConfig from '../axiosConfig';

export const getAllGroup = token =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: 'get',
        url: `api/user/get-all-groups`,
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });

export const getAllGroupBySemesterId = (id, token) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: 'get',
        url: `api/admin/get-groups-in-semester/${id}`,
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });

export const getGroupByClassId = (id, token) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: 'get',
        url: `api/user/get-groups-in-class/${id}`,
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });

export const getGroupById = (id, token) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: 'get',
        url: `api/user/get-group-by-id/${id}`,
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });

export const updateGroup = (id, data, token) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: 'put',
        data: data,
        url: `api/student/update-group/${id}`,
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });

export const createGroup = (data, token) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: 'post',
        data: data,
        url: `api/student/create-group`,
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });

export const addNewMember = (id, data, token) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: 'post',
        data: data,
        url: `api/user/add-new-group-member/${id}`,
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });

export const removeMember = (id, data, token) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: 'delete',
        data: data,
        url: `api/student/remove-group-member/${id}`,
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });

export const uploadFilegroup = (data, token) =>
  new Promise(async (resolve, reject) => {
    const formData = new FormData();
    formData.append('group', new Blob([JSON.stringify(data.group)], { type: 'application/json' }));
    formData.append('file', data.file);
    try {
      const response = await axiosConfig({
        method: 'post',
        url: 'api/user/upload',
        data: formData,
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
