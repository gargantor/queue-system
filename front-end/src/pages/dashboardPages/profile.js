import React, { useEffect, useState } from 'react';
import ContentHeader from '../partials/content-header.partials';
import ProfileForm from "../../components/profile.form";

import makeToast from "../../helper/Toaster";

import serviceFactory from '../../service/users.service'
import PasswordForm from '../../components/pasword.form';

const validateProfile = (values) => {
    let errors = {}
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

export default function ProfilePage(props) {
    const [defValues, setdefValues] = useState({});     
    const [currentUser, setcurrentUser] = useState(JSON.parse(localStorage.getItem("user")))
    const defroles = [{name: 'user'}, {name: 'moder'}, {name: 'admin'}];
    const handleSubmit = ({values}) => {
        console.log("submit");
        serviceFactory.profileUpdate(currentUser.id, values.email, values.name, values.address)
            .then(response => {                 
                makeToast("success", response.data.message);                    
            }).catch((err) => {                
                makeToast("error", err.response.data.message);
            })
    }
    const handlePasswordChange = ({values}) => {
        console.log(values);
        serviceFactory.passwordUpdate(currentUser.id, values.password)
            .then(response => {                 
                makeToast("success", response.data.message);                    
            }).catch((err) => {                
                makeToast("error", err.response.data.message);
            })
    }
    useEffect(() => {        
        
        serviceFactory.getProfile(currentUser.id)
        .then(response => {                     
            setdefValues(response.data);                
        }).catch((err) => {
            if(err.response.status === 404){                    
                props.history.push('/dashboard/oops');
            }
            console.log(err);            
        })
        
        
      
    }, [])
  return (
    <>
        <ContentHeader 
            title="Profile"            
        />
        <section className="content">
            <div className="row profile">
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
                            <div className="card-body">
                                <ProfileForm callback={handleSubmit} validate={validateProfile} initialValues={defValues} />
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
            </div>
        </section>

    
    </>
  );
}
