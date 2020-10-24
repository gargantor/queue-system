import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import makeToast from '../../helper/Toaster';
import serviceFactory from '../../service/settings.service';
import ContentHeader from '../partials/content-header.partials';

export default function SettingsPage() {
    const [ticketCounts, setticketCounts] = useState();
    const confirmation = Swal.mixin({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, reset it!'
      });
    const resetCounter = () => {
        confirmation.fire()
        .then((result) => {
            if (result.isConfirmed) {
                console.log("reseted");
                serviceFactory.resetCounter()
                    .then((response) => {                        
                        makeToast("success", response.data.message);  
                        getCounter();
                    }).catch((err) => {
                        makeToast("error", err.response.data.message);                
                    });
            }
        })
    }
    const getCounter = () => {
        serviceFactory.getCounter()
            .then((response)=>{
                console.log(response.data);
                setticketCounts(response.data);
            }).catch((err)=>{
                console.log(err);
            })
    }
    useEffect(() => {
        getCounter();
      return () => {
        
      };
    }, [])
  return (
    <>
        <ContentHeader
            title="Settings"            
        />
        <section className="content">
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card-body">
                            <button onClick={resetCounter} className="btn btn-success btn-lg">Reset Ticket Count</button>
                            {ticketCounts &&
                                <div>
                                    {ticketCounts.map((ticketCount, index)=>(
                                        <p key={index}>Service Name:  {(ticketCount.service && ticketCount.service.name) ? ticketCount.service.name :  "no service"} 
                                            - ticket count: {ticketCount.sequence_value}</p>
                                    ))}
                                    
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </section>
    
    </>
  );
}
