import axios from 'axios';
import axiosConfig from '../axiosConfig';

export const StudentLogin = payload =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await axiosConfig({
                method: 'post',
                url: '/api/auth/login',
                data: payload
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });

// Phương thức lấy profile từ token
export const getMyProfile = token =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await axiosConfig({
                method: 'get',
                url: '/api/user/get-my-profile',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            resolve(response.data);
        } catch (error) {
            reject(error);
        }
    });

// Phương thức lấy tất cả người dùng
export const getAllUsers = token =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await axiosConfig({
                method: 'get',
                url: 'api/admin/get-all-users',
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
export const getUserById = (id, token) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await axiosConfig({
                method: 'get',
                url: `/admin/get-user-by-id/${id}`,
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

export const updateUser = (id, data, token) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await axiosConfig({
                method: 'put',
                url: `/admin/update-user/${id}`,
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
export const deleteUser = (id, token) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await axiosConfig({
                method: 'delete',
                url: `api/admin/delete-user/${id}`,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            resolve(response.data);
        } catch (error) {
            reject(error);
        }
    });
