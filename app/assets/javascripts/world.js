$(document).ready(function(){
	var map_world;
	mapboxgl.accessToken = 'pk.eyJ1IjoiYW50b3RvIiwiYSI6ImNpdm15YmNwNTAwMDUyb3FwbzlzeWluZHcifQ.r44fcNU5pnX3-mYYM495Fw';
	var map_world = new mapboxgl.Map({
      container: 'map_world',
      style: 'mapbox://styles/antoto/cj2ag69ai004t2so52a29mn8i',
      zoom: 1
    });
    map_world.addControl(new mapboxgl.NavigationControl());
});