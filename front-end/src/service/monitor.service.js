import axios from "axios";
import authHeader from "../service/auth-header";

const API_URL = process.env.REACT_APP_API_URL+"monitor/";

class monitorService {

    getAudio(){
        return axios.get(API_URL + 'getaudio', { headers: authHeader()})
    }
    getTicket(id){
        return axios.post(API_URL + 'get-ticket',{id}, { headers: authHeader()})
    }


}
export default new monitorService();