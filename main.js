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
    /*********************************************************/
/* COPY-PASTED VON Carbon4PUR seite*/
function loadGlobalDefs() {
    // show all numbers with 1,000.00 format
    format1Dec = d3.format(',.1f')
    formatSI = d3.format(',.3f')
}

let emissionColors = {
        "CO2, AIR": 'rgb(241, 177, 48)',
        "CO, AIR": 'rgb(234,110,57)'
    },
    chemicalColors = {
        "chemical parks": "rgb(0,168,189)",
        "polyol plants": "rgb(12,168,118)",
        "steel mills": "yellow"
    }

    let globalModel = {
        emissions: {
            categories: {
                gasType: {
                    buttons: {
                        containerId: 'gas-type-buttons',
                        onClick: function(){},
                        createFunction: function(){}
                    },
                    items: {
                        "CO2, AIR": {
                            color: 'rgb(241, 177, 48)',
                            filterButton: document.getElementById('pollutant-filter-CO2-button')
                        },
                        "CO, AIR": {
                            color: 'rgb(234,110,57)',
                            filterButton: document.getElementById('pollutant-filter-CO-button')
                        }
                    }
                },
                naceCategories: {
                    buttons: {
                        containerId: 'nace-categories',
                        onClick: (button) => {
                            return function(){
                                activateCompatButton(compatFilterManualButton)
                                // update nace object
                                toggleNaceButton(button)
                                // only display active emissions
                                updateEmissionsFilter()
                            }
                        },
                        createButtons: () => {
                            return new Promise(resolve => {                            
                                let nace = globalModel.emissions.categories.naceCategories
                                let catDiv = document.getElementById('nace-categories')
                                for (var name in nace.items) {
                                    let emissionSums = formatSI(globalEmissionData.stats.totals['CO2, AIR'][name]) + ' Megatonnes CO2/year, ' + formatSI(globalEmissionData.stats.totals['CO, AIR'][name]) + ' Megatonnes CO/year';
                                    nace.items[name].button = document.createElement('a')
                                    nace.items[name].button.className = 'button is-small is-activated is-fullwidth nace-button ' + nace.items[name].style
                                    nace.items[name].button.title = emissionSums
                                    nace.items[name].button.text = name
                                    nace.items[name].button.onclick = nace.buttons.onClick(nace.items[name].button)
                                    catDiv.append(nace.items[name].button)
                                }
                                nace.buttons.allButtons = document.getElementsByClassName('nace-button')
                                resolve()
                            })
                        },
                        allButtons: []
                    },
                    items: {
                        "Manufacture of basic iron and steel and of ferro-alloys": {
                            style: 'nace-iron',
                            color: '#ff0000',
                            looping: true,
                            catalytic: true,
                            active: true,
    
                        },
                        "Manufacture of other inorganic basic chemicals": {
                            style: 'nace-inorganic',
                            color: 'rgb(214,70,111)',
                            looping: true,
                            catalytic: true,
                            active: true
                        },
                        "Production of electricity": {
                            style: 'nace-electricity',
                            color: 'rgb(190,85,153)',
                            looping: true,
                            catalytic: false,
                            active: true
                        },
                        "Extraction of natural gas": {
                            style: 'nace-ng',
                            color: 'rgb(151,133,176)', // find color
                            looping: true,
                            catalytic: false,
                            active: true
                        },
                        "Manufacture of refined petroleum products": {
                            style: 'nace-petroleum',
                            color: 'rgb(103,155,186)',
                            looping: true,
                            catalytic: false,
                            active: true
                        },
                        "Manufacture of cement": {
                            style: 'nace-cement',
                            color: '#5a6067',
                            looping: true,
                            catalytic: false,
                            active: true
                        },
                        "Manufacture of lime and plaster": {
                            style: 'nace-lime',
                            color: '#000000',
                            looping: true,
                            catalytic: false,
                            active: true
                        },
                        "Manufacture of fertilisers and nitrogen compounds": {
                            style: 'nace-fertilisers',
                            color: '#938e99',
                            looping: true,
                            catalytic: false,
                            active: true
                        }
                    }
                }
            }
        }
    }
    
    /*********************************************************/
    /* Keep a copy of the loaded jsons, in case we need them */
    let globalEmissionData, globalChemicalData

    
/***********************/
/* Einladen der Button-Informationen */
let ethyleneButton = document.getElementById('ethylene-button'),
propyleneButton = document.getElementById('propylene-button'),
pvButton = document.getElementById('pv-button'),
windButton = document.getElementById('wind-button'),
waterButton = document.getElementById('water-button'),
emitterButton = document.getElementById('emitter-button')
/*pollutantFilterCO2Button = document.getElementById('pollutant-filter-CO2-button'),
pollutantFilterCOButton = document.getElementById('pollutant-filter-CO-button')

/* Farbe der Pipelines*/
function pipelineStyle(feature) {
    return {
        color: feature.properties.type[1] == 54 ? "green" : "red", //Outline color
    };
}

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


