## Purpose

This site is intended to help users compare hotel locations in large cities based on the number and quality of nearby restaurants.<br>

### Isochrones

An isochrone is a geospatial feature that determines a person's traveling range in a set amount of time.<br>
The request includes a "profile" that selects walking, cycling or driving.
This site uses "walking".<br>

### Displays / Lifecycle

### Hotels
The default location is Madrid, Spain.
There is a "no dependency" autocomplete input at the upper left that allows the user to input the partial name of a major city.
User is presented with a list of matching cities.  

The list of cities is not color coded.
Clicking a city will re-center the map, retrieve a list of hotels, and draw a new isochrone around the hotel closest to the city center.<br>

It will also place circle markers on the map, representing each hotel on the list.<br>
MouseOver a circle marker to view the name of the hotel in a popup.<br>
Click the hotel (on the list) to view the hotel details as well as a list of the nearest restaurants. 

### Restaurants

### Color Coding

The list of hotels and restaurants is sorted by the overall Yelp rating, form best to worst.<br>
Colors extend to the circle markers as wll as the lists.
