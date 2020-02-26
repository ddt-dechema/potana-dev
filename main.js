// define global variables
let map

function showMap() {
    /* allows us to create filters within a Leaflet GeoJSON layer */
    L.GeoJSON.include({
        setFilter: function (originalData, _) {
            this.options.filter = _
            this.clearLayers()
            this.addData(originalData)
            return this
        }
    })

    /* Set up the map with initial center and zoom level */
    map = L.map('map', {
        center: [51.65892, 6.41601], // roughly show Europe
        zoom: 5, // roughly show Europe (from 1 to 18 -- decrease to zoom out, increase to zoom in)
        scrollWheelZoom: false,
        zoomControl: false // to put the zoom butons on the right
    })

    /* Add the zoom buttons */
    L.control.zoom({
        position: 'topright'
    }).addTo(map)

    /* Set up a layout object with different map styles and a toggle function */
    map.layout = {
        items:{
            light: {
                layer: L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png', {
                    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap<\/a>, &copy; <a href="https://carto.com/attribution">CARTO<\/a>, <a href="http://prtr.ec.europa.eu">E-PRTR</a>'
                }).addTo(map),
                /* ".addto(map)" hinzufügen, wenn man das defaultmäßig haben will */
                button: document.getElementById('map-layout-light')
            },
            green: {
                layer: L.tileLayer('https://tile.thunderforest.com/neighbourhood/{z}/{x}/{y}.png?apikey=9a85f60a13be4bf7bed59b5ffc0f4d86', {
                    attribution: 'Maps &copy; <a href="https://www.thunderforest.com">Thunderforest</a>, Data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>, <a href="http://prtr.ec.europa.eu">E-PRTR</a>'
                }),
                button: document.getElementById('map-layout-green')
            }
        },
        toggle: function() {
            for(layout in map.layout.items){
                let l = map.layout.items[layout]
                l.button.classList.toggle('is-info')
                if(l.button.classList.contains('is-info')){
                    map.addLayer(l.layer)
                }
                else {
                    map.removeLayer(l.layer)
                }
            }
        }
    }
    for(layout in map.layout.items){
        let l = map.layout.items[layout]
        l.button.addEventListener('click', map.layout.toggle)
    }

    /* Add the sidebar */
    map.sidebar = L.control.sidebar('sidebar', {
        position: 'left'
    }).addTo(map)

    /* On the map, scrolling should zoom */
    map.on('focus', () => {
        map.scrollWheelZoom.enable()
    })
    /* Outside of the map, scrolling should not zoom */
    map.on('blur', () => {
        map.scrollWheelZoom.disable()
    })

}

/***********************/
/* Einladen der Button-Informationen */
let ethyleneButton = document.getElementById('ethylene-button'),
propyleneButton = document.getElementById('propylene-button'),
pvButton = document.getElementById('pv-button'),
windButton = document.getElementById('wind-button'),
waterButton = document.getElementById('water-button'),
emitterButton = document.getElementById('emitter-button'),
pipelineButton = document.getElementById('pipeline-button'),
kenyaButton = document.getElementById('kenya-button'),
protectedareaButton = document.getElementById('protectedarea-button'),
usaButton = document.getElementById('usa-button')
/*pollutantFilterCO2Button = document.getElementById('pollutant-filter-CO2-button'),
pollutantFilterCOButton = document.getElementById('pollutant-filter-CO-button')
/* Farbe der Pipelines*/
function pipelineStyle(feature) {
    return {
        color: feature.properties.type[1] == 54 ? "green" : "red", //Outline color
        // 54 = propylene, 52 = ethylene
    };
}
var areaStyle = {
    "color": "#19fa28",
    "weight": 5,
    "opacity": 0.65
};
// function waterStyle(feature) {
//     return {
//         color: "#19cdfa",
//         "weight": 5,
//         "opacity": 0.65,
//         // 54 = propylene, 52 = ethylene
//     };
// }
 var waterStyle = {
    "color": "#19cdfa",
    "weight": 5,
    "opacity": 0.65
};

/* toggle-bility von Linien Daten */
function togglePipeline(event, type) {
    event.target.classList.toggle('is-info')
    if (event.target.classList.contains('is-info')) {
        fetch('pipeline-' + type + '.json')
            .then((response) => {
                    return response.json()
                },
                (reject) => {
                    console.error(reject)
                })
            .then((geojson) => {
                globalPipelines[type] = L.geoJson(geojson, {
                    style: pipelineStyle
                })
                globalPipelines[type].addTo(map)
            })
    } else {
        map.removeLayer(globalPipelines[type])
    }

}
ethyleneButton.addEventListener('click', (event) => {
    togglePipeline(event, 'ethylene')
})
propyleneButton.addEventListener('click', event => {
    togglePipeline(event, 'propylene')
})
// new
pipelineButton.addEventListener('click', event => {
    togglePipeline(event, 'total')
})
kenyaButton.addEventListener('click', event => {
    togglePipeline(event, 'kenya')
})
usaButton.addEventListener('click', event => {
    togglePipeline(event, 'usa')
})

