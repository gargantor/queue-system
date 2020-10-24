import React from 'react';

export default function MonitorList() {
    const arrtest = [1,2,3,4,5,6];
  return (
    <>
        <section className="content">
            <div className="row">
                <div className="col-6 float-left">
                    <div className="card">
                        <div className="card-body text-center">
                            <p>ticket number</p>
                            <span className="display-3"><b>1035</b></span>
                            <p>Please proceed to</p>
                            <h2 className="text-blue">Counter A</h2>
                        </div>
                    </div>
                </div>
                {arrtest.map((arr,index)=> (
                    <div className="col-3 float-left">
                    <div className="card">
                        <div className="card-body ">
                            <div className="row d-table align-middle">
                            <div className="col-6 d-table-cell">
                                <h2 className="text-blue">Counter {arr}</h2>
                            </div>
                            <div className="col-6 text-center d-table-cell">
                                <span className="display-4"><b>1034</b></span>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
                ))}
                
                
            </div>
        </section>
    
    </>
  );
}
