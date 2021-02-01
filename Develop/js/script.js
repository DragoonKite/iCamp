var userIP = "";
var userState = "";
var userLat = 0;
var userLon = 0;
var searchedState = "";
/* var searchedWeatherStart = "";
var searchedWeatherEnd = ""; */
var stateParks = [];
var selectedPark = 0;
var pastSearch = [];

var stateCodes = {AL:'alabama', AK:'alaska', AZ:'arizona', AR:"arkansa", CA:'california', CO:'colorado', CT:'connecticut', DE:'deleware', DC:'district of columbia', FL:'florida', GA:'georgia', HI:'hawaii', ID:'idaho', IL:'illinois',IN:'indiana', IA:'iowa', KS:'kansas', KY:'kentucky', LA:'louisiana', ME:'maine',MD:'maryland', MA:'massachusetts', MI:'michigan', MN:'minnesota', MS:'mississippi',MO:'missouri', MT:'montana', NE:'nebraska', NV:'nevada', NH:'new hampshire', NJ:'new jersey', NM:'new mexico', NY:'new york', NC:'north carolina', ND:'north dakota',OH:'ohio', OK:'oklahoma', OR:'oregon', PA:'pennsylvania', RI:'rhode island', SC:'south carolina', SD:'south dakota', TN:'tennessee', TX:'texas', UT:'utah', VT:'vermont',VA:'virginia', WA:'washington', WV:'west virginia', WI:'wisconsin', WY:'wyoming'};

//NPS api key - URIxdIswkdTl4euYJO1wnZGabiusT8WBy7v5SX5k
//nps apiURL - https://developer.nps.gov/api/v1

//gets the users ip then passes that data the findLocation function
var getLocation = function(){
    $.getJSON("https://api.ipify.org/?format=json", function(e) {
        userIP = e.ip;
    }).then(findLocation());
};

//uses ip address to get physical location data
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
        /* else{
            //if api fecth fails, alert the user
            alert("Error: " + response.statusText)
        }; */
    });
};

//get state parks in user's state
var parksInState = function(state){
    var apiURL = "https://developer.nps.gov/api/v1/parks?stateCode=" + state + "&api_key=URIxdIswkdTl4euYJO1wnZGabiusT8WBy7v5SX5k";

    fetch(apiURL).then(function(response){
        if(response.ok){
            response.json().then(function(data){
                //makes park list container visable to user
                $("#parkList").empty();
                $("#parkListContainer").show();
                $("#searchTitle").text('National Parks')
                //display the name of each national park
                for(var i=0; i < data.data.length; i++){
                    var listItem = $("<li>");
                    listItem.html('<span style="cursor:pointer">' + data.data[i].fullName + '</span>' );
                    //add id for other functions to track park
                    listItem.attr('id', i);
                    $("#parkList").append(listItem);
                };

                //save last searched state data for future use
                stateParks = data.data;
            });
        }
        else{
            //if api fecth fails, alert the user
            //alert("Error: " + response.statusText)
        };
    })
};

//display weather for selected park/date
var displayWeather = function(){
    var parkLat = stateParks[selectedPark].latitude;
    var parkLon = stateParks[selectedPark].longitude;
    
    var apiURLOne = "https://api.openweathermap.org/data/2.5/onecall?lat=" + parkLat + "&lon=" + parkLon + "&exclude=minutely,hourly&units=imperial&appid=1ec4b7941e836b90f16c4552ee588075"

    $("#rightBar").css('background-image', 'url(' + stateParks[selectedPark].images[0].url + ')');

    fetch(apiURLOne).then(function(response){
        if(response.ok){
            response.json().then(function(data){
                //current weather data
                $("#weatherContainer").empty();
                var temp = $("<div>").text("Temperature: " + data.current.temp + "\u00b0 F").addClass('right-style');
                var hum = $("<div>").text("Humidity: " + data.current.humidity + "%").addClass('right-style');
                var wind = $("<div>").text("Wind Speed: " + data.current.wind_speed + " MPH").addClass('right-style');
                var uvi = $("<div>").text("UV Index: " + data.current.uvi).addClass('right-style');
                $("#weatherContainer").append(temp,hum,wind,uvi,$("<div>").text('4-Day Forecast').addClass('fourday'));
                $("#forestSide").addClass('right-side right-style')


                //forecast data
                var cardHolder = $("<div>").attr('id', 'weatherCardHolder')
                .addClass('right-style')
                .addClass('tile is-parent');
            
                for(var i=0; i < 4; i++){
                    var forecastDate = dayjs().add(i+1,'d').format("MMM-DD-YYYY");
                    var forecastTemp = data.daily[i].temp.day;
                    var forecastHumid = data.daily[i].humidity;
                    var forecastCoverIcon = data.daily[i].weather[0].icon;
                    var forecastCoverDesc = data.daily[i].weather[0].description;

                    //create card
                    var forecast = $("<div>").addClass('tile is-child is-3');
                    forecast.html("<h5>" + forecastDate + "</h5><img src='http://openweathermap.org/img/wn/" + forecastCoverIcon + "@2x.png' alt='" + forecastCoverDesc + "'></span><div>Temp: " + forecastTemp + " \u00B0 F </div><span>Humidity: " + forecastHumid + "%</span>");

                    //add card
                    cardHolder.append(forecast);
                };
                $("#weatherContainer").append(cardHolder);
            });
        }
        else{
            //if api fetch fails, alert the user
            //alert("Error: " + response.statusText)
        };
    });
};

