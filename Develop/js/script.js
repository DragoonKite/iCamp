var userIP = "";
var userState = "";
var userLat = 0;
var userLon = 0;
var searchedState = "";
var searchedWeather = "";
var stateParks = [];

var stateCodes = {AL:'alabama', AK:'alaska', AZ:'arizona', AR:"arkansa", CA:'california', CO:'colorado', CT:'connecticut', DE:'deleware', DC:'district of columbia', FL:'florida', GA:'georgia', HI:'hawaii', ID:'idaho', IL:'illinois',IN:'indiana', IA:'iowa', KS:'kansas', KY:'kentucky', LA:'louisiana', ME:'maine',MD:'maryland', MA:'massachusetts', MI:'michigan', MN:'minnesota', MS:'mississippi',MO:'missouri', MT:'montana', NE:'nebraska', NV:'nevada', NH:'new hampshire', NJ:'new jersey', NM:'new mexico', NY:'new york', NC:'north carolina', ND:'north dakota',OH:'ohio', OK:'oklahoma', OR:'oregon', PA:'pennsylvania', RI:'rhode island', SC:'south carolina', SD:'south dakota', TN:'tennessee', TX:'texas', UT:'utah', VT:'vermont',VA:'virginia', WA:'washington', WV:'west virginia', WI:'wisconsin', WY:'wyoming'};

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
var parksInState = function(state){
    var apiURL = "https://developer.nps.gov/api/v1/parks?stateCode=" + state + "&api_key=URIxdIswkdTl4euYJO1wnZGabiusT8WBy7v5SX5k";
    console.log(apiURL)

    fetch(apiURL).then(function(response){
        if(response.ok){
            response.json().then(function(data){
                //makes park list container visable to user
                $("#parkListContainer").show();
                //display the name of each national park
                for(var i=0; i < data.data.length; i++){
                    var listItem = $("<li>");
                    listItem.text(data.data[i].fullName);
                    $("#parkList").append(listItem);
                };

                //save last searched state data for future use
                stateParks = data.data;
                console.log(stateParks);
            });
        }
        else{
            //if api fecth fails, alert the user
            alert("Error: " + response.statusText)
        };
    })
};

$("#stateSearchBtn").on('click', function(){
    searchedState = $(".submit")[0].value.toLowerCase();
    //checks to see if the value listed is one fo the states or the short 2 letter state code
    for(key in stateCodes){
      
        if (searchedState === stateCodes[key] || searchedState.toUpperCase() === key){
            //if so, clear searchbox and send 2 letter code to nps api
            $(".submit")[0].value = "";
            parksInState(key)
            return;
        }     
    }

    //if not; clear searchbox and ask user to re-enter a search option
    $(".submit")[0].value = "";
    $(".submit")[0].placeholder = "That state is not recognized. Please enter another.";

});

$("#weatherDate").change(function(){
    searchedWeather = dayjs(this.value);
});

getLocation();