function grabTravelData(travel_id) {
    url: '/' + travel_id + '/show.json'
}

$(document).ready(function() {
    var map;
    var directions;

    // token access for MAPBOX GL
    mapboxgl.accessToken = 'pk.eyJ1IjoiYW50b3RvIiwiYSI6ImNpdm15YmNwNTAwMDUyb3FwbzlzeWluZHcifQ.r44fcNU5pnX3-mYYM495Fw';

    // generate map
    var map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/antoto/cj2ag69ai004t2so52a29mn8i',
      center: [-96, 37.8],
      zoom: 4
    });

    // display control
    map.addControl(new mapboxgl.NavigationControl());

    // center map on selected marker
    map.on('click', 'markers', function (e) {
        map.flyTo({
          center: e.features[0].geometry.coordinates
        });
    });

    // change mouse action on enter / leave in marker
    map.on('mouseenter', 'markers', function () {
        map.getCanvas().style.cursor = 'pointer';
    });
    map.on('mouseleave', 'markers', function () {
        map.getCanvas().style.cursor = '';
    });
	
    map.on('load', function() {
      $.ajax({
          dataType: 'json',
          url: grabTravelData(),
          success: function(data) {
			  console.log(data);
			  console.log(data.near.length);
              geojson = data;
              map.addSource("markers", {
                  "type": "geojson",
                  "data": {
                      "type": "FeatureCollection",
                      "features": data.geojson
                  }
              });
              map.addLayer({
                  "id": "markers",
                  "type": "symbol",
                  "source": "markers",
                  "layout": {
                      "icon-image": "{marker-symbol}",
                      "icon-size": 1,
                      "icon-offset": [0, -16]
                  }
              });
			  
			  for(var inc = 0; inc < data.near.length; inc++) {
  			  	var el = document.createElement('div');
  				el.className = 'Roadin-map--display-friends';
  				el.style.backgroundImage = 'url(' + data.near[inc].properties.img + ')';
				var popup = new mapboxgl.Popup({offset: 25})
			    	.setHTML('<h3>' + data.near[inc].properties.travel + '</h3>'
						   + '<h6>' + data.near[inc].properties.author + '</h6>');
  				new mapboxgl.Marker(el)
  					.setLngLat(data.near[inc].geometry.coordinates)
					.setPopup(popup)
  					.addTo(map);
			  }
			  
              // center map on markers
              var bounds = new mapboxgl.LngLatBounds();
              data.geojson.forEach(function(feature) {
                  bounds.extend(feature.geometry.coordinates);
              });
              map.fitBounds(bounds);

              map.on('click', 'markers', function (e) {
                  new mapboxgl.Popup()
                      .setLngLat(e.features[0].geometry.coordinates)
                      .setHTML("<h4>" + e.features[0].properties.place + "</h4>" 
                              + "<p>" + e.features[0].properties.time + " jours </p>" 
                              + "<p>" + e.features[0].properties.desc +  "</p>" 
                              + "<p>" + "<a href=" + e.features[0].properties.toolbox 
                              + " target='_blank' class='btn btn-cst-cherry-xs btn-xs'>Toolbox</a>" + "</p>")
                      .addTo(map);
              });
			  
              map.on('click', 'near', function (e) {
                  new mapboxgl.Popup()
                      .setLngLat(e.features[0].geometry.coordinates)
                      .setHTML("<h4>" + e.features[0].properties.travel + "</h4>" 
				  	 		 + "<h6>" + e.features[0].properties.author + "</h6>"
                             + "<p>" + e.features[0].properties.place)
                      .addTo(map);
              });

              for(var i = 0; i < data.geojson.length; i++) {
                  var last = data.geojson.length - 1
                  var from = data.geojson[i];
                  var to = data.geojson[i + 1];
				  console.log(to);
                  if(i != last) {
                    // si beug, supprimer la condition boat
					  if(to.properties.plane != true && to.properties.boat != true) {
	                      apiCall(
	                        from.geometry.coordinates[0], 
	                        from.geometry.coordinates[1], 
	                        to.geometry.coordinates[0], 
	                        to.geometry.coordinates[1], 
	                        mapboxgl.accessToken, 
	                        i
	                      );
					  } else {
					  	planePolyline(
	                        from.geometry.coordinates[0], 
	                        from.geometry.coordinates[1], 
	                        to.geometry.coordinates[0], 
	                        to.geometry.coordinates[1], 
							i
					  	)
					  }
                  } else {
					  if(from.properties.plane != true && to.properties.boat != true) {
	                      apiCall(
	                        from.geometry.coordinates[0], 
	                        from.geometry.coordinates[1], 
	                        from.geometry.coordinates[0], 
	                        from.geometry.coordinates[1], 
	                        mapboxgl.accessToken, 
	                        i
	                      );
					  } else {
  					  	planePolyline(
  	                        from.geometry.coordinates[0], 
  	                        from.geometry.coordinates[1], 
  	                        from.geometry.coordinates[0], 
  	                        from.geometry.coordinates[1], 
  							i
  					  	)
					  }
                  }
              }
          }, error: function(data) {
              console.log(data.geojson + ' error');
          }
      });
    });

	// if plane is checked on BDD -> display polyline
	function planePolyline(from_one, from_two, to_one, to_two, number) {
		var number = "line" + number;
		var origin = [from_one, from_two];
		var destination =  [to_one, to_two];
		var route = {
		    "type": "FeatureCollection",
		    "features": [{
		        "type": "Feature",
		        "geometry": {
		            "type": "LineString",
		            "coordinates": [
		                origin,
		                destination
		            ]
		        }
		    }]
		};
		var lineDistance = turf.lineDistance(route.features[0], 'kilometers');
		var arc = [];
		for (var i = 0; i < lineDistance; i++) {
		    var segment = turf.along(route.features[0], i / 1000 * lineDistance, 'kilometers');
		    arc.push(segment.geometry.coordinates);
		}
		route.features[0].geometry.coordinates = arc;
		var get_middle = arc.length / 2;
		map.addSource(number, {
		   "type": "geojson",
		   "data": route
		});
		map.addLayer({
		   "id": number,
		   "source": number,
		   "type": "line",
		   "paint": {
		       "line-width": 2,
		       "line-color": "#007cbf"
		   }
		});
	}

	// else -> display routes
    function apiCall(from_one, from_two, to_one, to_two, token, number) {
      var number = "route" + number;
      $.get("https://api.mapbox.com/directions/v5/mapbox/driving/" 
          + from_one + "," + from_two + ";" + to_one + "," + to_two 
          + "?access_token=" + token 
          + "&geometries=geojson", 
          function(data) {
        map.addLayer({
          id: number,
          type: 'line',
          source: {
            type: 'geojson',
            data: {
              type: 'Feature',
              properties: {},
              geometry: data.routes[0].geometry,
            },
          },
          layout: {
            'line-join': 'round',
            'line-cap': 'round',
          },
          paint: {
            'line-color': '#FE405E',
            'line-width': 3,
          },
        });
      });
    }

    // get modals
    function _getModal() {
        $('#Roadin_click_first_modal').click(function(e) {
            e.preventDefault();
            $('#Roadin_first_modal').toggleClass('Roadin-modal--open');
        });
        $('#Roadin_click_second_modal').click(function(e) {
            e.preventDefault();
            $('#Roadin_second_modal').toggleClass('Roadin-modal--open');
        });
    }

    function _closeModalsEsc() {
      $(document).keyup(function(e) {
          if (e.keyCode == 27) {
            $('#Roadin_first_modal, #Roadin_second_modal').removeClass('Roadin-modal--open');
          }
      });
    }

    // Search autocomplete using ALGOLIA search engine
    function _aglgoliaSearch() {
        var placeAutocomplete = places({
            container: document.querySelector('#address-input')
        });
    }

    function _slickInit() {
      $('.data-steps').slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 3,
        arrows: false,
        draggable: false
      });
    }

    function _navigateSlick() {
      $('#prev_steps').click(function(e){
        e.preventDefault();
        $('.data-steps').slick('slickPrev');
      });
      $('#next_steps').click(function(e){
        e.preventDefault();
        $('.data-steps').slick('slickNext');
      });
    }

    // open / close step manager on map
    function _closeOpenManager() {
      $('#Roadin-step-manager--opener').click(function(e) {
        if($(this).hasClass('ion-ios-arrow-up')) {
          $(this).removeClass('ion-ios-arrow-up');
          $(this).addClass('ion-ios-arrow-down');
          $('.Roadin-step-manager').css({
            'bottom' : 30 + 'px',
            'transition-duration' : 0.3 + 's'
          });
        } else {
          $(this).removeClass('ion-ios-arrow-down');
          $(this).addClass('ion-ios-arrow-up');
          $('.Roadin-step-manager').css({
            'bottom' : -150 + 'px',
            'transition-duration' : 0.3 + 's'
          });
        }
      });
    }

    function _tooltipManager() {
      $('[data-toggle="tooltip"]').tooltip();
    }

    function _searchFormForFriends() {
      var users = new Bloodhound({
        datumTokenizer: Bloodhound.tokenizers.obj.whitespace("name"),
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        prefetch: "/participants/autocomplete"
      });
      users.initialize();
      $('.fetch-friends.typeahead').typeahead(null, {
        displayKey: 'name',
        source: users.ttAdapter()
      });
    }

    // init functions
    _getModal();
    _closeModalsEsc();
    _aglgoliaSearch();
    _slickInit();
    _navigateSlick();
    _closeOpenManager();
    _tooltipManager();
    _searchFormForFriends();

});
