import React, { useEffect, useRef, useState } from 'react';
import io from "socket.io-client";
import monitorService from '../service/monitor.service';
import monitorCalling from '../helper/monitorCalling';
import ListAudio from '../components/audioList.component';
import MonitorList from '../components/monitorList.component';

export default function MonitorPage() {
    const [audioList, setaudioList] = useState();
    const [socket, setSocket] = useState();
    const [calling, setCalling] = useState(false);        
    const [callTicket, setcallTicket] = useState([]);
    const refcallTicket = useRef(callTicket);
    const [ticketCalled, setTicketCalled] = useState([]);

    const getAudio = () => { 
        monitorService.getAudio()
            .then((response) => {
                setaudioList(response.data);                
            }).catch((err) => {
                console.log(err);
            })  
    }

    const shoutCaller = async(theTicket) => {
        //if(!calling){
            //setCalling(true);
            var ticketNumber = theTicket.ticket_number.toString();
            var counter_code = theTicket.counter.counter_code.toString();  
            var callDone = await monitorCalling.letCall(ticketNumber, counter_code)
            .then((response)=>{
                console.log("next", response);
                if(callDone){
                    if(theTicket.iscallNext){
                        var temp = [...ticketCalled, theTicket];
                        setTicketCalled(temp);
                    }
                    
                    setCalling(false); 
                    
                }
            });

        //}
    }
    const queueCallTicket = () => {
        console.log("queueCallTicket()", !calling);        
        if(!calling){
            //setCalling(true);
            console.log("not Calling");
            console.log(refcallTicket.current);
            console.log(refcallTicket.current.length);
            if(refcallTicket.current && refcallTicket.current.length > 0){                         
                console.log("shoutcallTicket here");  
                setCalling(true)         
                //console.log(refcallTicket.current[0]);
                shoutCaller(refcallTicket.current[0]);
                
                
            }

        }
        
    }

    const getTicket = (id, iscallNext = true) => {
        monitorService.getTicket(id)
            .then((response) => {
                //console.log(response.data);
                var theticket = response.data;
                theticket.iscallNext= iscallNext;
                var temp = [...refcallTicket.current, theticket];                
                //var temp = [callTicket, theticket];
                refcallTicket.current = temp;
                setcallTicket(refcallTicket.current);                
                
            }).catch((err) => {
                
            });
    }
    const callNext = () => {}
    const recall = () => {}

    const setupSocket = () => {
        if(!socket){
            const newSocket = io(process.env.REACT_APP_API_URL);
            
            newSocket.on("connect", ()=>{
                console.log("Socket connected");
            })
            newSocket.on("disconnect", () => {
                console.log("disconnect from setupsocket");
                setSocket();
                setTimeout(setupSocket, 3000);
            });
            newSocket.emit("joinRoom", "monitor");
            newSocket.on("calling", (id)=>{
                console.log("should call ticket : "+ id);                
                getTicket(id);
                if(!calling){
                    queueCallTicket();
                }
            })
            
            setSocket(newSocket);
        }
    }

    const dismantleSocket = () => {
        if(socket){
            socket.off("calling", ()=>{
                console.log("off calling");
            });
            socket.emit("leaveRoom", "monitor");
            socket.disconnect();            
            setSocket();
        }
    }
    
    
    useEffect(() => {
        document.body.classList.add('monitor-page');
        getAudio();
        setupSocket();
      return () => {
          dismantleSocket();
        
      };
    }, [])  
    useEffect(() => {
        if(!calling)
        queueCallTicket();
    }, [callTicket, calling]) 
    /* for testing purpose */
    const testNomor = useRef();
    const testSubmit = (e) => {
        e.preventDefault();
        getTicket("5f8c24e5aa21111d28bfc97f")
        //var nomor = testNomor.current.value;
        //if(nomor) shoutCaller(nomor, "7")
    }
    const testButton = (e) => {
        e.preventDefault();
        //getTicket("5f8c24e5aa21111d28bfc97f")
        refcallTicket.current = callTicket;
        console.log(refcallTicket.current);
        refcallTicket.current.splice(0, 1);
        console.log(refcallTicket.current);
    }
    /* end for testing purpose */
  return (
    <>
        {audioList &&
            <ListAudio audioList={audioList} />
        }
        <div className="monitor-wrapper mt-2">
            <MonitorList calling={calling} currentCall={callTicket[0]} />
        </div>
        <form className="form-inline" onSubmit={testSubmit} >
            <input ref={testNomor} className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
            <button className="btn btn-outline-success my-2 my-sm-0" type="submit" id="submit">Play</button>
            <button onClick={testButton} className="btn btn-outline-success my-2 my-sm-0" >Play call</button>
        </form>
    
    </>
  );
}
