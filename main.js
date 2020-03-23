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
            }/*,
            pvTileLayer : {
                layer: L.tileLayer(mbUrl, {
                    id: 'dinhdutran/ck7x7q0gm142w1ipaudrqah67', tileSize: 512, zoomOffset: -1, attribution: mbAttr
                }),
                button: document.getElementById('pv-button')
            },
            windTileLayer : {
                layer: L.tileLayer(mbUrl, {
                    id: 'dinhdutran/ck7x7ug5w055h1ir1fcycofg5', tileSize: 512, zoomOffset: -1, attribution: mbAttr
                }),
                button: document.getElementById('wind-button')
            },
            waterTileLayer : {
                layer: L.tileLayer(mbUrl, {
                    id: 'dinhdutran/ck7xgtwbu1efl1imd3tmuoklt', tileSize: 512, zoomOffset: -1, attribution: mbAttr
                }),
                button: document.getElementById('water-button')
            }*/
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


/***********************/
/* Implement Mapbox-Styles */
/***********************/
var mbAttr = 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
'<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
mbUrl = 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZGluaGR1dHJhbiIsImEiOiJjazdxMWhzN2YwMWZ5M2h0bDZvdmgxdDN5In0.T3gSsacrZXZOTqmx-zknUw';

 var pvTileLayer  = L.tileLayer(mbUrl, {id: 'dinhdutran/ck7x7q0gm142w1ipaudrqah67', tileSize: 512, zoomOffset: -1, attribution: mbAttr}),
 windTileLayer  = L.tileLayer(mbUrl, {id: 'dinhdutran/ck7x7ug5w055h1ir1fcycofg5', tileSize: 512, zoomOffset: -1, attribution: mbAttr}),
 waterTileLayer = L.tileLayer(mbUrl, {id: 'dinhdutran/ck7xgtwbu1efl1imd3tmuoklt', tileSize: 512, zoomOffset: -1, attribution: mbAttr});

 /* Add the zoom buttons */
 L.control.zoom({
    position: 'topright'
}).addTo(map)

pvButton.addEventListener('click', togglePV(pvButton))

function togglePV(button) {
    return function () {    
        button.classList.toggle('is-info')
            if(map.hasLayer(pvTileLayer)) {
                map.removeLayer(pvTileLayer)
            } else {
                map.addLayer(pvTileLayer)
        }
    }
}

windButton.addEventListener('click', toggleWind(windButton))

function toggleWind(button) {
    return function () {    
        button.classList.toggle('is-info')
            if(map.hasLayer(windTileLayer)) {
                map.removeLayer(windTileLayer)
            } else {
                map.addLayer(windTileLayer)
        }
    }
}

waterStress.addEventListener('click', toggleWaterStress(waterStress))

function toggleWaterStress(button) {
    return function () {    
        button.classList.toggle('is-info')
            if(map.hasLayer(waterTileLayer)) {
                map.removeLayer(waterTileLayer)
            } else {
                map.addLayer(waterTileLayer)
        }
    }
}


var eez_boundaries = new L.GeoJSON.AJAX(["geofiles/eez_boundaries_v11.geojson"]);

eezButton.addEventListener('click', toggleEEZ(eezButton))

function toggleEEZ(button) {
    return function () {    
        button.classList.toggle('is-info')
            if(map.hasLayer(eez_boundaries)) {
                map.removeLayer(eez_boundaries)
            } else {
                map.addLayer(eez_boundaries)
        }
    }
}


let powerplantsColors = {
    //"Biomass": 'rgb(0, 141, 180)', //Kopernikus 100%
    "Biomass": '#09B57C', // greeny
    "Hydro": '#0A5469', // dark blue
    "Solar": '#B51247', // red
    "Waste": '#696105', // brwonish
    "Wave and Tidal": '#008DB4', // Kopernikus 100%
    "Wind": '#99D1E1', //Kopernikus 40%
}

var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend ddtvis ddthide');
    var grades = ["#09B57C", // greeny
        "#0A5469" , // dark blue
        '#B51247' , // red
        '#696105' , // brwonish
        '#008DB4' , // Kopernikus 100%
        '#99D1E1'],
        labels = ["Biomass", // greeny
        "Hydro", // dark blue
        "Solar", // red
        "Waste", // brwonish
        "Wave and Tidal", // Kopernikus 100%
        "Wind" //Kopernikus 40%
    ];

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + grades[i] + '"></i> ' +
            labels[i] + '<br>';
    }

    return div;
};

// legend.addTo(map);

var renewables_plants = new L.GeoJSON.AJAX(["geofiles/EEpowerplants_global.geojson"], {
pointToLayer: function (feature, latlng) {
    return L.circleMarker(latlng, {
        radius: 2,
        color: powerplantsColors[feature.properties.primary_fuel],
        /*fillColor: feature.properties.color,*/
        fillColor: powerplantsColors[feature.properties.primary_fuel],
        weight: 1,
        opacity: 0.7,
        fillOpacity: 0.4
    }).bindPopup(addPopupHandler(feature))
}});

renewablesButton.addEventListener('click', togglerenewables(renewablesButton))


