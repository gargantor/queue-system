import React from 'react';

export default function MonitorList({calling, currentCall, ticketCalled}) {
    const defArr = [1,2,3,4]
    console.log(ticketCalled);
    const item = [];
    for (let index = 0; index < 12; index++) {
        item.push(
        <div key={index} className="col">
            <div className="card">
                <div className="card-body ">
                    <div className="row d-flex align-items-center">                    
                        <h2 className="flex-fill text-blue align-self-center">
                            Counter {(ticketCalled[index] && ticketCalled[index].counter && ticketCalled[index].counter.counter_code) ? ticketCalled[index].counter.counter_code : "--"}
                        </h2>
                    
                        <h1 className="flex-fill align-self-center">
                            <b>{(ticketCalled[index] && ticketCalled[index].ticket_number) ? ticketCalled[index].ticket_number : "--"}</b>
                        </h1>
                    </div>
                </div>
            </div>
        </div>
        )
        
        
    }
  return (
    <>
        <section className="content">
            <div className="row d-flex">
                <div className="col-md-6 d-flex">
                    <div className="card align-self-stretch col-12">
                        <div className={`card-body text-center ${calling && 'blink'}`}>
                            <p>ticket number</p>
                            <span className="display-3"><b>{(currentCall && currentCall.ticket_number) ? currentCall.ticket_number : "--"}</b></span>
                            <p>Please proceed to</p>
                            <h2 className="text-blue">Counter {(currentCall && currentCall.counter && currentCall.counter.counter_code) ? currentCall.counter.counter_code : "--"}</h2>
                        </div>
                    </div>
                </div>                
                <div className="col-md-6 d-flex">
                    <div className="card align-self-stretch col-12">
                        <div className="card-body">
                        <svg className="bd-placeholder-img bd-placeholder-img-lg img-fluid" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: Responsive image">
                            <title>Placeholder</title>
                            <rect width="100%" height="100%" fill="#868e96" />
                            <text x="50%" y="50%" fill="#dee2e6" dy=".3em">Responsive image</text>
                        </svg>

                        </div>
                    </div>
                    
                </div>
            </div>
            <div className="row row-cols-4">
                {item}
            </div>
        </section>
    
    </>
  );
}
