import axiosConfig from '../axiosConfig';

export const getAllSkill = token =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: 'get',
        url: 'api/user/get-all-skills',
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
