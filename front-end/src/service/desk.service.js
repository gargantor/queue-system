import axios from "axios";
import authHeader from "../service/auth-header";

const API_URL = process.env.REACT_APP_API_URL+"queue/";
//const API_SERVER = process.env.REACT_APP_API_URL;

class DesksService  {
    async ticketCount(services){
        return axios.post(API_URL+ 'getcount', {services}, { headers: await authHeader() })
    }
    async getCurrentTicket(deskID){
        return axios.post(API_URL+ 'getcurrentticket', {deskID}, { headers: await authHeader() })
    }
    async doneCall(currentTicket){
        return axios.post(API_URL+ 'setdone', {currentTicket}, { headers: await authHeader() })
    }
    async missedCall(currentTicket){
        return axios.post(API_URL+ 'setmissed', {currentTicket}, { headers: await authHeader() })
    }

    async nextCall(deskID, services, currentTicket=null){
        return axios.post(API_URL+ 'nextcall', {deskID, services, currentTicket}, { headers: await authHeader() })
    }
}

export default new DesksService();