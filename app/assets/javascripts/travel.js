$(document).ready(function() {

    function grabTravelData(travel_id) {
        return '/' + travel_id + '/show.json';
    }

    // map
    function _initMap() {
        mapboxgl.accessToken = 'pk.eyJ1IjoiYW50b3RvIiwiYSI6ImNpdm15YmNwNTAwMDUyb3FwbzlzeWluZHcifQ.r44fcNU5pnX3-mYYM495Fw';
        var map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v9',
            center: [-74.50, 40],
            zoom: 9
        });
        map.addControl(new mapboxgl.NavigationControl());

        // second try with leaflet

        /* L.mapbox.accessToken = 'pk.eyJ1IjoiYW50b3RvIiwiYSI6ImNpdm15YmNwNTAwMDUyb3FwbzlzeWluZHcifQ.r44fcNU5pnX3-mYYM495Fw';
         var map = L.mapbox.map('map').setView([39.739, -104.990], 6);
         var tile = 'https://api.mapbox.com/styles/v1/mapbox/streets-v10/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYW50b3RvIiwiYSI6ImNpdm15YmNwNTAwMDUyb3FwbzlzeWluZHcifQ.r44fcNU5pnX3-mYYM495Fw';
         L.tileLayer(tile).addTo(map);
         map.featureLayer.on('ready', function(e) {
         getSteps(map);
         });*/
    }

    function _getMarkers() {
        $.ajax({
            dataType: 'json',
            url: grabTravelData(),
            success: function(data) {
                geojson = $.parseJSON(data);
                console.log(data);
                map.featureLayer.setGeoJSON(geojson);
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

    var placeAutocomplete = places({
        container: document.querySelector('#address-input')
    });

    // call all functions
    _getModal();
    _initMap();
    _getMarkers();
});
