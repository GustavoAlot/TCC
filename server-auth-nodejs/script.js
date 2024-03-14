// Initializes Maps JavaScript API and adds an Earth Engine tile source to the map.
const initialize = (mapid) => {
  // Get a reference to the placeholder DOM element to contain the map.
  const mapContainerEl = document.getElementById("map-container");

  // Create an interactive map inside the placeholder DOM element.
  const embeddedMap = new google.maps.Map(mapContainerEl, {
    // Pan and zoom initial map viewport to Grand Canyon.
    center: { lng: -112.8598, lat: 36.2841 },
    zoom: 9,
  });

  // Create a new tile source to fetch visible tiles on demand and displays them on the map.
  const tileSource = new ee.layers.EarthEngineTileSource({
    mapid,
  });
  const overlay = new ee.layers.ImageOverlay(tileSource);
  embeddedMap.overlayMapTypes.push(overlay);
};

// Fetch a valid mapid from the remote web service defined in server.js.
fetch("http://localhost:3000/mapid")
  .then((response) => response.text())
  .then((mapid) => initialize(mapid));
