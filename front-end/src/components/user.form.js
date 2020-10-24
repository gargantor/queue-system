import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import ValidateForm from '../helper/validateForm';
import authService from '../service/auth.service';

export default function UserForm(props) {    
    const {values, errors, handleChange, handleSubmit} = ValidateForm(props.callback, props.validate, props.initialValues);    
    const [defRoles, setdefRoles] = useState(["user", "moder", "admin"]);
    let roleValue = [];
    const getRoles = () => {
        authService.getRoles()
            .then(
                response => {
                    //console.log(response.data);
                    setdefRoles(response.data);
                },
                error => {
                    //console.log("alert alert");
                }
            );
        
    }  
    useEffect(() => { 
        getRoles();
    }, [])
    const BackButton = withRouter((props) => (
        <button onClick={() => {props.history.push('/dashboard/users')}} className="btn btn-danger mx-3" type="button"><i className="fa fa-fw fa-lg fa-times-circle"></i> Cancel</button>        
    ));
  return (
    <>   
    <form onSubmit={handleSubmit}>
        <div className="form-group">
            <label>Username</label>
            <input 
                type="text" 
                className={`form-control ${errors.username && 'is-invalid' }`}
                placeholder="Name" 
                name="username"
                value={values.username || ''}
                onChange={handleChange}
                disabled={props.isEditing}
                
            />
            {errors.name &&
                <span className="error invalid-feedback">{errors.name ? errors.name : "not valid"}</span>                
            }
        </div>
        <div className="form-group">
            <label>Email</label>
            <input 
                type="text" 
                className={`form-control ${errors.name && 'is-invalid' }`}
                placeholder="Email" 
                name="email"
                value={values.email || ''}
                onChange={handleChange}
            />
            {errors.name &&
                <span className="error invalid-feedback">{errors.email ? errors.email : "not valid"}</span>                
            }
        </div>
        <div className="form-group">
            <label>Name</label>
            <input 
                type="text" 
                className={`form-control ${errors.name && 'is-invalid' }`}
                placeholder="Name" 
                name="name"
                value={values.name || ''}
                onChange={handleChange}
            />
            {errors.name &&
                <span className="error invalid-feedback">{errors.name ? errors.name : "not valid"}</span>                
            }
        </div>
        <div className="form-group">
            <label>Address</label>
            <textarea
                className={`form-control ${errors.address && 'is-invalid' }`}
                placeholder="Address" 
                name="address"
                onChange={handleChange}
                value={values.address || ''}
            ></textarea>            
            {errors.name &&
                <span className="error invalid-feedback">{errors.address ? errors.address : "not valid"}</span>                
            }
        </div>
        <div className="form-group mb-3">
            <label>Select Roles</label>
            <select 
                className='custom-select'
                multiple={true} 
                name="roles" 
                onChange={handleChange} 
                value={values.roles || []}  
                size="3"                                         
            >
                {defRoles.map((role, index) =>{
                    //console.log(role)
                    return <option key={index} value={role.name}>{role.name}</option>
                    
                })}
                </select>
        </div>
        {!props.isEditing &&
        <>
        <div className="form-group">
            <label>Password</label>
            <input 
                type="password" 
                className={`form-control ${errors.password && 'is-invalid' }`}
                placeholder="Password" 
                name="password"
                value={values.password || ''}
                onChange={handleChange}
            />
            {errors.name &&
                <span className="error invalid-feedback">{errors.password ? errors.password : "not valid"}</span>                
            }
        </div>
        <div className="form-group">
            <label>Confirm Password</label>
            <input 
                type="password" 
                className={`form-control ${errors.passwordConfirm && 'is-invalid' }`}
                placeholder="Confirm Password" 
                name="passwordConfirm"
                value={values.passwordConfirm || ''}
                onChange={handleChange}
            />
            {errors.name &&
                <span className="error invalid-feedback">{errors.passwordConfirm ? errors.passwordConfirm : "not valid"}</span>                
            }
        </div>
        </>
        }
        <div className="row mb-10">
            <div className="col-md-12 text-right">
            <BackButton />
            <button type="submit" className="btn btn-primary"><i className="fa fa-fw fa-lg fa-check-circle"></i> Save</button>
            </div>
        </div>
    </form>
    </>
  );
}
