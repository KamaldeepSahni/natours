export const displayMap = locations => {
  mapboxgl.accessToken =
    'pk.eyJ1Ijoia2FtYWxzYWhuaSIsImEiOiJja2p0c3ljb2YwMm8yMnhvYmNscXZ0ZHdnIn0.5_BKKhBG5Q9o0URDcA2qGQ';

  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/kamalsahni/ckjtv5lvq0psq19ljyz2owlhg',
    scrollZoom: false,
    doubleClickZoom: false,
  });

  const bounds = new mapboxgl.LngLatBounds();

  locations.forEach(loc => {
    // Create Marker
    const el = document.createElement('div');
    el.className = 'marker';

    // Add Marker
    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom',
    })
      .setLngLat(loc.coordinates)
      .setPopup(
        new mapboxgl.Popup({
          offset: 30,
          closeOnClick: false,
        }).setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
      )
      .addTo(map)
      .togglePopup();

    // Extend the map bound to include current location
    bounds.extend(loc.coordinates);
  });

  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 150,
      left: 100,
      right: 100,
    },
  });
};
