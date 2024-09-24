import axiosConfig from '../axiosConfig'

export const fetchUser = () => new Promise(async (resolve, reject) => { 
    try {
        const response = await axiosConfig({
            method: "get",
            url: "/api/users?page=1",
        })
        console.log(response)
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

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