/* toggle-bility von Punktquellen Daten */
// function toggleEmitter(event, type) {
//     event.target.classList.toggle('is-info')
//     if (event.target.classList.contains('is-info')) {
//         fetch('data.json')
//             .then((response) => {
//                     return response.json()
//                 },
//                 (reject) => {
//                     console.error(reject)
//                 })
//             .then((geojson) => {
//                 markers[type] = L.geoJson(geojson, {
//                     pointToLayer: function (feature, latlng) {
//                         return L.circleMarker(latlng, {
//                             radius: 30,
//                             color:  "#99d1e1",
//                             /*fillColor: feature.properties.color,*/
//                             fillColor: "#99d1e1",
//                             weight: 1,
//                             opacity: 0.7,
//                             fillOpacity: 0.4
//                         }).bindPopup(addPopupHandler(feature))
//                     }   
//                 })
//                 markers[type].addTo(map)
//             })
//     } else {
//         map.removeLayer(markers[type])
//     }
// }

// emitterButton.addEventListener('click', (event) => {
//     toggleEmitter(event, 'emitter')
// })
/*ausprobieren ob es mit der großen emissions.json klappt */
function returnTogglePollutantFilter(button) {
    return function () {
        button.classList.toggle('is-activated')
        if (button.classList.contains('is-activated')) button.style.background = emissionColors[button.id.includes("CO2") ? "CO2, AIR" : "CO, AIR"]
        else button.style.background = '#fff'
        getFilteredTotals()
        toggleFilterEmittersByPollutant(button.id.includes("CO2") ? "CO2, AIR" : "CO, AIR")
    }
}

function toggleFilterEmittersByPollutant(pollutant) {
    if (map.hasLayer(markers[pollutant])) {
        map.removeLayer(markers[pollutant])
    } else {
        map.addLayer(markers[pollutant])
    }
}
emitterButton.addEventListener('click', returnTogglePollutantFilter(emitterButton))

function addEmitterPopupHandler(feature) {
    let nace = globalModel.emissions.categories.naceCategories.items
    if (feature.properties) {
        let otherEmission = ''
        if (feature.properties.co2Amount) otherEmission += formatSI(feature.properties.co2Amount) + ' Megatonnes CO<sub>2</sub>/year'
        if (feature.properties.coAmount) otherEmission += formatSI(feature.properties.coAmount) + ' Megatonnes CO/year'
        let thisEmission = formatSI(feature.properties.MTonnes) + ' Megatonnes '
        if (feature.properties.type == 'CO, AIR') thisEmission += 'CO/year'
        else thisEmission += 'CO<sub>2</sub>/year'
        let color = translucidColor(nace[feature.properties.NACEMainEconomicActivityName].color)
        return `<h2>${feature.properties.FacilityName}</h2>
                        ${feature.properties.CountryName}                    
                        <br><b><i>${feature.properties.NACEMainEconomicActivityName}</i></b>
                        <br>
                        <div class='popup-em' style='background: ${color}'>
                        Emissions:
                        <br>${thisEmission}` + (otherEmission != '' ? `<br />${otherEmission}` : '') + `</div>
                        <br><br><a href="${feature.properties.FacilityDetails}" target="_blank">More Facility details on E-PRTR page</a>`

    } else {
        console.log(feature)
    }
}


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
var markers = {}
var chemicalParkMarkers = {}
var globalPipelines = {}

function loadPRTRlayers(data) {
    return new Promise((resolve, reject) => {
        let nace = globalModel.emissions.categories.naceCategories.items
        for (emission in data) {
            if (emission != "stats") {
                for (f in data[emission].features) {
                    data[emission].features[f].properties.type = emission
                }
                markers[emission] = L.geoJson(data[emission], {
                    pointToLayer: function (feature, latlng) {
                        return L.circleMarker(latlng, {
                            radius: Math.sqrt(feature.properties.MTonnes / data.stats.totalMax) * 50,
                            color: emissionColors[feature.properties.PollutantName],
                            fillColor: nace[feature.properties.NACEMainEconomicActivityName].color,
                            weight: 1,
                            opacity: 0.7,
                            fillOpacity: 0.4
                        }).bindPopup(addEmitterPopupHandler(feature))
                    }
                }).addTo(map)
            }
        }
        globalEmissionData = data
        resolve(data)
    })
}
/*  */
document.addEventListener('DOMContentLoaded', (event) => {
    showMap()
    loadGlobalDefs()
    fetch('emissions.json')
    .then((response) => {
            return response.json()
        },
        (reject) => {
            console.error(reject)
        })
    .then(loadPRTRlayers)
/* zum einladen von GeoJson-Linien daten*/
    /*fetch('lines.json')
    .then(
        (response) => {
            return response.json()
        },
        (reject) => {
            console.error(reject)
        })
    .then(showLineLayer)*/
/* zum einladen von GeoJson-Punktquellen daten*/
    /*fetch('data.json')
    .then(
        (response) => {
            return response.json()
        },
        (reject) => {
            console.error(reject)
        })
    .then(showDataLayer)*/
})