function togglerenewables(button) {
    return function () {    
        button.classList.toggle('is-info')
            if(map.hasLayer(renewables_plants)) {
                map.removeLayer(renewables_plants)
                map.removeControl(legend)
            } else {
                map.addLayer(renewables_plants)
                map.addControl(legend)
        }
    }
}







///////////////////////

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
waterStress = document.getElementById('water-stress'),
emitterButton = document.getElementById('emitter-button'),
pipelineButton = document.getElementById('pipeline-button'),
kenyaButton = document.getElementById('kenya-button'),
protectedareaButton = document.getElementById('protectedarea-button'),
eezButton = document.getElementById('eez-button')
renewablesButton = document.getElementById('renewables-button')
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

var waterStyle = {
    "color": "#19cdfa",
    "weight": 5,
    "opacity": 0.65
};

/* toggle-bility von Linien Daten */
function togglePipeline(event, type) {
    event.target.classList.toggle('is-info')
    if (event.target.classList.contains('is-info')) {
        fetch('geofiles/pipeline-' + type + '.json')
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


/************************* */
/* ISSUE 1 */

function loadWaterlayers(data) {
    return new Promise((resolve, reject) => {
        //let nace = globalModel.emissions.categories.naceCategories.items
        for (country in data) {
            if (country != "stats") {
                // for (f in data[country].features) {
                //    data[country].features[f].properties.type = country
                // }
                waterLayer = L.geoJson(data[country], {
                    // für mehr Länder 
                    // waterLayer[country]=L.geoJson(data[country])
                    // toggle event müsste auch angepasst werden, dass die Variable mit gegeben wird, welches Land getogglet werden soll,
                    style: waterStyle
                }).addTo(map)
                   }
        }
        globalWater = data
        resolve(data)
        map.removeLayer(waterLayer)
    })
}

waterButton.addEventListener('click', toggleWater(waterButton))

function toggleWater(button) {
    return function () {    
        button.classList.toggle('is-info')
        //if (button.classList.contains('is-info')) button.style.background = emissionColors[button.id.includes("CO2") ? "CO2, AIR" : "CO, AIR"]
        //else button.style.background = '#fff'
        //getFilteredTotals()
        //toggleFilterEmittersByPollutant(button.id.includes("CO2") ? "CO2, AIR" : "CO, AIR")
        if(map.hasLayer(waterLayer)) {
                map.removeLayer(waterLayer)
            } else {
                map.addLayer(waterLayer)
        }
    }
}

/************************* */
/* ISSUE 1.1 - das selbe nun für protected areas */

function loadAreaLayers(data) {
    return new Promise((resolve, reject) => {
        //let nace = globalModel.emissions.categories.naceCategories.items
        //for (country in data) {
          //  if (country != "stats") {
                // for (f in data[country].features) {
                //    data[country].features[f].properties.type = country
                // }
                areaLayer = L.geoJson(data, {
                    // für mehr Länder 
                    // waterLayer[country]=L.geoJson(data[country])
                    // toggle event müsste auch angepasst werden, dass die Variable mit gegeben wird, welches Land getogglet werden soll,
                    style: areaStyle
                }).addTo(map)
            //    }
        //}
        globalArea = data
        resolve(data)
        map.removeLayer(areaLayer)
    })
}

protectedareaButton.addEventListener('click', toggleArea(protectedareaButton))

function toggleArea(button) {
    return function () {    
        button.classList.toggle('is-success')
        //if (button.classList.contains('is-info')) button.style.background = emissionColors[button.id.includes("CO2") ? "CO2, AIR" : "CO, AIR"]
        //else button.style.background = '#fff'
        //getFilteredTotals()
        //toggleFilterEmittersByPollutant(button.id.includes("CO2") ? "CO2, AIR" : "CO, AIR")
        if(map.hasLayer(areaLayer)) {
                map.removeLayer(areaLayer)
            } else {
                map.addLayer(areaLayer)
        }
    }
}
/************************* */
/* old 1.1 */


/*protectedareaButton.addEventListener('click', event => {
    toggleArea(event, 'protected')
})*/


// function toggleArea(event, type) {
//     event.target.classList.toggle('is-info')
//     if (event.target.classList.contains('is-info')) {
//         fetch(type + '-areas' + '.json')
//             .then((response) => {
//                     return response.json()
//                 },
//                 (reject) => {
//                     console.error(reject)
//                 })
//             .then((geojson) => {
//                 protectedArea[type] = L.geoJson(geojson, {
//                     style: areaStyle
//                 })
//                 protectedArea[type].addTo(map)
//             })
//     } else {
//         map.removeLayer(protectedArea[type])
//     }

// }


/************************* */

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
var waterLayer = {}
var globalArea = {}
var areaLayer = {}
/*  */
document.addEventListener('DOMContentLoaded', (event) => {
    showMap()
    fetch('geofiles/water-africa.json')
    .then((response) => {
            return response.json()
        },
        (reject) => {
            console.error(reject)
        })
    .then(loadWaterlayers)
    fetch('geofiles/protected-areas-africa.json')
    .then((response) => {
            return response.json()
        },
        (reject) => {
            console.error(reject)
        })
    .then(loadAreaLayers) 
})
