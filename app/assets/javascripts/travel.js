function grabTravelData(travel_id) {
    url: '/' + travel_id + '/show.json'
}
/*
$(document).ready(function() {
    var featureLayer;
    var geojsonLayer;
    var features;
    var bounds;
    var polyline;
    var map;

    function _initMap() {
        L.mapbox.accessToken = 'pk.eyJ1IjoiYW50b3RvIiwiYSI6ImNpdm15YmNwNTAwMDUyb3FwbzlzeWluZHcifQ.r44fcNU5pnX3-mYYM495Fw';
        var map = L.mapbox.map('map').setView([39.739, -104.990], 6);
        var tile = 'https://api.mapbox.com/styles/v1/mapbox/streets-v10/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYW50b3RvIiwiYSI6ImNpdm15YmNwNTAwMDUyb3FwbzlzeWluZHcifQ.r44fcNU5pnX3-mYYM495Fw';
        featureLayer = L.mapbox.featureLayer();
        L.tileLayer(tile).addTo(map);

        map.featureLayer.on('click', function(e) {
            map.panTo(e.layer.getLatLng());
        });

        $.ajax({
            dataType: 'json',
            url: grabTravelData(),
            success: function(data) {
                geojson = data;
                map.featureLayer.setGeoJSON(geojson);
                var ar = [];
                for(var i = 0; i < data.length; i++) {
                    ar.push(data[i].geometry.coordinates.reverse());
                }
                var polyline = L.polyline(ar, {color: '#feb47b'}).addTo(map);
                // get last record of array
                var last = ar.length-1;
                var directions = L.mapbox.directions();
                map.featureLayer.bindPopup('step n°');
                console.log(data);
                map.fitBounds(ar);
            },
            error: function(data) {
                console.log(data + ' error');
            }
        });
    };

    // modal
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
    
    // call all functions
    _getModal();
    _initMap();
    _aglgoliaSearch();
});
*/
$(document).ready(function() {
    var map;
    mapboxgl.accessToken = 'pk.eyJ1IjoiYW50b3RvIiwiYSI6ImNpdm15YmNwNTAwMDUyb3FwbzlzeWluZHcifQ.r44fcNU5pnX3-mYYM495Fw';
    
    var map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v10',
      center: [-96, 37.8],
      zoom: 3
    });

    map.on('click', 'markers', function (e) {
        map.flyTo({center: e.features[0].geometry.coordinates});
    });

    map.on('mouseenter', 'markers', function () {
        map.getCanvas().style.cursor = 'pointer';
    });

    // Change it back to a pointer when it leaves.
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
            var ar = [];
            for(var i = 0; i < data.length; i++) {
                ar.push(data[i].geometry.coordinates.reverse());
            }   
            map.fitBounds(ar);
        }, error: function(data) {
            console.log(data + ' error');
        }
    });
});
