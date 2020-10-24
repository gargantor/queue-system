import React from 'react';
import ValidateForm from '../helper/validateForm';

export default function PasswordForm(props) {
    const {values, errors, handleChange, handleSubmit} = ValidateForm(props.callback, props.validate,);    
  return (
    <>
    <form onSubmit={handleSubmit}>
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
        <div className="row mb-10">
            <div className="col-md-12 text-right">            
            <button type="submit" className="btn btn-primary"><i className="fa fa-fw fa-lg fa-check-circle"></i> Save</button>
            </div>
        </div>
    </form>
    
    </>
  );
}
