import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import ValidateForm from '../helper/validateForm';
import kioskService from '../service/kiosk.service';

export default function CounterForm(props) {    
    const {values, errors, handleChange, handleSubmit} = ValidateForm(props.callback, props.validate, props.initialValues);    
    const [defServices, setdefServices] = useState(["wowowo"])
    
    const BackButton = withRouter((props) => (
        <button onClick={() => {props.history.push('/dashboard/counters')}} className="btn btn-danger mx-3" type="button"><i className="fa fa-fw fa-lg fa-times-circle"></i> Cancel</button>        
    ));

    const getServices = () => {
        kioskService.getServices()
            .then((response) => {
                //console.log(response.data);
                setdefServices(response.data);
            }).catch((err) => {
                console.log(err);
            });
    }
    useEffect(() => {
        getServices()
      
    }, [])
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
            <label>Code a</label>
            <input 
                type="number" 
                min="1"             
                step="1"   
                className={`form-control ${errors.counter_code && 'is-invalid' }`}
                placeholder="counter code" 
                name="counter_code"
                value={values.counter_code || ''}
                onChange={handleChange}                
            />
            {errors.counter_code &&
                <span className="error invalid-feedback">{errors.counter_code ? errors.counter_code : "not valid"}</span>                
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
        <div className="form-group mb-3">
            <label>Select Services</label>
            <select 
                className='custom-select'
                multiple={true} 
                name="services" 
                onChange={handleChange} 
                value={values.services || []}  
                size="3"                                         
            >
                {defServices.map((service, index) =>{
                    //console.log(role)
                    return <option key={index} value={service._id}>{service.name}</option>
                    
                })}
                </select>
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
