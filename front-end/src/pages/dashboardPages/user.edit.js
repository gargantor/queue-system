import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import ContentHeader from '../partials/content-header.partials'
import serviceFactory from '../../service/users.service'
import makeToast from "../../helper/Toaster";
import EditForm from '../../components/user.form';
import PasswordForm from '../../components/pasword.form';

const ValidateCreateService = (values,) => {
    let errors = {}    
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
const ValidateEditService = (values,) => {
    let errors = {}    
    if(!values.username){
        errors.username = "Username is required"
    } else if (values.username.length < 3){
        errors.username = "Username minimal containt 3 character"
    }    
    return errors;
}
const ValidatePasswordService = (values,) => {
    let errors = {}    
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

export default function UserEdit(props) {  
    const [defValues, setdefValues] = useState({});    
    const handleCreate = ({values}) => {     
        console.log("create");   
        
        serviceFactory.create(values.username, values.email, values.name, values.address, values.roles, values.password)
            .then(response => {                 
                makeToast("success", response.data.message);    
                props.history.push('/dashboard/users');
            }).catch((err) => {                
                makeToast("error", err.response.data.message);
            })
        
        
    }  
    const handleUpdate = ({values}) => {  
        console.log("edit");   
           
        serviceFactory.edit(props.match.params.id, values.email, values.name, values.address, values.roles)
            .then(response => {                 
                makeToast("success", response.data.message);    
                props.history.push('/dashboard/users');
            }).catch((err) => {                
                makeToast("error", err.response.data.message);
            })
        
        
    }  
    const handlePasswordChange = ({values}) => {
        console.log(values);
        serviceFactory.passwordUpdate(props.match.params.id, values.password)
            .then(response => {                 
                makeToast("success", response.data.message);    
                props.history.push('/dashboard/users');                
            }).catch((err) => {                
                makeToast("error", err.response.data.message);
            })
    }  
    let subtitle = "Create new User";
    let handleSubmit = props.match.params.id ? handleUpdate : handleCreate;
    const isEditing = props.match.params.id ? true : false;
    const ValidateService = props.match.params.id ? ValidateEditService : ValidateCreateService;
    if(props.match.params.id){
        subtitle = "Edit User"      
    } 
    
    useEffect( () => {
        if(props.match.params.id){
            serviceFactory.findOne(props.match.params.id)
            .then(response => {                     
                setdefValues(response.data);                
            }).catch((err) => {
                /*if(err.response.status === 404){                    
                    props.history.push('/dashboard/oops');
                }*/
                console.log(err);            
            })
        }
        
    }, [])
       

  return (
    <>
        <ContentHeader
            title="Users"
            subtitle={subtitle}            
        />  
        <section className="content">
            <div className="row">
                {isEditing && 
                <>
                <div className="col-md-3">
                    <div className="card p-0">
                        <div className="card-body">
                        <div className="nav flex-column nav-pills user-tabs" role="tablist" aria-orientation="vertical">                        
                            <a className="nav-link active" data-toggle="pill" href="#profile-card" role="tab" aria-controls="profile-card" aria-selected="true">Profile</a>
                            <a className="nav-link" data-toggle="pill" href="#change-password-card" role="tab" aria-controls="#change-password-card" aria-selected="false">Change Password</a>        
                        </div>                     
                        </div>   
                    </div>
                </div>
                <div className="col-md-9">
                <div className="tab-content" id="vert-tabs-tabContent">
                    <div className="tab-pane fade show active" id="profile-card" role="tabpanel" aria-labelledby="profile-card-tab">
                        <div className="card">
                            <div className="card-header">
                                <h3 className="card-title">{subtitle} {defValues.name}</h3>
                            </div>
                            <div className="card-body">                            
                                <EditForm callback={handleSubmit} validate={ValidateService} initialValues={defValues} isEditing={isEditing} />
                            </div>
                        </div>
                    </div>
                    <div className="tab-pane fade" id="change-password-card" role="tabpanel" aria-labelledby="change-password-card-tab">
                        <div className="card">
                            <div className="card-header">
                                <h3 className="card-title">Change Password</h3>
                            </div>
                            <div className="card-body">
                                <PasswordForm callback={handlePasswordChange} validate={ValidatePasswordService} />
                            </div>
                        </div>
                    </div>
                </div>
                </div>
                </>
                
                }
                {!isEditing &&
                    <div className="col-md-8 mx-auto">
                        <div className="card">
                            <div className="card-header">
                                <h3 className="card-title">{subtitle} {defValues.name}</h3>
                            </div>
                            <div className="card-body">                            
                                <EditForm callback={handleSubmit} validate={ValidateService} initialValues={defValues} isEditing={isEditing} />
                            </div>
                        </div>
                    </div>
                }
            </div> 
        </section>
    </>
  );
}

UserEdit.propTypes = {
    match: PropTypes.object.isRequired

}


