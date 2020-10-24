import axios from "axios";
import authHeader from "../service/auth-header";

const API_URL = process.env.REACT_APP_API_URL+"users/";

class UsersService {
    async getAll(){
        return axios.get(API_URL , { headers: await authHeader() });        
    }

    async create(username, email, name, address, roles, password){        
        return axios.post(API_URL + 'create', {
            username, 
            email, 
            name, 
            address, 
            roles, 
            password
        }, { headers: await authHeader() });

    }

    async findOne(id){
        return axios.get(API_URL + 'edit/'+id, { headers: await authHeader() });
    }

    async edit(id, email, name, address, roles,){        
        return axios.post(API_URL + 'edit/'+id, {             
            email, 
            name, 
            address, 
            roles
        }, { headers: await authHeader() });

    }
    async getProfile(id){        
        return axios.post(API_URL + 'profile/',{id}, { headers: await authHeader() });

    }
    async profileUpdate(id, email, name, address){        
        return axios.post(API_URL + 'profile-update/', { 
            id,            
            email, 
            name, 
            address,             
        }, { headers: await authHeader() });

    }
    async passwordUpdate(id, password){        
        return axios.post(API_URL + 'password-update/', { 
            id,            
            password            
        }, { headers: await authHeader() });

    }

    async delete(id){
        return axios.delete(API_URL + 'delete/'+ id, { headers: await authHeader() });
    }

}
export default new UsersService();