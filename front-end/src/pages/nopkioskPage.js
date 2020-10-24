import React, { useState } from 'react';
import PrintAble from '../helper/Printable';
import kioskService from '../service/kiosk.service';

export default function NoprintkioskPage() {
    const [listService, setListService ] = useState(['dummy Service']);
    const ticketNumber = 1;
    const [ticket, setTicket] = useState({})
    const [firstRender, setfirstRender] = useState(true);
    
    const getServices = () => {
        console.log("get available services");
        kioskService.getServices()
            .then((response) => {
                //console.log(response.data);
                setListService(response.data);
            }).catch((err) => {
                console.log(err);
            });
    }

    const printOrder = (serviceId, serviceName='') => {
        console.log("print this");
        console.log(serviceId);
        makeTicket(serviceId, serviceName);
        
    }

    const makeTicket = (serviceId, serviceName='') => {
        kioskService.makeTicket(serviceId)
            .then((response) => {
                //console.log(response.data);
                response.data.serviceName=serviceName;
                setTicket(response.data);
            }).catch((err) => {
                console.log(err);
            });
    }
    React.useEffect(() => {
        document.body.classList.add('kiosk-page');
        //helper.fixLoginRegisterHeight();
        getServices()
        
        return () => {
            document.body.classList.remove('kiosk-page');
        };
    }, []);

    React.useEffect(()=> {
        if(firstRender){
            setfirstRender(false)
        }else{
            //window.print();
        }
    }, [ticket])
  return (
    <div>
        <div className="card kiosk-box d-print-none">
            <div className="card-header">Print Ticket</div>
            <div className="card-body">            
                <div className="d-flex flex-wrap justify-content-center">
                    {listService.map((service, index) => {
                        return(
                            <button key={index} className="print-button btn bg-gradient-primary btn-lg btn-block" onClick={() => printOrder(service._id, service.name)}>{service.name}</button>
                        );
                    })}
                </div>
            </div>
            
        </div>
        {ticket &&
            <PrintAble ticket={ticket} />
        }
        
    </div>

  );
}
