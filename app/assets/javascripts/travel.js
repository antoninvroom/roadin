$(document).ready(function() {

    // map
    function _initMap() {
        /* mapboxgl.accessToken = 'pk.eyJ1IjoiYW50b3RvIiwiYSI6ImNpdm15YmNwNTAwMDUyb3FwbzlzeWluZHcifQ.r44fcNU5pnX3-mYYM495Fw';
        var map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v9',
            center: [-74.50, 40],
            zoom: 9
        });
        map.addControl(new mapboxgl.NavigationControl()); */

        // second try with leaflet

        L.mapbox.accessToken = 'pk.eyJ1IjoiYW50b3RvIiwiYSI6ImNpdm15YmNwNTAwMDUyb3FwbzlzeWluZHcifQ.r44fcNU5pnX3-mYYM495Fw';
        var map = L.mapbox.map('map', 'mapbox://styles/mapbox/streets-v9').setView([39.739, -104.990], 12);
        map.featureLayer.on('ready', function(e) {
            getSteps(map);
        });
    }

    function getSteps(map) {
        $.ajax({
            dataType: 'text',
            url: '/steps.json',
            success: function(steps) {
                var geojson = $.parseJSON(steps);
                map.featureLayer.setGeoJSON({
                    type: "FeatureCollection",
                    features: geojson
                });
                addStepsPopups(map);
            },
            error: function() {
                alert("Could not load the steps");
            }
        })
    }

    function addStepsPopups(map) {
        map.featureLayer.on('layeradd', function(e) {
           var marker = e.layer;
           var properties = marker.feature.properties;
           var popupContent = '<div class="marker-popup">' + '<h3>' + properties.place + '</h3>' + '</div>';
           marker.bindPopup(popupContent, {closeButton: false, minWidth: 300});
        });
    }

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
});
