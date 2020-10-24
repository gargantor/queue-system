import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import ContentHeader from '../partials/content-header.partials'
import serviceFactory from '../../service/counters.service'
import makeToast from "../../helper/Toaster";
import EditForm from '../../components/counter.form';

const ValidateService = (values) => {
    let errors = {}    
    if(!values.name){
        errors.name = "Name is required"
    } 
    if(!values.counter_code){
        errors.counter_code ="Code is required"
    }
    if(values.counter_code<=0){
        errors.counter_code ="Code is invalid"
    }
    if(!Number.isInteger(parseFloat(values.counter_code))){
        errors.counter_code ="Code must be whole number"
    }
    return errors;
  }

export default function CounterEdit(props) {  
    const [defValues, setdefValues] = useState({});    
    const handleCreate = ({values}) => {     
        console.log("create");   
        console.log(values.counter_code);
        serviceFactory.create(values.name, values.counter_code, values.status, values.services)
            .then(response => {                 
                makeToast("success", response.data.message);    
                props.history.push('/dashboard/counters');
            }).catch((err) => {                
                makeToast("error", err.response.data.message);
            })
        
    }  
    const handleUpdate = ({values}) => {  
        console.log("edit"); 
        console.log(values.counter_code); 
        var test = Number.isInteger(values.counter_code)
        console.log(test);    
        serviceFactory.edit(values.name, values.counter_code, values.status, props.match.params.id, values.services,)
            .then(response => {                 
                makeToast("success", response.data.message);    
                props.history.push('/dashboard/counters');
            }).catch((err) => {                
                makeToast("error", err.response.data.message);
            })
        
    }    
    let subtitle = "Create new Counter";
    let handleSubmit = props.match.params.id ? handleUpdate : handleCreate;
    if(props.match.params.id){
        subtitle = "Edit Counter"      
    } 
    
    useEffect( () => {
        if(props.match.params.id){
            serviceFactory.findOne(props.match.params.id)
            .then(response => {                     
                setdefValues(response.data);                
            }).catch((err) => {
                if(err.response.status === 404){                    
                    props.history.push('/dashboard/oops');
                }
                console.log(err);            
            })
        }
        
    }, [])
    let valTest = defValues.name;
    useEffect(() => {
      valTest = defValues.name
    }, [defValues])

  return (
    <>
        <ContentHeader
            title="Counters"
            subtitle={subtitle}            
        />  
        <section className="content">
            <div className="row">
                <div className="col-md-8 mx-auto">
                    <div className="card">
                        <div className="card-header">
                            <h3 className="card-title">{subtitle} {defValues.name}</h3>
                        </div>
                        <div className="card-body">                            
                            <EditForm callback={handleSubmit} validate={ValidateService} initialValues={defValues} />
                        </div>
                    </div>
                </div>
            </div> 
        </section>
    </>
  );
}

CounterEdit.propTypes = {
    match: PropTypes.object.isRequired

}


