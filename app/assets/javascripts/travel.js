$(document).ready(function() {

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
    }

    // modal
    function _getModal() {
        $('#open_modal').click(function(e){
            e.preventDefault();
            $('#modal_roadin').toggleClass('modal-roadin-open');
        });
    }


    // call all functions
    _initMap();
    _getModal();
});