//save up to last three searches
var saveSearch = function(){
    //remove duplicates
    uniqueSearch = [...new Set(pastSearch)];
    pastSearch = Array.from(uniqueSearch);
    while (pastSearch.length > 3){
        pastSearch.shift();
    };
    localStorage.setItem('pastSearch', JSON.stringify(pastSearch));
};

//load up to last three searches
var loadSearchHistory = function(){
    //load history from local storage
    pastSearch = JSON.parse(localStorage.getItem('pastSearch'));

    //if nothing retrieved, set variable to empty array
    if(!pastSearch){
        pastSearch = []
    }
    else{
        displayHistory(pastSearch);
    };
};

var displayHistory = function(){
    if(pastSearch.length > 0){
        $("#parkListContainer").show()
        $("#searchTitle").text('Last 3 Searches');
        for (var i=0; i < pastSearch.length; i++){
            var listItem = $("<li>").html('<span style="cursor:pointer">' + pastSearch[i] + '</span>');
            $("#parkList").append(listItem)
        }
    };
};

var verifyState = function(state){
    for(key in stateCodes){
      
        if (state === stateCodes[key] || state.toUpperCase() === key){
            //if so, clear searchbox and send 2 letter code to nps api
            $(".submit")[0].value = "";
            $(".submit")[0].placeholder = "Search by State"
            parksInState(key)
            //save search after capitalizing 
            var saveItem = stateCodes[key].replace(/\b[a-z]/g, function(txtVal) {
                return txtVal.toUpperCase();
            });
            pastSearch.push(saveItem);
            saveSearch();
            return;
        }     
    }

    //if not; clear searchbox and ask user to re-enter a search option
    $(".submit")[0].value = "";
    $(".submit")[0].placeholder = "That state is not recognized. Please enter another.";
};
/* var weatherBtnCheck = function(){
    if(searchedWeatherStart !== "" && searchedWeatherEnd !== ""){
        $("#weatherSearchBtn").show();
    }
} */


$("#stateSearchBtn").on('click', function(){
    searchedState = $(".submit")[0].value.toLowerCase();
    //checks to see if the value listed is one fo the states or the short 2 letter state code
    verifyState(searchedState);

});

/* $("#weatherDateMax").change(function(){
    //pulls date selected from calendar
    searchedWeatherStart = dayjs(this.value);
    console.log(searchedWeatherStart);
    weatherBtnCheck();
});

$("#weatherDateMin").change(function(){
    //pulls date selected from calendar
    searchedWeatherEnd = dayjs(this.value);
    console.log(searchedWeatherEnd);
    weatherBtnCheck();
}); */



$("#parkList").on('click', 'li',  function(){
    //display weather date selection
   /*  $("#weatherDateMax").show();
    $("#weatherDateMin").show(); */
    if($("#searchTitle").text() === 'Last 3 Searches'){
        verifyState(this.textContent.toLowerCase())
    }
    else{
        $("#rightBar p").html("Current Weather for " + this.textContent);
        //get selected park
        selectedPark = this.id
        displayWeather();
        $("#extrasContainer").show();
    }
});

$("#moreInfoBtn").on('click', function(){
    
    var parkEmail = stateParks[selectedPark].contacts.emailAddresses[0].emailAddress;
    var parkPhone = stateParks[selectedPark].contacts.phoneNumbers[0].phoneNumber;
    var direcBlurb = stateParks[selectedPark].directionsInfo;
    var direcLink = stateParks[selectedPark].directionsUrl;
    var parkEntranceFees = stateParks[selectedPark].entranceFees;
    var parkFees = stateParks[selectedPark].fees;
    var parkHours = stateParks[selectedPark].operatingHours[0].standardHours;
    var topics = stateParks[selectedPark].topics;
    
})

$("#activityBtn").on('click', function(){
    //pull activities from saved park data
    var activities = stateParks[selectedPark].activities;
    //clear list to prevent duplicate lists
    var activitiesList = $("#activitiesList").empty();
    for(var i=0; i<activities.length; i++){
        //create list item with activity name
        var activity = $("<li>").textContent = activities[i].name + '<br>';
        activitiesList.append(activity)
    };
    console.log(activitiesList)
});

$("#mapBtn").on('click', function(){
    //get park location
    var parkLat = stateParks[selectedPark].latitude;
    var parkLon = stateParks[selectedPark].longitude;
    
    //directions api
    var apiUrl = "https://api.tomtom.com/routing/1/calculateRoute/" + userLat + "," + userLon + ":" + parkLat + "," + parkLon + "/json?instructionsType=text&language=en-US&vehicleHeading=90&sectionType=traffic&travelMode=car&vehicleMaxSpeed=120&key=XjgzSQAHv6Y5ZapTlCcMmnYfMz0ezyB1";

    fetch(apiUrl).then(function(response){
        if(response.ok){
            response.json().then(function(data){
                //clear directions list to prevent duplicates
                var directionsList = $("#directionsList").empty()
                for(var i=0; i < data.routes[0].guidance.instructionGroups.length; i++){
                    //create list item of each direction
                    var direction = $("<li>").textContent = (i+1) + ") " + data.routes[0].guidance.instructionGroups[i].groupMessage + '<br>'
                    directionsList.append(direction)
                }
                
            });
        }
       /*  else{
            //if api fetch fails, alert the user
            alert("Error: " + response.statusText)
        }; */
    });
});

//modal section start
$(".more").click(function() {
    var target = $(this).data("target");
    $("html").addClass("is-clipped");
    $(target).addClass("is-active");
 });
 
 $(".modal-close").click(function() {
    $("html").removeClass("is-clipped");
    $(this).parent().removeClass("is-active");
 });
//modal section end

loadSearchHistory();
getLocation();