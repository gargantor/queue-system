import axios from "axios";
import authHeader from "../service/auth-header";

const API_URL = process.env.REACT_APP_API_URL+"kiosk/";

class kioskService {

    getServices(){
        return axios.get(API_URL + 'get-service', { headers: authHeader()})
    }

    makeTicket(serviceId){
        return axios.post(API_URL + 'make-ticket', {serviceId}, {headers: authHeader()})
    }

}
export default new kioskService();