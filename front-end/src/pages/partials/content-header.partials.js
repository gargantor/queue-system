import React from 'react';
import { Link } from 'react-router-dom';

export default function ContentHeader(props) {
  return (
    <section className="content-header">        
        <div className="">
            <h1>{props.title}</h1>
            {props.subtitle &&
            <p>{props.subtitle}</p>
            }
        </div>
        {props.btnLink &&
        <Link to={props.btnLink} type="button" className="btn btn-primary float-right">{props.btnText}</Link>
        }
        
    </section>
  );
}
