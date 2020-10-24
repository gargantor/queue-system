import React, { useEffect } from 'react';
import adminlteHelper from '../helper/adminlte.helper';
//import { createAuthProvider } from "../helper/auth.helper";

export default function NoPages() {
    /*
    const {useAuth, authFetch, login, logout} = createAuthProvider()
    const [logged] = useAuth();
    const test = () => {        
        console.log(logged);
        
    }
    const Dashboard = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        authFetch('/posts')
            .then(r => r.json())
            .then(_posts => setPosts(_posts))
    }, []);

    return <div>
        {posts.map(post => <div key={post.id}>
            {post.message}
        </div>)}
    </div>
    };
    */
    
    useEffect(() => {
        document.body.classList.add('error-page');
        adminlteHelper.fixLoginRegisterHeight();
        
        return () => {
            document.body.classList.remove('error-page');
        };
    }, []);
  return (
    <div className="error-page vcenter-box">        
        <h2 className="headline text-warning"> 404</h2>    
        <div className="error-content">
            <h3 className="text-center"><i className="fas fa-exclamation-triangle text-warning" /> Oops! Page not found.</h3>    
            <p className="text-center">We could not find the page you were looking for.</p>                 
        </div>            
    </div>

  );
}
