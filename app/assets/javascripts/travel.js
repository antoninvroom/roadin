function grabTravelData(travel_id) {
    url: '/' + travel_id + '/show.json'
}

$(document).ready(function() {
    var map;
    mapboxgl.accessToken = 'pk.eyJ1IjoiYW50b3RvIiwiYSI6ImNpdm15YmNwNTAwMDUyb3FwbzlzeWluZHcifQ.r44fcNU5pnX3-mYYM495Fw';
    
    var map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v10',
      center: [-96, 37.8],
      zoom: 5
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
            var bounds = new mapboxgl.LngLatBounds();
            data.forEach(function(feature) {
                bounds.extend(feature.geometry.coordinates);
            });
            map.fitBounds(bounds);
        }, error: function(data) {
            console.log(data + ' error');
        }
    });

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
