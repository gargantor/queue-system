import React, { useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import helper from "../helper/adminlte.helper";
import authService from '../service/auth.service';
import makeToast from "../helper/Toaster";

import ValidateForm from "../helper/validateForm";


const ValidateLogin = (values) => {
    let errors = {}    
    if(!values.username){
        errors.username = "Username is required";
    }
    if(!values.password){
        errors.password = "Password is required"
    }
    return errors;
}

export default function LoginPage(props) {            
    const {values, errors, handleChange, handleSubmit} = ValidateForm(handleLogin, ValidateLogin);

    function handleLogin(e) {        
        authService.login(values.username, values.password)
            .then(response => { 
                console.log(response.data);            
                makeToast("success", "welcome " + response.data.username);
                //return <Redirect to="/" />   
                props.history.push("/");
            }).catch((err) => {  
                console.log(err);
                makeToast("error", err.response.data.message);
            })
    }
    useEffect(() => {
        document.body.classList.add('login-page');
        helper.fixLoginRegisterHeight();
        
        return () => {
            document.body.classList.remove('login-page');
        };
    }, []);
    
  return (
    <div className="login-box">
        <div className="login-logo">
            <b>Admin</b>LTE
        </div>
        {/* /.login-logo */}
        <div className="card">
            <div className="card-body login-card-body">
            <p className="login-box-msg">Sign in to start your session</p>
            <form onSubmit={handleSubmit}>
                <div className="input-group mb-3">
                    <input 
                        type="text" 
                        className={`form-control ${errors.username ? 'is-invalid' : '' }`}
                        //className='form-control'
                        placeholder="Username" 
                        onChange={handleChange}
                        name='username'
                        value={values.username || ''}
                    />
                    <div className="input-group-append">
                        <div className="input-group-text">
                        <span className="fas fa-user" />
                        </div>
                    </div>
                    {errors.username &&
                        <span className="error invalid-feedback">{errors.username ? errors.username : "not valid"}</span>                
                    }
                </div>
                <div className="input-group mb-3">
                    <input 
                        type="password" 
                        className={`form-control ${errors.password && 'is-invalid' }`}
                        //className='form-control'
                        placeholder="Password"
                        onChange={handleChange}
                        name='password'
                        value={values.password || ''}
                    />
                    <div className="input-group-append">
                        <div className="input-group-text">
                        <span className="fas fa-lock" />
                        </div>
                    </div>
                    {errors.password &&
                        <span className="error invalid-feedback">{errors.password ? errors.password : "not valid"}</span>                
                    }
                </div>
                <div className="row">
                <div className="col-8">
                    <div className="icheck-primary">
                    <input type="checkbox" id="remember" />
                    <label htmlFor="remember">
                        Remember Me
                    </label>
                    </div>
                </div>
                {/* /.col */}
                <div className="col-4">
                    <button type="submit" className="btn btn-primary btn-block">Sign In</button>
                </div>
                {/* /.col */}
                </div>
            </form>
            {/* /.social-auth-links */}
            
            <p className="mb-0">
                <Link to='/register' className="text-center">Register a new membership</Link>                
            </p>
            </div>
            {/* /.login-card-body */}
        </div>
    </div>

  );
}
