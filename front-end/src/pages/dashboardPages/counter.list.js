import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import makeToast from '../../helper/Toaster';
import serviceFactory from '../../service/counters.service';
import ContentHeader from '../partials/content-header.partials';

export default function CounterList() {
    const confirmation = Swal.mixin({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      });
    const [items, setItems] = useState([]);
    const getAll = () => {
        serviceFactory.getAll()
            .then(
                response => {
                    console.log(response.data);
                    setItems(response.data);
                },
                error => {
                    //console.log("alert alert");
                }
            );
    }

    const deleteItem = (id) => {
        confirmation.fire()
            .then((result) => {
                if (result.isConfirmed) {
                    serviceFactory.delete(id)
                    .then((response) => {
                        getAll();
                        makeToast("success", response.data.message);                          
                    }).catch((err) => {
                        makeToast("error", err.response.data.message);                
                    });
                }

            })
        
        
    }
    useEffect(() => {
        getAll();
      return () => {
        
      };
    }, [])
  return (
    <div>
        <ContentHeader
            title="Counters"
            subtitle="List of all counters"
            btnLink='/dashboard/counters/create'
            btnText='Add Counter'
        />        
        <section className="content">
            <div className="row">
            <div className="col-12">
                <div className="card">
                <div className="card-body">
                    
                    <table id="table-user" className="table table-bordered table-hover">
                    <thead className="text-center">
                        <tr className="">
                        <th style={{width: '10%'}}>#</th>
                        <th className="">Counter Name</th>
                        <th className="">Code</th>
                        <th className="">Status</th>
                        <th className="">Service</th>
                        <th className="">User</th>
                        <th className="text-danger "><i className="fa fa-bolt" /> </th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item, index) =>(
                            <tr className="" key={index}>
                            <td className="text-center">{index+1}</td>
                            <td className="">{item.name}</td>
                            <td className="text-center">{item.counter_code}</td>
                            <td className="text-center">{item.status ? "Open" : "Closed"}</td>
                            <td className="">
                            {
                                item.services.map((service, index)=>{
                                    if(index===0){
                                        return service.name
                                    }else{
                                        return ", " + service.name
                                    }
                                })   
                            }
                            </td>
                            <td className="text-center">{item.user && item.user.username ? item.user.username : ''}</td>
                            <td className="text-center ">                            
                                <div className="btn-group" role="group" aria-label="Second group">
                                <Link to={`/dashboard/counters/${item._id}/edit`} type="button" className="btn btn-sm btn-primary"><i className="fa fa-edit" /></Link>                                
                                <button onClick={()=>deleteItem(item._id)} type="button" className="btn btn-sm btn-danger"><i className="fa fa-trash" /></button>
                                </div>
                            </td>
                            </tr>
                        ))}                        
                    </tbody>
                    </table>
                </div>
                </div>
            </div>
            </div>
        </section>
    </div>
  );
}
