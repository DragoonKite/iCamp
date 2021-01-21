var userIP = "";
var userState = "";
var userLat = 0;
var userLon = 0;

//NPS api key - URIxdIswkdTl4euYJO1wnZGabiusT8WBy7v5SX5k
//nps apiURL - https://developer.nps.gov/api/v1

//gets the users ip then passes that data the findLocation function
var getLocation = function(){
    $.getJSON("https://api.ipify.org/?format=json", function(e) {
        userIP = e.ip;
    }).then(findLocation());
};

//uses ip ddress to get physical location data
var findLocation = function(){
    var apiURL = "http://ip-api.com/json/" + userIP;
    
    fetch(apiURL).then(function(response){
        if(response.ok){
            response.json().then(function(data){
                userState = data.region;
                userLat = data.lat;
                userLon = data.lon;
            });
        }
        else{
            //if api fecth fails, alert the user
            alert("Error: " + response.statusText)
        };
    });
};

//get state parks in user's state
var parksInState = function(){
    console.log(userState);
    var apiURL = "https://developer.nps.gov/api/v1/parks?stateCode=" + userState + "&api_key=URIxdIswkdTl4euYJO1wnZGabiusT8WBy7v5SX5k";
    console.log(apiURL)

    fetch(apiURL).then(function(response){
        if(response.ok){
            response.json().then(function(data){
                console.log(data)
            });
        }
        else{
            //if api fecth fails, alert the user
            alert("Error: " + response.statusText)
        };
    })
};
$("h1").on('click', function(){
    parksInState();
})

getLocation();