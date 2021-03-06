# iCamp
 This app allows the user to find a national or state park.  Then the user can see the current weather, find directions and browse activities.  The weather forecast will be displayed and directions will be provided.
	
## Table of contents
* [General info](#general-info)
* [Screenshots](#screenshots)
* [Technologies](#technologies)
* [Setup](#setup)
* [Features](#features)
* [Status](#status)
* [Inspiration](#inspiration)
* [Contact](#contact)
	
## General info
As people plan their outdoor adventures they want to find new parks and what the weather will be.  This app will allow the user to find the answers to these questions in one spot!
	
## Screenshots
![Example screenshot](./Develop/images/icamp-screenshot.png)

## Technologies
* HTML5
* CSS 2.1
* JavaScript 1.8
* Bulma
* Ipify
* ip-api
	
## Setup
Visit: https://dragoonkite.github.io/iCamp
	
## Code Examples
```
var saveSearch = function(){
    //remove duplicates
    uniqueSearch = [...new Set(pastSearch)];
    pastSearch = Array.from(uniqueSearch);
    while (pastSearch.length > 3){
        pastSearch.shift();
    };
    localStorage.setItem('pastSearch', JSON.stringify(pastSearch));
```

	
## Features
* Choose a National Park
* Find the weather forcast for specific dates
* See different attractions and amenities for each park
* Find directions to the park

**To-do list:**
* Add the dates to user's calendar
* Make future reservations for specific campsites
	
## Status
This project is currently in progress.  As new technologies emerge and client needs change, updates will be completed.
	
## Inspiration
When planning a trip to the National Parks, knowing the dates, weather, amenities, activities and directions in one app is a valuable asset.
	
## Contact
Created by Frank Depoalo [@frank.depaolo@yahoo.com](https://github.com/DragoonKite/) - feel free to contact me!<br/>
Created by Ramon Flowers [@rocketorangemen@gmail.com](https://github.com/rocketorangemen/) - feel free to contact me!<br/>
Created by Jason Fletcher [@blueink38@yahoo.com](https://github.com/blueink38/) - feel free to contact me!<br/>
Created by Erix Flores [@erixflores@gmail.com](https://github.com/erixflores/) - feel free to contact me!<br/>
Created by Nice Duran [@nvduran@gmail.com](https://github.com/nvduran/) - feel free to contact me!<br/>
