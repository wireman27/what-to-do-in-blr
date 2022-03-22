MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoibXNsZWUiLCJhIjoiclpiTWV5SSJ9.P_h8r37vD8jpIH1A6i1VRg';
mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;

const filterGroup = document.getElementById('filter-group');
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v10',
    hash: true,
    center: [77.6176, 12.9473],
    zoom: 11.15
});

var xhr = new XMLHttpRequest();

// Fetch the data first and foremost
xhr.open("GET", "./data.json", true);
xhr.onload = function (e) {
    if (xhr.readyState === 4) {
        if (xhr.status === 200) {
            var places = JSON.parse(xhr.responseText)
            map.on('load', () => {
                map.addSource('places', {
                    'type': 'geojson',
                    'data': places,
                    'tolerance': 0
                });

                for (const feature of places.features) {
                    const symbol = feature['properties']['category'];
                    const layerID = `poi-${symbol}`;

                    if (!map.getLayer(layerID)) {
                        map.addLayer({
                            'id': layerID,
                            'type': 'symbol',
                            'source': 'places',
                            'layout': {
                                'text-field': ['get', 'title'],
                                'text-anchor': 'top',
                                'icon-image': ['get', 'icon'],
                                'text-offset': [0,0.5],
                                'text-justify': 'center'
                            },
                            'paint': {
                                'text-color': 'maroon'
                            },
                            'filter': ['==', 'category', symbol]
                        });

                        map.on('click', layerID, (e) => {

                            const coordinates = e.features[0].geometry.coordinates.slice();
                            const description = e.features[0].properties['googleMapsURL'];
                             
                            // Ensure that if the map is zoomed out such that multiple
                            // copies of the feature are visible, the popup appears
                            // over the copy being pointed to.
                            while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
                            }
                             
                            new mapboxgl.Popup()
                                .setLngLat(coordinates)
                                .setHTML('More information on <a target="_blank" href=' + description + '>Google Maps</a>.')
                                .addTo(map);
                            }
                        );

                        map.on('mouseenter', layerID, () => {
                            map.getCanvas().style.cursor = 'pointer';
                        });
                             
                        // Change it back to a pointer when it leaves.
                        map.on('mouseleave', layerID, () => {
                            map.getCanvas().style.cursor = '';
                        });

                        const input = document.createElement('input');
                        input.type = 'checkbox';
                        input.id = layerID;
                        input.checked = true;
                        filterGroup.appendChild(input);

                        const label = document.createElement('label');
                        label.setAttribute('for', layerID);
                        label.textContent = symbol;
                        filterGroup.appendChild(label);

                        input.addEventListener('change', (e) => {
                            map.setLayoutProperty(
                                layerID,
                                'visibility',
                                e.target.checked ? 'visible' : 'none'
                            );
                        });
                    }
                }
            });
        } else {
            console.error(xhr.statusText);
        }
    }
};

xhr.send(null);

const welcomeMessage = document.getElementById('welcome-message')
const welcomeMessageContent = document.getElementById('welcome-message-content')

function handleWelcomeMessageNonClick(e) {
    e = e || window.event;
    var target = e.target;
    
    if (target.parentNode != welcomeMessage && target.parentNode != welcomeMessageContent) {
        welcomeMessage.setAttribute("style", "display:none")
        document.removeEventListener('click', handleWelcomeMessageNonClick, false)
    }
}

document.addEventListener('click', handleWelcomeMessageNonClick, false);

    
