let locationLatLng = [30.415075, -86.658633];
let zoom = 14;
let routingMapTile = 'https://tile.openstreetmap.de/{z}/{x}/{y}.png?z={z}&x={x}&y={y}';
let popupContent = '<div class="map-popup-content"><h3>Basement</h3><p>135W, 46nd Street, New York</p><a id="mapDirectionBtn" href="#" class="btn btn-primary btn-sm d-flex align-items-center justify-content-center custom-roboto gap-10 btn-map-direction" type="button" data-bs-toggle="modal" data-bs-target="#RoutingMapModal">Get Direction <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/></svg></a></div>';
let markerIcon = L.divIcon({
    html: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-geo-alt-fill" viewBox="0 0 16 16"><path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/></svg>',
    iconSize: [40, 40],
    //iconAnchor: [150, 280],
    popupAnchor: [-10, -30],
    className: 'eventiva-marker-icon'
});

let waypointCurrentIcon = L.divIcon({
  html: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-crosshair2" viewBox="0 0 16 16"><path d="M8 0a.5.5 0 0 1 .5.5v.518A7.001 7.001 0 0 1 14.982 7.5h.518a.5.5 0 0 1 0 1h-.518A7.001 7.001 0 0 1 8.5 14.982v.518a.5.5 0 0 1-1 0v-.518A7.001 7.001 0 0 1 1.018 8.5H.5a.5.5 0 0 1 0-1h.518A7.001 7.001 0 0 1 7.5 1.018V.5A.5.5 0 0 1 8 0Zm-.5 2.02A6.001 6.001 0 0 0 2.02 7.5h1.005A5.002 5.002 0 0 1 7.5 3.025V2.02Zm1 1.005A5.002 5.002 0 0 1 12.975 7.5h1.005A6.001 6.001 0 0 0 8.5 2.02v1.005ZM12.975 8.5A5.002 5.002 0 0 1 8.5 12.975v1.005a6.002 6.002 0 0 0 5.48-5.48h-1.005ZM7.5 12.975A5.002 5.002 0 0 1 3.025 8.5H2.02a6.001 6.001 0 0 0 5.48 5.48v-1.005ZM10 8a2 2 0 1 0-4 0 2 2 0 0 0 4 0Z"/></svg>',
  iconSize: [30, 30],
  popupAnchor: [0, 0],
  className: 'eventiva-marker-icon eventiva-current-marker-icon'
});

let waypointDestinationIcon = L.divIcon({
  html: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-geo-alt-fill" viewBox="0 0 16 16"><path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/></svg>',
  iconSize: [30, 30],
  popupAnchor: [0, 0],
  className: 'eventiva-marker-icon eventiva-destination-marker-icon'
});

let quadtreeOpened = false;

//routin map
var routingMap;


//get current location latlng
function getCurrentLocationLatLng(callback) {
    // Check if geolocation is supported by the browser
    if ("geolocation" in navigator) {
      
      navigator.geolocation.getCurrentPosition(function (position) {
        // Get the latitude and longitude from the position object
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
  
        // Create an array with latitude and longitude
        const locationArray = [latitude, longitude];
        
        // Call the provided callback function with the location array
        callback(locationArray);
      }, function (error) {
        // Handle errors, if any
        switch(error.code) {
          case error.PERMISSION_DENIED:
            console.error("User denied the request for Geolocation.");
            break;
          case error.POSITION_UNAVAILABLE:
            console.error("Location information is unavailable.");
            break;
          case error.TIMEOUT:
            console.error("The request to get user location timed out.");
            break;
          case error.UNKNOWN_ERROR:
            console.error("An unknown error occurred.");
            break;
        }
      });
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
}

function display_routing(){
    getCurrentLocationLatLng(function(locationArray) {
        var userLatLng = L.latLng(locationArray[0], locationArray[1]);        
        var destinationLatLng = L.latLng(locationLatLng[0], locationLatLng[1]);
        
        var waypoints = [
          userLatLng,
          destinationLatLng
        ];

        //routing
        if(!quadtreeOpened){
            quadtreeOpened = true;
            L.Routing.control({
                waypoints: waypoints,
                routeWhileDragging: true,
                collapsible: true
            }).addTo(routingMap);

            // Add custom markers for waypoints
            waypoints.forEach(function (waypoint, index) {
              var marker = L.marker(waypoint, {
                  icon: (index === 0) ? waypointCurrentIcon : waypointDestinationIcon
              }).addTo(routingMap);

              // You can also add a popup or tooltip to the markers if needed
              marker.bindPopup("Waypoint " + (index + 1));
            });
        }

        // Pan the map to show all markers
        let bounds = L.latLngBounds([userLatLng].concat(destinationLatLng));
        routingMap.fitBounds(bounds);

    });
}

const mapModal = document.getElementById('RoutingMapModal');
mapModal.addEventListener('shown.bs.modal', event => {
  //map inside modal (routing map)
  routingMap = L.map('RoutingMap').setView(locationLatLng, zoom);

  L.tileLayer(routingMapTile, {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">Eventiva</a> contributors'
  }).addTo(routingMap);

  display_routing();
});