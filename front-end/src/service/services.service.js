import axios from "axios";
import authHeader from "../service/auth-header";

const API_URL = process.env.REACT_APP_API_URL+"services/";

class ServicesService {
    async getServices(){
        return axios.get(API_URL , { headers: await authHeader() });        
    }

    async create(name, status){        
        return axios.post(API_URL + 'create', {
            name,
            status
        }, { headers: await authHeader() });

    }

    async findOne(id){
        return axios.get(API_URL + 'edit/'+id, { headers: await authHeader() });
    }

    async edit(name, status, id){        
        return axios.post(API_URL + 'edit/'+id, {
            name,
            status
        }, { headers: authHeader() });

    }

    async delete(id){
        return axios.delete(API_URL + 'delete/'+ id, { headers: await authHeader() });
    }

}
export default new ServicesService();