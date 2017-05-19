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
      style: 'mapbox://styles/mapbox/streets-v10',
      center: [-96, 37.8],
      zoom: 4
    });

    // display control
    map.addControl(new mapboxgl.NavigationControl());

    // center map on selected marker
    map.on('click', 'markers', function (e) {
        map.flyTo({
          center: e.features[0].geometry.coordinates,
          zoom: 1
        });
    });

    // change mouse action on enter / leave in marker
    map.on('mouseenter', 'markers', function () {
        map.getCanvas().style.cursor = 'pointer';
    });
    map.on('mouseleave', 'markers', function () {
        map.getCanvas().style.cursor = '';
    });

    $.ajax({
        dataType: 'json',
        url: grabTravelData(),
        success: function(data) {
            geojson = data;
            map.addSource("markers", {
                "type": "geojson",
                "data": {
                    "type": "FeatureCollection",
                    "features": data
                }
            });
            map.addLayer({
                "id": "markers",
                "type": "circle",
                "source": "markers",
                "paint": {
                    "circle-radius": 7,
                    "circle-color": "#ff7e5f"
                },
            });
            // center map on markers
            var bounds = new mapboxgl.LngLatBounds();
            data.forEach(function(feature) {
                bounds.extend(feature.geometry.coordinates);
            });
            map.fitBounds(bounds);

            map.on('click', 'markers', function (e) {
                new mapboxgl.Popup()
                    .setLngLat(e.features[0].geometry.coordinates)
                    .setHTML("<h4>" + e.features[0].properties.place + "</h4>" + "<p>" + e.features[0].properties.time + " jours </p>" + "<p>" + e.features[0].properties.desc +  "</p>")
                    .addTo(map);
            });

            for(var i = 0; i < data.length; i++) {
                var last = data.length - 1
                var from = data[i];
                var to = data[i + 1];
                if(i != last) {
                    apiCall(from.geometry.coordinates[0], from.geometry.coordinates[1], to.geometry.coordinates[0], to.geometry.coordinates[1], mapboxgl.accessToken, i);
                } else {
                    apiCall(from.geometry.coordinates[0], from.geometry.coordinates[1], from.geometry.coordinates[0], from.geometry.coordinates[1], mapboxgl.accessToken, i);
                }
            }
        }, error: function(data) {
            console.log(data + ' error');
        }
    });

    function apiCall(from_one, from_two, to_one, to_two, token, number) {
      var number = "route" + number;
      $.get("https://api.mapbox.com/directions/v5/mapbox/driving/" + from_one + "," + from_two + ";" + to_one + "," + to_two + "?access_token=" + token + "&geometries=geojson", function(data) {
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
            'line-color': '#ff7e5f',
            'line-width': 2,
          },
        });
      });
    }

    // get modals
    function _getModal() {
        $('#city_country').click(function(e) {
            e.preventDefault();
            $('#modal_roadin').toggleClass('modal-roadin-open');
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
        arrows: false
      });
    }

    // init functions
    _getModal();
    _aglgoliaSearch();
    _slickInit();

});
