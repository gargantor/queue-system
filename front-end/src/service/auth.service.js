import axios from "axios";
import countersService from "./counters.service";
import CountersService from "./counters.service";

const API_URL = process.env.REACT_APP_API_URL;

class AuthService {
    getRoles(){
        return axios.get(API_URL+'getroles');
    }

    login(username, password){
        return axios
            .post(API_URL + "auth/signin", {
                username,
                password
            })
            .then(response => {
                if(response.data.accessToken) {
                    localStorage.setItem("user", JSON.stringify(response.data));
                }

                return response;
            });
    }

    logout(){
        countersService.closeDesk()
        .then(
            response => {
                localStorage.removeItem("user");
            },
            error => {
                console.log(error);
            }
        )
        //localStorage.removeItem("user");
    }

    register(username, password, roles, fullname){
        return axios.post(API_URL + "auth/signup", {
            username,
            password,
            roles,
            fullname
        });
    }

    getCurrentUser(){
        return JSON.parse(localStorage.getItem("user"));
    }

    test(username, password, roles, fullname){
        return axios.post(API_URL + "signup", {
            username,
            password,
            roles,
            fullname
        });
    }

}

export default new AuthService();