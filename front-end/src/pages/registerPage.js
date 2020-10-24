import React, { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import adminlteHelper from '../helper/adminlte.helper';
import authService from '../service/auth.service';
import makeToast from "../helper/Toaster";

import ValidateForm from "../helper/validateForm";

const ValidateRegister = (values) => {
    let errors = {}    
    /*if(!values.fullname){
        errors.fullname = "Name is required";
    }*/
    if(!values.username){
        errors.username = "Username is required"
    } else if (values.username.length < 3){
        errors.username = "Username minimal containt 3 character"
    }
    if(!values.password){
        errors.password = "Password is required"
    }
    if(!values.passwordConfirm){
        errors.passwordConfirm = "Please Re-type password"
    } else if (values.passwordConfirm !== values.password) {
        errors.passwordConfirm = "Password not match"
    }
    return errors;
  }



export default function RegisterPage(props) {
    const [defRoles, setdefRoles] = useState([]);
    const {values, errors, handleChange, handleSubmit} = ValidateForm(handleRegister, ValidateRegister);

    function handleRegister (e) {
        //e.preventDefault();
        //console.log('register');
        
        authService.register(values.username, values.password, values.roles, values.fullname)
            .then(response => { 
                console.log(response.data);            
                makeToast("success", response.data.message);
                //return <Redirect to="/login" />
                props.history.push("/login");
            }).catch((err) => {                
                makeToast("error", err.response.data.message);
            })

    }      

    const getRoles = () => {
        authService.getRoles()
            .then(
                response => {
                    console.log(response.data);
                    setdefRoles(response.data);
                },
                error => {
                    //console.log("alert alert");
                }
            );
        
    }    
    useEffect(() => {
        getRoles();
        document.body.classList.add('register-page');
        adminlteHelper.fixLoginRegisterHeight();
        return () => {
            document.body.classList.remove('register-page')
        };
    }, [])
  return (
    <div className="register-box">
        <div className="register-logo">
            <b>Admin</b>LTE 
        </div>
        <div className="card">
            <div className="card-body register-card-body">
            <p className="login-box-msg">Register a new membership</p>
            
            <form onSubmit={handleSubmit} >
                <div className="input-group mb-3 is-invalid">
                    <input 
                        type="text"                     
                        className={`form-control ${errors.fullname && 'is-invalid' }`}
                        placeholder="Full name" 
                        onChange={handleChange}
                        name='fullname'  
                        value={values.fullname || ''}
                    />
                    <div className="input-group-append">
                        <div className="input-group-text">
                        <span className="fas fa-id-card" />
                        </div>
                    </div>
                    {errors.fullname &&
                        <span className="error invalid-feedback">{errors.fullname ? errors.fullname : "not valid"}</span>                
                    }
                
                </div>
                <div className="input-group mb-3">
                    <input 
                        type="text" 
                        className={`form-control ${errors.username && 'is-invalid' }`}
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
                <div className="form-group mb-3">
                    <label>Select Roles</label>
                    {<select 
                        className='custom-select'
                        multiple={true} 
                        name="roles" 
                        onChange={handleChange} 
                        value={values.roles || []}  
                        size="3"                                         
                    >
                        {defRoles.map((role, index) =>(
                            <option key={index} value={role.name}>{role.name}</option>
                        ))}
                        </select>}
                </div>
                <div className="input-group mb-3">
                    <input 
                        type="password" 
                        className={`form-control ${errors.password && 'is-invalid' }`}
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
                <div className="input-group mb-3">
                    <input 
                        type="password" 
                        className={`form-control ${errors.passwordConfirm && 'is-invalid' }`}
                        placeholder="Retype password" 
                        onChange={handleChange}
                        name='passwordConfirm'
                        value={values.passwordConfirm || ''}
                    />
                    <div className="input-group-append">
                        <div className="input-group-text">
                        <span className="fas fa-lock" />
                        </div>
                    </div>
                    {errors.passwordConfirm &&
                        <span className="error invalid-feedback">{errors.passwordConfirm ? errors.passwordConfirm : "not valid"}</span>                
                    }
                </div>
                <button type="submit" className="btn btn-primary btn-block">Register</button>                  
            </form>
            <p className="mb-0">
                <Link to='/login' className="text-center">already have a membership</Link>                
            </p>
            </div>
            {/* /.form-box */}
        </div>{/* /.card */}
    </div>

  );
}
