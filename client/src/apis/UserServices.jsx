import axiosConfig from '../axiosConfig'

export const StudentLogin = (payload) => new Promise(async(resolve, reject) =>{
    try {
        const response = await axiosConfig({
            method: "post",
            url: "/api/login",
            data: payload
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})