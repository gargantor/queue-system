import axios from "axios";
import authHeader from "./auth-header";

const API_URL = process.env.REACT_APP_API_URL+"settings/";
//const API_SERVER = process.env.REACT_APP_API_URL;

class DesksService  {
    async resetCounter(){
        return axios.get(API_URL+ 'reset-count', { headers: await authHeader() })
    }
    async getCounter(){
        return axios.get(API_URL+ 'get-count', { headers: await authHeader() })
    }
    
}

export default new DesksService();