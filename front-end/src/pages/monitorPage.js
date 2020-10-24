import React, { Component } from 'react';
import io from "socket.io-client";
import monitorService from '../service/monitor.service';
import monitorCalling from '../helper/monitorCalling';

import ListAudio from '../components/audioList.component';
import MonitorList from '../components/monitorList.component';

import { AudioListContext, MonitorListContext } from "../context/Contexts";
class MonitorPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            audioList:null,
            socket:null,
            calling: false,
            callTicket: [],
            currentCall: null,
            ticketCalled: [],
            test: "halo aja",         
        }
    }

    getAudio = () => { 
        monitorService.getAudio()
            .then((response) => {
                this.setState({
                    audioList: response.data
                })              
            }).catch((err) => {
                console.log(err);
            })  
    }
    setupSocket = () => {
        var socket = this.state.socket;
        console.log("setupSocket");
        if(!socket){
            const newSocket = io();
            
            newSocket.on("connect", ()=>{
                console.log("Socket connected");
            })
            newSocket.on("disconnect", () => {
                console.log("disconnect from setupsocket");
                this.setState({socket:null});                
                setTimeout(this.setupSocket, 3000);
            });
            newSocket.emit("joinRoom", "monitor");
            newSocket.on("calling", (id)=>{
                console.log("should call ticket : "+ id);                
                this.getTicket(id);
            })
            newSocket.on("reCalling", (id)=>{
                console.log("should Recall ticket : "+ id);                
                this.getTicket(id, false);
            })
            this.setState({socket:newSocket});            
        }
    }
    dismantleSocket = () => {
        var socket = this.state.socket;
        if(socket){
            socket.off("calling", ()=>{
                console.log("off calling");
            });
            socket.emit("leaveRoom", "monitor");
            socket.disconnect();            
            this.setState({socket:null}); 
        }
    }
    getTicket = (id, iscallNext = true) => {
        monitorService.getTicket(id)
            .then((response) => {
                var theticket = response.data;
                theticket.iscallNext= iscallNext;
                this.setState(state => {
                    const callTicket = [...state.callTicket, theticket];               
                    return {callTicket};
                });               
                
            }).catch((err) => {
                
            });
    }
    
    recursiveCalling = async() => {
        if(!this.state.calling){            
            console.log("recursiveCalling");
            const listCalling = this.state.callTicket            
            
            if(listCalling && listCalling.length > 0){
                this.setState({
                    calling:true,
                    currentCall: listCalling[0]
                });
                var ticketNumber = listCalling[0].ticket_number.toString();
                var counter_code = listCalling[0].counter.counter_code.toString(); 
                await monitorCalling.letCall(ticketNumber, counter_code)
                .then((response)=>{
                    if(response){
                        console.log("response: ", response);
                        setTimeout(()=>{
                            this.setState(state=>{
                                const tempCalled = state.ticketCalled;
                                const [first, ...rest] = state.callTicket;
                                if(first.iscallNext){
                                    return {
                                        callTicket: rest,
                                        ticketCalled: [first, ...tempCalled],
                                        calling:false
                                    }
                                }
                                else{
                                    return {
                                        callTicket: rest,                                        
                                        calling:false
                                    }
                                }
                                
                            });
                        },1000)                   
                                                
                    }
                })
            }
        }
        

    }
    shoutCaller = async(theTicket) => {
        if(!this.state.calling){
            this.setState({calling:true})
            var ticketNumber = theTicket.ticket_number.toString();
            var counter_code = theTicket.counter.counter_code.toString();  
            var callDone = await monitorCalling.letCall(ticketNumber, counter_code)
            .then((response)=>{
                console.log("next", response);
                if(callDone){
                    /*if(theTicket.iscallNext){
                        var temp = [...ticketCalled, theTicket];
                        setTicketCalled(temp);
                    }*/
                    
                    this.setState({calling:false})
                    
                }
            });

        }
    }
    componentDidUpdate(prevProps, prevState){
        if (this.state.callTicket !== prevState.callTicket) {
            console.log("callTicket updated");
            this.recursiveCalling();
        }
    }
    componentDidMount(){
        document.body.classList.add('monitor-page');
        this.getAudio();
        this.setupSocket();
    }
    componentWillUnmount(){
        this.dismantleSocket();
    }
    
    render() {
        return (
        <>            
            <AudioListContext.Provider value={this.state.audioList}>
                <ListAudio />
            </AudioListContext.Provider>            
            <div className="monitor-wrapper mt-2">
            <MonitorList calling={this.state.calling} currentCall={this.state.currentCall} ticketCalled={this.state.ticketCalled} />
            </div>
            <button onClick={this.recursiveCalling} className="btn btn-outline-success my-2 my-sm-0" >Play caller</button>
            
        </>
        )
    }
}

export default MonitorPage


