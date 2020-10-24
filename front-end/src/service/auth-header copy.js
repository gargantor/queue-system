import axios from "axios";
export default async function authHeader(){
    //UserHeader();    
    const user = JSON.parse(localStorage.getItem("user"));
    if(user && user.accessToken){
        //return { Authorization: 'Bearer ' + user.accessToken };
        // for Node.js Express back-end
        return { 'x-access-token': user.accessToken }

    }else{
        return {}
    }
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
    try {
        let user = JSON.parse(localStorage.getItem("user"));
        if(user && user.accessToken){
            console.log('access token found');
            if (isExpired(getExpirationDate(user.accessToken))) {
                console.log("isExpired");
                const accessToken = user.accessToken;
                const response = await axios.post('http://localhost:8080/auth/update-token', {accessToken} )
                if(response.data){
                    console.log(response.data.accessToken);
                    user={...user,
                        accessToken:response.data.accessToken,
                    }
                    console.log(user);
                    localStorage.removeItem("user");
                    //localStorage.setItem("user", JSON.stringify(response.data));
                    localStorage.setItem("user", JSON.stringify(user));
                    console.log({'x-access-token': response.data.accessToken});
                    return { 'x-access-token': response.data.accessToken }
                    //console.log(user);
                }
                else{
                    localStorage.removeItem("user");
                    //console.log("hayoo");
                }                
                
            }else{
                console.log('not expired');
                //return { Authorization: 'Bearer ' + user.accessToken };
                // for Node.js Express back-end
                return { 'x-access-token': user.accessToken }
            }

        }else{
            return {}
        }
      //const response = await axios.get('/user?ID=12345');
      //console.log(response);
    } catch (error) {
      console.error(error);
    }
  }