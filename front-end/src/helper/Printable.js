import React from 'react'

const PrintAble = (props) => {
  return (
    <div className="text-center d-print-block d-none ticket-print">
      {props.ticket.serviceName !== '' ?
      <h3>{props.ticket.serviceName}</h3> :
      ''
      }      
      <h3>Ticket Number</h3>
      <h2>{props.ticket.ticket_number}</h2>
    </div>
  )
}

export default PrintAble