protectedareaButton.addEventListener('click', event => {
    toggleArea(event, 'protected')
})
// waterButton.addEventListener('click', event => {
//     toggleWater(event, 'africa')
// })
function toggleArea(event, type) {
    event.target.classList.toggle('is-info')
    if (event.target.classList.contains('is-info')) {
        fetch(type + '-areas' + '.json')
            .then((response) => {
                    return response.json()
                },
                (reject) => {
                    console.error(reject)
                })
            .then((geojson) => {
                protectedArea[type] = L.geoJson(geojson, {
                    style: areaStyle
                })
                protectedArea[type].addTo(map)
            })
    } else {
        map.removeLayer(protectedArea[type])
    }

}
/************************* */
/* ISSUE 1 */

function loadWaterlayers(data) {
    return new Promise((resolve, reject) => {
        //let nace = globalModel.emissions.categories.naceCategories.items
        for (country in data) {
            if (country != "stats") {
                for (f in data[country].features) {
                    data[country].features[f].properties.type = country
                }
                globalWater[country] = L.geoJson(data[country], {
                    style: waterStyle
                }).addTo(map)
            }
        }
        globalWater = data
        resolve(data)
    })
}

function toggleWater(event) {
    return function () {
        //button.classList.toggle('is-activated')
        event.target.classList.toggle('is-info')
        //if (button.classList.contains('is-info')) button.style.background = emissionColors[button.id.includes("CO2") ? "CO2, AIR" : "CO, AIR"]
        //else button.style.background = '#fff'
        //getFilteredTotals()
        //toggleFilterEmittersByPollutant(button.id.includes("CO2") ? "CO2, AIR" : "CO, AIR")
        if (event.target.classList.contains('is-info')) {
            map.addLayer(globalWater)
        }
        else {
            map.removeLayer(globalWater)
        }    
    }
}

// function toggleFilterEmittersByPollutant(pollutant) {
//     if (map.hasLayer(globalWater[pollutant])) {
//         map.removeLayer(globalWater[pollutant])
//     } else {
//         map.addLayer(globalWater[pollutant])
//     }
// }
waterButton.addEventListener('click', event => {
    toggleWater(event)
})
/*
function toggleWater(event, type) {
    event.target.classList.toggle('is-info')
    if (event.target.classList.contains('is-info')) {
        fetch('water-' + type + '.json')
            .then((response) => {
                    return response.json()
                },
                (reject) => {
                    console.error(reject)
                })
            .then((geojson) => {
                globalWater[type] = L.geoJson(geojson, {
                    style: waterStyle
                })
                globalWater[type].addTo(map)
            })
    } else {
        map.removeLayer(globalWater[type])
    }

}*/

/* toggle-bility von Punktquellen Daten */
function toggleEmitter(event, type) {
    event.target.classList.toggle('is-info')
    if (event.target.classList.contains('is-info')) {
        fetch('data.json')
            .then((response) => {
                    return response.json()
                },
                (reject) => {
                    console.error(reject)
                })
            .then((geojson) => {
                markers[type] = L.geoJson(geojson, {
                    pointToLayer: function (feature, latlng) {
                        return L.circleMarker(latlng, {
                            radius: 30,
                            color:  "#99d1e1",
                            /*fillColor: feature.properties.color,*/
                            fillColor: "#99d1e1",
                            weight: 1,
                            opacity: 0.7,
                            fillOpacity: 0.4
                        }).bindPopup(addPopupHandler(feature))
                    }
                })
                markers[type].addTo(map)
            })
    } else {
        map.removeLayer(markers[type])
    }
}

emitterButton.addEventListener('click', (event) => {
    toggleEmitter(event, 'emitter')
})


/*zum einladen von geoJson-Linien Daten */
/*function showLineLayer(data) {
    map.lineLayer = L.geoJson(data, {
        style: function (feature) {
            return {
                weight: feature.properties.diameter / 10,
                color: feature.properties.color
            }
        },
        onEachFeature: function (feature, layer) {
            var popup = L.popup();
            popup.setContent('text');
            layer.on('click', function (e) {
                L.popup()
                    .setLatLng(e.latlng)
                    .setContent(`<h2>${layer.feature.properties.name}</h2>
            <i>${layer.feature.properties.ort}</i>
            <br><b>Diameter:</b> ${layer.feature.properties.diameter}
            <br><b>Flow:</b> ${layer.feature.properties.flow}`)
                    .openOn(map);
            });
        }
    }).addTo(map)
}
*/
/*zum einladen von geoJson-Punktquellen Daten */
function showDataLayer(data) {
    L.geoJson(data, {
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng, {
                radius: 30,
                color: feature.properties.color,
                fillColor: feature.properties.color,
                weight: 1,
                opacity: 0.7,
                fillOpacity: 0.4
            }).bindPopup(addPopupHandler(feature))
        }
    }).addTo(map)
}

function addPopupHandler(feature) {
    return `<h2>${feature.properties.FacilityName}</h2>
        ${feature.properties.CountryName}`
}

/***********************/
/* Load data functions */
/***********************/

// keep reference to the markers for filtering

var globalPipelines = {}
var protectedArea = {}
var globalWater = {}
/*  */
document.addEventListener('DOMContentLoaded', (event) => {
    showMap()
    fetch('water-africa.json')
    .then((response) => {
            return response.json()
        },
        (reject) => {
            console.error(reject)
        })
    .then(loadWaterlayers)

})
