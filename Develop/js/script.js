var userIP = "";

var getLocation = function(){
        $.getJSON("https://api.ipify.org/?format=json", function(e) {
            var userIP = e.ip;
            return userIP;
        }).then(findLocation(userIP));
};

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
                };
            });
};

getLocation();