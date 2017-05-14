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
      zoom: 5
    });

    // center map on selected marker
    map.on('click', 'markers', function (e) {
        map.flyTo({center: e.features[0].geometry.coordinates});
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
            for(var i = 0; i < data.length; i++) {
                var last = data.length - 1
                var from = data[i];
                var to = data[i + 1];
                if(i != last) {
                    apiCall(from.geometry.coordinates[0], from.geometry.coordinates[1], to.geometry.coordinates[0], to.geometry.coordinates[1], mapboxgl.accessToken)
                } else {
                    apiCall(from.geometry.coordinates[0], from.geometry.coordinates[1], from.geometry.coordinates[0], from.geometry.coordinates[1], mapboxgl.accessToken)
                }
            }
        }, error: function(data) {
            console.log(data + ' error');
        }
    });

    function apiCall(from_one, from_two, to_one, to_two, token) {
        var api_call = "https://api.mapbox.com/directions/v5/mapbox/driving/" + from_one + "," + from_two + ";" + to_one + "," + to_two + "?access_token=" + token;
        console.log(api_call);
    } 

    // get modals
    function _getModal() {
        $('#city_country').click(function(e) {
            e.preventDefault();
            $('#modal_roadin').toggleClass('modal-roadin-open');
        });
        $('#manage_steps').click(function(e) {
            e.preventDefault();
            $('#modal_manage').toggleClass('modal-roadin-open');
        });
    }

    // Search autocomplete using ALGOLIA search engine
    function _aglgoliaSearch() {
        var placeAutocomplete = places({
            container: document.querySelector('#address-input')
        });
    }

    // init functions
    _getModal();
    _aglgoliaSearch();

});
