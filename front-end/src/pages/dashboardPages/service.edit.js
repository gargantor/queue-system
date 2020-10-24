import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import ContentHeader from '../partials/content-header.partials'
import servicesService from '../../service/services.service'
import makeToast from "../../helper/Toaster";
import ServiceForm from '../../components/service.form';

const ValidateService = (values) => {
    let errors = {}    
    if(!values.name){
        errors.name = "Name is required"
    } 
    return errors;
  }

export default function ServiceEdit(props) {  
    const [defValues, setdefValues] = useState({});    
    const handleCreate = ({values}) => {        
        servicesService.create(values.name, values.status)
            .then(response => {                 
                makeToast("success", response.data.message);    
                props.history.push('/dashboard/services');
            }).catch((err) => {                
                makeToast("error", err.response.data.message);
            })
    }  
    const handleUpdate = ({values}) => {        
        servicesService.edit(values.name, values.status, props.match.params.id)
            .then(response => {                 
                makeToast("success", response.data.message);    
                props.history.push('/dashboard/services');
            }).catch((err) => {                
                makeToast("error", err.response.data.message);
            })
    }    
    let subtitle = "Create new Service";
    let handleSubmit = props.match.params.id ? handleUpdate : handleCreate;
    if(props.match.params.id){
        subtitle = "Edit Service"      
    } 
    
    useEffect( () => {
        if(props.match.params.id){
            servicesService.findOne(props.match.params.id)
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
            title="Services"
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
                            <ServiceForm callback={handleSubmit} validate={ValidateService} initialValues={defValues} />
                        </div>
                    </div>
                </div>
            </div> 
        </section>
    </>
  );
}

ServiceEdit.propTypes = {
    match: PropTypes.object.isRequired

}


