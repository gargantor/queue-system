import React from 'react';
import { withRouter } from 'react-router-dom';
import ValidateForm from '../helper/validateForm';

export default function ProfileForm(props) {    
    const {values, errors, handleChange, handleSubmit} = ValidateForm(props.callback, props.validate, props.initialValues);        
    
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
                value={values.username || 'asdasd'}
                onChange={handleChange}
                disabled={true}
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
            <input 
                type="text" 
                className={`form-control ${errors.address && 'is-invalid' }`}
                placeholder="Name" 
                name="address"
                value={values.address || ''}
                onChange={handleChange}
            />
            {errors.name &&
                <span className="error invalid-feedback">{errors.address ? errors.address : "not valid"}</span>                
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
