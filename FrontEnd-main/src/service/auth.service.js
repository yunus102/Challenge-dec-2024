import conf from "../conf/conf.js";
import axios from "axios";


export class AuthService {
    async createAccount({ data, navigate }){
        try {
            const response = await axios.post(`https://backend-1-fgxb.onrender.com/api/v1/user/register`, data);
            if (response.data.statusCode === 200) {    
                localStorage.setItem('accessToken', response.data.data.accessToken);
                localStorage.setItem('refreshToken', response.data.data.refreshToken)
                navigate('/login')
            }
        } catch (error) {
            throw error;
        }
    }

    async login({data, navigate}){
        try {
            console.log(data)
            const response = await axios.post(`https://backend-1-fgxb.onrender.com/api/v1/user/login`, data);
            if (response.data.statusCode === 200) {
                localStorage.setItem('accessToken', response.data.data.accessToken);
                localStorage.setItem('refreshToken', response.data.data)
                navigate('/analytics')
            }
            return response.data
        } catch (error) {
            throw error
        }
    }

    async getCurrentUser(){
        try {
            
        } catch (error) {
            throw error
        }
    }

    async logout(){
        try {
            
        } catch (error) {
            throw error
        }
    }

    async getEmails(){
        try {
            const response = await axios.get(`https://backend-1-fgxb.onrender.com/api/v1/emails/all`);
            return response.data
        } catch (error) {
            throw error
        }
    }

    async fetchEmailDetail(id){
        try {
            const response = await axios.get(`https://backend-1-fgxb.onrender.com/api/v1/email/detail/${id}`)
            return response.data
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    async toggleFavorite(id){
        try {
            const response = await axios.get(`https://backend-1-fgxb.onrender.com/api/v1/favourite/${id}`)
            console.log(response.data.favourite)

            return response.data
        } catch (error) {
            throw error
        }
    }
}

const authService = new AuthService();

export default authService