import React, { useEffect, useState } from 'react';
import DeskComponent from '../../components/desk.component';
import ContentHeader from '../partials/content-header.partials';
import serviceFactory from '../../service/counters.service'
import makeToast from "../../helper/Toaster";
import SelectDeskForm from '../../components/selectDesk.form';

const ValidateService = (values) => {
    let errors = {}    
    if(!values.desk){
        errors.desk = "Please choose desk code"
    } 
    return errors;
  }
export default function DeskPage({socket}) {
    let subtitle = "please Choose Desk"
    const [desk, setDesk] = useState();
    const [selectDesk, setSelectDesk] = useState([]);
    const [ticketCount, setticketCount] = useState(0);

    const getDesks = () => {
        serviceFactory.availableDesk()
            .then(
                response => {                    
                    setSelectDesk(response.data);
                },
                error => {
                    //console.log("alert alert");
                }
            );

    }

    const handleSubmitDesk = ({values}) => {
        console.log("submit");
        serviceFactory.selectDesk(values.desk)
            .then(
                response => {                    
                    console.log(response);
                    setDesk(response.data.counter);
                },
                error => {
                    //console.log("alert alert");
                }
            );

    }

    const checkChosenDesk = () => {        
        serviceFactory.checkChosenDesk()
            .then(
                response => {
                    //console.log("check chosen");
                    //console.log(response);
                    setDesk(response.data.counter)
                },
                error => {
                    console.log(error);
                }
            )
    }

    const closeDesk = () => {
        console.log("desk close");
        serviceFactory.closeDesk()
        .then(
            response => {
                //console.log("check chosen");
                //console.log(response);
                setDesk(response.data.counter)
            },
            error => {
                console.log(error);
            }
        )
    }
     
    
    useEffect(() => {
        checkChosenDesk()
        
        return () => {
            
        };
    }, [])  
    useEffect(() => {
        if(!desk){
            getDesks()
        }else{
        }  
        return () => {
            
          };    
    }, [desk]) 
    
  return (
    <>          
        <ContentHeader
            title="Desk"
            subtitle={desk ? "Counter " + desk.counter_code : subtitle}            
        />
        {!desk ? 
        <SelectDeskForm callback={handleSubmitDesk} validate={ValidateService} selectDesk={selectDesk}/>
        :
        <DeskComponent closeDesk={closeDesk} socket={socket} desk={desk}/>
        }
        
    </>
  );
}
