export function initMap3D(){

  const map = new google.maps.Map(document.getElementById("map"),{
    center:{lat:41.311,lng:69.279},
    zoom:16,
    tilt:60,
    heading:45,
    mapId:"DEMO_MAP_ID" // Cloud Map ID
  });

  navigator.geolocation.watchPosition(pos=>{
    const lat = pos.coords.latitude;
    const lng = pos.coords.longitude;

    new google.maps.marker.AdvancedMarkerElement({
      position:{lat,lng},
      map
    });

    map.setCenter({lat,lng});
  });
}