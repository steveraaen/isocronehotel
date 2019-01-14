## Purpose

This site is intended to help users compare hotel locations in large cities based on the number and quality of nearby restaurants.<br>

### Isochrones

An isochrone is a geospatial feature that determines a person's traveling range in a set amount of time.<br>
The request includes a "profile" that selects walking, cycling or driving.
This site uses "walking".<br>

### Displays / Lifecycle

### Cities
The default location is Madrid, Spain.
There is a "vanilla" autocomplete input at the upper left that allows the user to input the partial name of a major city, and the user is presented with a list of matching cities. 
Clicking a city will re-center the map, retrieve a list of hotels, and draw a new isochrone around the city center 
The list of cities is not color coded.<br>

### Hotels
A list of hotels nearest the city center is displayed by clicking "Hotels in (city name)", and circle markers appear on the map, color coded by the Yelp rating each hotel.  Mousing over the hotel on the list will present a larger, different colored circle to indicate the hotel's location.  Mousing over the circle marker displays the hotel name in a tooltip.<br>
 
Clicking the hotel (on the list) will display details about the hotel as well as a list of the nearest restaurants, and the map will zoom on the hotel and replace the hotel markers with restaurant markers.

### Restaurants

### Color Coding

The list of hotels and restaurants is sorted by the overall Yelp rating, form best to worst.<br>
Colors extend to the circle markers as wll as the lists.
