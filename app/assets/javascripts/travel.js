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
                  "type": "symbol",
                  "source": "markers",
                  "layout": {
                      "icon-image": "{marker-symbol}",
                      "icon-size": 1,
                      "icon-offset": [0, -16]
                  }
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
                      .setHTML("<h4>" + e.features[0].properties.place + "</h4>" 
                              + "<p>" + e.features[0].properties.time + " jours </p>" 
                              + "<p>" + e.features[0].properties.desc +  "</p>" 
                              + "<p>" + "<a href=" + e.features[0].properties.toolbox 
                              + " target='_blank' class='btn btn-cst-cherry-xs btn-xs'>Toolbox</a>" + "</p>")
                      .addTo(map);
              });

              for(var i = 0; i < data.length; i++) {
                  var last = data.length - 1
                  var from = data[i];
                  var to = data[i + 1];
                  if(i != last) {
                      apiCall(
                        from.geometry.coordinates[0], 
                        from.geometry.coordinates[1], 
                        to.geometry.coordinates[0], 
                        to.geometry.coordinates[1], 
                        mapboxgl.accessToken, 
                        i
                      );
                  } else {
                      apiCall(
                        from.geometry.coordinates[0], 
                        from.geometry.coordinates[1], 
                        from.geometry.coordinates[0], 
                        from.geometry.coordinates[1], 
                        mapboxgl.accessToken, 
                        i
                      );
                  }
              }
          }, error: function(data) {
              console.log(data + ' error');
          }
      });
    });


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
