import React from 'react';
import { withRouter } from 'react-router-dom';
import ValidateForm from '../helper/validateForm';

export default function ServiceForm(props) {
    const {values, errors, handleChange, handleSubmit} = ValidateForm(props.callback, props.validate, props.initialValues);    
    const BackButton = withRouter((props) => (
        <button onClick={() => {props.history.push('/dashboard/services')}} className="btn btn-danger mx-3" type="button"><i className="fa fa-fw fa-lg fa-times-circle"></i> Cancel</button>        
    ));
  return (
    <>    
    <form onSubmit={handleSubmit}>
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
            <label>Status</label>  
            <div className="custom-control custom-switch custom-switch-off-danger custom-switch-on-success">                                    
                <input 
                    type="checkbox" 
                    className="custom-control-input" 
                    id="statusService"
                    name="status"
                    checked={values.status || false}
                    onChange={handleChange}                                                                                 
                />
                <label className="custom-control-label" htmlFor="statusService">{values.status ? "Open" : "Closed"}</label>
            </div>
        </div>
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
