import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import makeToast from '../helper/Toaster';
import serviceFactory from '../service/desk.service'

export default function DeskComponent({closeDesk, socket, desk}) {
    const [ticketCount, setticketCount] = useState(0);
    const [missedCount, setmissedCount] = useState(0);
    const [currentticket, setcurrentTicket] = useState(null);

    const confirmation = Swal.mixin({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, This ticket missed'
      });

    const getTicketCount = () => {
        serviceFactory.ticketCount(desk.services)
        .then(
            response => {  
                console.log(response.data);                  
                
                setticketCount(response.data.waitingCount);
                setmissedCount(response.data.missedCount)                
            },
            error => {
                console.log(error);
            }
        );
                
    }  
    const getCurrentTicket = () => {
        if(!currentticket){
            serviceFactory.getCurrentTicket(desk._id)
            .then(
                response => {
                    if(response.data){
                        setcurrentTicket(response.data);
                    }
                    
                },
                error => {
                    console.log(error);
                }
            )
        }
    }
    const doneHandle=()=> {
        if(currentticket){
            serviceFactory.doneCall(currentticket._id)
            .then(
                response => {
                    if(response.data){
                        console.log(response.data);
                        if(currentticket._id === response.data._id){
                            makeToast('success', "Ticket "+currentticket.ticket_number+" Done");
                            setcurrentTicket(null);
                        }
                        //setcurrentTicket(response.data);
                    }
                    
                },
                error => {
                    console.log(error);
                }
            )
        }else {
            makeToast('error', "No ticket on process");
        }

    }
    const reCallHandle=()=> {
        if(currentticket){
            socket.emit("TicketReCalled", currentticket._id)
        }else {
            makeToast('error', "No ticket on process");
        }

    }

    const missedHandle=()=>{
        if(currentticket){
            confirmation.fire()
            .then((result) => {
                if (result.isConfirmed) {
                    serviceFactory.missedCall(currentticket._id)
                    .then(
                        response => {
                            if(response.data){
                                console.log(response.data);
                                if(currentticket._id === response.data._id){
                                    makeToast('question', "Ticket "+currentticket.ticket_number+" Missed");
                                    setcurrentTicket(null);
                                    getTicketCount();
                                    socket.emit("TicketMissed",response.data._id)
                                }
                                //setcurrentTicket(response.data);
                            }
                            
                        },
                        error => {
                            console.log(error);
                        }
                    )
                }

            })
            
            
        }else {
            makeToast('error', "No ticket on process");
        }        
    }
    const transferHandle=()=>{
        if(currentticket){
            makeToast('error', "Not implemented yet");
            
        }else {
            makeToast('error', "No ticket on process");
        }        
    }

    const callMissedHandle=()=>{        
            makeToast('error', "Not implemented yet");      
    }    

    const nextCallHandle=() => {
        const theCurrent = (currentticket && currentticket._id) ? currentticket._id : null;
        serviceFactory.nextCall(desk._id, desk.services, theCurrent)
        .then(
            response => {                    
                //console.log(response);
                if(response.data.message && response.data.message === 'no ticket available'){
                    console.log(response.data.message);
                    makeToast('info', response.data.message);
                    setcurrentTicket(null)
                }else{
                    setcurrentTicket(response.data);
                    getTicketCount();
                    socket.emit("TicketCalled",response.data._id)

                }                
                
            },
            error => {
                console.log(error);
                //console.log("alert alert");
            }
        );

    }
    useEffect(() => {        
        getTicketCount();
        getCurrentTicket();
        //console.log("prepare socket");
        let eventcount = 0;
        if(socket){
            //console.log("there is socket");
            socket.emit("joinRoom", "ticketing");             
            socket.on("TicketCountUpdate", (test) => {
                eventcount++;
                console.log(test, eventcount);
                getTicketCount();
                })
            socket.on("clientToServer", (message)=>{
                console.log("message dr lain : "+ message);
            })
        }
        
      return () => {
        //console.log("prepare leave room");
            if (socket) {
                //console.log("there is socket for leaveroom");
                socket.emit("leaveRoom", "ticketing");
            }
      };
    }, []) 
  return (
    <>          
        <section className="content">
            <div className="row">
            <div className="col-5">
                <div className="card card-primary">
                <div className="card-header">
                    <h3 className="card-title">Current Number</h3>
                </div>
                <div className="card-body text-center"><h1 className="display-1"><b>
                    {currentticket && currentticket.ticket_number ? currentticket.ticket_number : '--'}
                </b></h1></div>
                <div className="card-footer">
                    Status : {currentticket && currentticket.ticket_number ? 'processing': '--'}
                </div>
                </div>
            </div>
            <div className="col-7">
                <div className="card">                
                <div className="card-body">
                    <div className="row d-flex">
                    <div className="col-md-4 mb-2">
                        <button onClick={nextCallHandle} className="btn btn-primary btn-block btn-lg btn-labeled" >
                        <span className="btn-label"><i className="fas fa-arrow-alt-circle-right" /></span>
                        Next
                        </button>
                    </div>   
                    <div className="col-md-4 mb-2">
                        <button onClick={reCallHandle} className="btn btn-primary btn-block btn-lg btn-labeled">
                        <span className="btn-label"><i className="fas fa-volume-up" /></span>
                        Recall
                        </button>
                    </div> 
                    <div className="col-md-4 mb-2">
                        <button onClick={doneHandle} className="btn btn-success btn-block btn-lg btn-labeled">
                        <span className="btn-label"><i className="far fa-check-circle" /></span>
                        Done
                        </button>
                    </div>                
                    <div className="col-md-4 mb-2">
                        <button onClick={missedHandle} className="btn btn-warning btn-block btn-lg btn-labeled">
                        <span className="btn-label"><i className="far fa-clock" /></span>
                        Missed
                        </button>
                    </div>
                    
                    <div className="col-md-4 mb-2">
                        <button onClick={callMissedHandle} className="btn btn-primary btn-block btn-lg btn-labeled">
                        <span className="btn-label"><i className="fas fa-sync-alt" /></span>
                        Call Miss
                        </button>
                    </div>
                    <div className="col-md-4 mb-2">
                        <button onClick={transferHandle} className="btn btn-info btn-block btn-lg btn-labeled">
                        <span className="btn-label"><i className="fas fa-share-square" /></span>
                        Transfer
                        </button>
                    </div>
                    
                    <div className="col-md-4 mb-2">
                        <button onClick={()=>closeDesk()} className="btn btn-danger btn-block btn-lg  btn-labeled">
                        <span className="btn-label"><i className="fas fa-user-lock" /></span>
                        Close
                        </button>
                    </div>
                    </div>
                </div>                
                </div>
            </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <div className="card card-info">
                    <div className="card-header">
                        <h3 className="card-title">Queue info</h3>
                    </div>
                    <div className="card-body">
                        <h3 className="text-primary">Queue Left: <b>{ticketCount}</b></h3>
                        <h3 className="text-danger">Missed Queue: <b>{missedCount}</b></h3>
                    </div>
                    <div className="card-footer" />
                    </div>
                </div>
            </div>
            
        </section>
    
    </>
  );
}
