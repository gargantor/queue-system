import React from 'react';
import ValidateForm from "../helper/validateForm";

export default function SelectDeskForm(props) {
    const {values, errors, handleChange, handleSubmit} = ValidateForm(props.callback, props.validate,);    
  return (
    <>
        <section className="content">
            <div className="row">
                <div className="col-md-5 mx-auto">
                    <div className="card">
                        <div className="card-header">
                            <h3 className="card-title">Choose Desk</h3>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="form-group mb-3">
                                    <label>Select Roles</label>
                                    <select 
                                        className={`custom-select ${errors.desk && 'is-invalid' }`}                                   
                                        name="desk" 
                                        onChange={handleChange} 
                                        value={values.desk || ''}                                                              
                                    >
                                        <option>Choose Desk</option>
                                        {props.selectDesk.map((desk, index) =>{
                                            //console.log(role)
                                            return <option key={index} value={desk._id}>{desk.counter_code}</option>
                                            
                                        })}
                                        </select>
                                        {errors.desk &&
                                            <span className="error invalid-feedback">{errors.desk ? errors.desk : "not valid"}</span>                
                                        }
                                </div>
                                <div className="row mb-10">
                                <div className="col-md-12 text-right">                                    
                                    <button type="submit" className="btn btn-primary"><i className="fa fa-fw fa-lg fa-check-circle"></i> Submit</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    
    </>
  );
}
