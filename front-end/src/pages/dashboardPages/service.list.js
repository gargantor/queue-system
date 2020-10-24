import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import makeToast from '../../helper/Toaster';
import servicesService from '../../service/services.service';
import ContentHeader from '../partials/content-header.partials';

export default function ServiceList() {
    const confirmation = Swal.mixin({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      });
    const [services, setServices] = useState([]);
    const getServices = () => {
        servicesService.getServices()
            .then(
                response => {
                    //console.log(response.data);
                    setServices(response.data);
                },
                error => {
                    //console.log("alert alert");
                }
            );
    }

    const deleteService = (id) => {
        confirmation.fire()
            .then((result) => {
                if (result.isConfirmed) {
                    servicesService.delete(id)
                    .then((response) => {
                        getServices();
                        makeToast("success", response.data.message);                          
                    }).catch((err) => {
                        makeToast("error", err.response.data.message);                
                    });
                }

            })
        
        
    }
    useEffect(() => {
        getServices();
      return () => {
        
      };
    }, [])
  return (
    <div>
        <ContentHeader
            title="Services"
            subtitle="List of all services"
            btnLink='/dashboard/services/create'
            btnText='Add Service'
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
                        <th className="">Service Name</th>
                        <th className="">Status</th>
                        <th className="text-danger "><i className="fa fa-bolt" /> </th>
                        </tr>
                    </thead>
                    <tbody>
                        {services.map((service, index) =>(
                            <tr className="" key={index}>
                            <td className="text-center">{index+1}</td>
                            <td className="">{service.name}</td>
                            <th className="text-center">{service.status ? "Open" : "Closed"}</th>
                            <td className="text-center ">
                            
                                <div className="btn-group" role="group" aria-label="Second group">
                                <Link to={`/dashboard/services/${service._id}/edit`} type="button" className="btn btn-sm btn-primary"><i className="fa fa-edit" /></Link>                                
                                <button onClick={()=>deleteService(service._id)} type="button" className="btn btn-sm btn-danger"><i className="fa fa-trash" /></button>
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
