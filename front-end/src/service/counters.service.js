import axios from "axios";
import authHeader from "../service/auth-header";

const API_URL = process.env.REACT_APP_API_URL+"counters/";

class CountersService  {
    async getAll(){
        return axios.get(API_URL , { headers: await authHeader() });        
    }

    async create(name, counter_code, status, services){        
        return axios.post(API_URL + 'create', {
            name,
            status,
            counter_code,
            services
        }, { headers: await authHeader() });

    }

    async findOne(id){
        return axios.get(API_URL + 'edit/'+id, { headers: await authHeader() });
    }

    async edit(name, counter_code, status, id, services){        
        return axios.post(API_URL + 'edit/'+id, {
            name,
            status,
            counter_code,
            services
        }, { headers: await authHeader() });

    }

    async delete(id){
        return axios.delete(API_URL + 'delete/'+ id, { headers: await authHeader() });
    }

    async availableDesk(){
        return axios.get(API_URL + 'available', { headers: await authHeader() });
    }

    async selectDesk(deskId){
        return axios.post(API_URL + 'selectdesk', {deskId}, {headers: await authHeader() });
    }

    async checkChosenDesk(){
        return axios.get(API_URL + 'checkchoosen', { headers: await authHeader() })
    }
    async closeDesk(){
        return axios.post(API_URL + 'closedesk', {},{ headers: await authHeader() })
    }
    

}
export default new CountersService();