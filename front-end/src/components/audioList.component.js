import React from 'react'
import { AudioListContext } from "../context/Contexts";

export default function ListAudio() {
  return (
    <>
      <AudioListContext.Consumer>
        {(audioList)=>(
          <div>            
            {(audioList || []).map((audiofile,index) => (
              <audio key={index} id={`audio${audiofile.ID}`} className="audioitem" src={audiofile.link}>{audiofile.file}</audio>
            ))}
            
          </div>
        )}

      </AudioListContext.Consumer>
      {/*audioList.map((audiofile,index) => (
          <audio key={index} id={`audio${audiofile.ID}`} className="audioitem" src={audiofile.link}>{audiofile.file}</audio>
      ))*/}    
    </>
  );
}