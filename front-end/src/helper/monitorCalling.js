    const letCall = (ticketNumber, counterNumber) => {
        return new Promise(resolve => {
            var time = 0;        
            setTimeout(()=>{
                time = callingNumber(ticketNumber)                 
                setTimeout(()=>{
                    time = toCounter()                    
                    setTimeout(()=>{
                        time = callingNumber(counterNumber)                               
                        setTimeout(()=>{
                            
                            
                                console.log("call done"); 
                                resolve(true)
                            
                            //setCalling(false);       
                        }, time);
                    }, time);
                }, time);
            }, time); 
        });
    }
      
    const toCounter = () => {
        var totalwaktu = 0;
        setTimeout(function(){
            play("audioTO");
        }, totalwaktu);
        totalwaktu =totalwaktu+1100;  
        setTimeout(function(){
            play("audioCOUNTER");
        }, totalwaktu);        
        totalwaktu =totalwaktu+1100;  
        return totalwaktu;

    }    
    
    const repeatCall = (j, number) => {        
        setTimeout(function(){
            play("audio"+number);
        }, 1100*j);

    }
    const callingNumber = (ticketNumber) => {        
        var totalwaktu = 0;
        var arrayChar = Array.from(ticketNumber);        
        var sisa = ticketNumber;
        var charlength = arrayChar.length-1; 
       
        var j = 0
        for (var i = 0; i < arrayChar.length; i++) {
            
            var number = arrayChar[i] * Math.pow(10, (charlength-i));
            if(number>9999){
                //not yet
                

            }else if(sisa<20){
                repeatCall(j, sisa);
                totalwaktu = totalwaktu+1100;
                j++;
                sisa = 0;
                //console.log(totalwaktu);
                break;

            }else if(number !== 0){
                repeatCall(j, number);
                totalwaktu = totalwaktu+1100;
                j++;
            }
            sisa -= number;
            //console.log(number);
            //console.log(sisa);
            //console.log(totalwaktu);
            if(sisa === 0) break;
            

        }
        return totalwaktu;
              
    }

    //PLAY FRAMEWORK
	const play = (id) =>
	{
		const playPromise=document.getElementById(id).play();
		if(playPromise !== null) // Jika tidak diblock browser, jalankan
		{
			playPromise.catch(() => {
				document.getElementById(id).pause();
				document.getElementById(id).currentTime=0;
				document.getElementById(id).play();
			})
		}
	}
    

    
const monitorCalling = {    
    letCall
}
    
module.exports = monitorCalling;