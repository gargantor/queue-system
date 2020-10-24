import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;
export default async function authHeader(){
    return UserHeader()
    /*const user = JSON.parse(localStorage.getItem("user"));
    if(user && user.accessToken){
        //return { Authorization: 'Bearer ' + user.accessToken };
        // for Node.js Express back-end
        //console.log(user.accessToken);
        return { 'x-access-token': user.accessToken }
    } else {
        return {}
    }*/
}
const isExpired = (exp?: number) => {
    if (!exp) {
        return false;
    }

    return Date.now() > exp;
};
const getExpirationDate = (jwtToken?: string): number | null => {
    if (!jwtToken) {
        return null;
    }

    const jwt = JSON.parse(atob(jwtToken.split('.')[1]));        

    // multiply by 1000 to convert seconds into milliseconds
    return jwt && jwt.exp && jwt.exp * 1000 || null;
};
async function UserHeader() {
    let user = JSON.parse(localStorage.getItem("user"));
    if(user && user.accessToken){
        if (isExpired(getExpirationDate(user.accessToken))) {
            console.log("isExpired");
            const accessToken = user.accessToken;
            const response = await axios.post(API_URL+'auth/update-token', {accessToken} )
            if(response.data){
                user={...user,
                    accessToken:response.data.accessToken,
                }
                localStorage.setItem("user", JSON.stringify(user));
                return { 'x-access-token': response.data.accessToken }
                
            }else{
                localStorage.removeItem("user");
                window.location.reload();
            }
            //return { 'x-access-token': user.accessToken }
            return { 'x-access-token': response.data.accessToken }

        }else{
            return { 'x-access-token': user.accessToken }
        }
        
    } else {
        return {}
    }
  }