var userIP = "";
//NPS api key - URIxdIswkdTl4euYJO1wnZGabiusT8WBy7v5SX5k

//gets the users ip then passes that data the findLocation function
var getLocation = function(){
    $.getJSON("https://api.ipify.org/?format=json", function(e) {
        userIP = e.ip;
    }).then(findLocation(userIP));
};

//uses ip ddress to get physical location data
var findLocation = function(ip){
    var apiURL = "http://ip-api.com/json/" + ip;
    
    fetch(apiURL).then(function(response){
        if(response.ok){
            response.json().then(function(data){
                console.log(data)
                console.log("Your location is " + data.city + "," + data.region + " " + data.zip + "\n Lat: "  + data.lat + "\n Lon: " + data.lon)
            });
        }
        else{
            //if api fecth fails, alert the user
            alert("Error: " + response.statusText)
        };
    });
};
console.log(dayjs());
getLocation();