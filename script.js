  //[STEP 1] ensure our doc is ready first
  $(document).ready(function () {
    $("#bus-dashboard").hide();
    $("#loading").hide();
  
    //[STEP 2]: Create a listener then prevent default form option
    $("#frm-query").submit(function (e) {
      e.preventDefault();
  
      //test our response from api
      console.log('submitting form');
      let userBusCode = $('#txt-busstop-code').val();
      //[STEP 2A]: @TODO do validation etc :) 
  
      //[STEP 3]: if theres user input process it
      if (userBusCode) {
        getArrivalByBusStopCode(userBusCode);
      } 
    });//end listener
  
    //[STEP 4] create a function to process and make pretty
    function getArrivalByBusStopCode(userBusCode) {
  
      //our ajax settings 
      var settings = {
        "url": `https://cors-anywhere.herokuapp.com/http://datamall2.mytransport.sg/ltaodataservice/BusArrivalv2?BusStopCode=${userBusCode}`,
        "method": "GET",
        "headers": { //replace with your own API key
          "AccountKey": "pCqWgVJtQIGF4kC/X1/o7g=="
        },
        "beforeSend": function() {
          $("#loading").show();
        }
      };
  
      //[STEP 5] ensure our ajax works fine then cycle through
      $.ajax(settings).done(function (response) {
  
        //check response
        console.log(response);
        //make it easier for us to access
        const services = response.Services;
  
        //[STEP 6] Let's cycle through the data
        //we keep appending to our arrivals string
        let arrivals = "";
        for(var i = 0 ; i <services.length; i++){
          
          arrivals = `<tr>${arrivals}
          <td>${services[i].ServiceNo}</td>        
          <td>
          <div>Arrival Time: ${services[i].NextBus.EstimatedArrival}</div>
          </td>
           <td>
          <div>Arrival Time: ${services[i].NextBus2.EstimatedArrival}</div>
          </td>
           <td>
          <div>Arrival Time: ${services[i].NextBus3.EstimatedArrival}</div>
          </td></tr>`;
        }
        
        $("#bus-dashboard").toggle();
        $("#loading").toggle();
  
        //update UI 
        $("#usr-busstop-code").html(userBusCode);
        $("#bus-arrivals").html(arrivals);
        
      });
    }//end event handling for form 
  
    //make pretty our dates
    function dateFormat(estimatedArrival){
      //2020-12-23T18:54:08+08:00
      //apply date object and return a neater format
      
    }
  });//end doc ready

//Weather Section
var weather = document.querySelector('.load');
var desc = document.querySelector('.desc');
var temp = document.querySelector('.temp');

weather.addEventListener('click',function(){
  fetch('https://api.openweathermap.org/data/2.5/weather?q=Singapore,sg&appid=228e17b1d67eda87fcbe05ade9e1245d')
  .then(response => response.json())
  .then(data => {
    var tempValue = data['main']['temp'];
    var descValue = data['weather'][0]['description'];

    temp.innerHTML = 'Temperature: ' + Math.round(((tempValue -273.15)*100)/100) + '°C';
    desc.innerHTML = 'Description: ' + descValue;
  })

.catch(err => alert("Wrong City Name!"));
});


