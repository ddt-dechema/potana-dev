let globalModel = {
    emissions: {
        categories: {
            // gasType: {
            //     buttons: {
            //         containerId: 'gas-type-buttons',
            //         onClick: function(){},
            //         createFunction: function(){}
            //     },
            //     items: {
            //         "CO2, AIR": {
            //             color: 'rgb(241, 177, 48)',
            //             filterButton: document.getElementById('pollutant-filter-CO2-button')
            //         },
            //         "CO, AIR": {
            //             color: 'rgb(234,110,57)',
            //             filterButton: document.getElementById('pollutant-filter-CO-button')
            //         }
            //     }
            // },
            naceCategories: {
                // buttons: {
                //     containerId: 'nace-categories',
                //     onClick: (button) => {
                //         return function(){
                //             activateCompatButton(compatFilterManualButton)
                //             // update nace object
                //             toggleNaceButton(button)
                //             // only display active emissions
                //             updateEmissionsFilter()
                //         }
                //     },
                //     createButtons: () => {
                //         return new Promise(resolve => {                            
                //             let nace = globalModel.emissions.categories.naceCategories
                //             let catDiv = document.getElementById('nace-categories')
                //             for (var name in nace.items) {
                //                 let emissionSums = formatSI(globalEmissionData.stats.totals['CO2, AIR'][name]) + ' Megatonnes CO2/year, ' + formatSI(globalEmissionData.stats.totals['CO, AIR'][name]) + ' Megatonnes CO/year';
                //                 nace.items[name].button = document.createElement('a')
                //                 nace.items[name].button.className = 'button is-small is-activated is-fullwidth nace-button ' + nace.items[name].style
                //                 nace.items[name].button.title = emissionSums
                //                 nace.items[name].button.text = name
                //                 nace.items[name].button.onclick = nace.buttons.onClick(nace.items[name].button)
                //                 catDiv.append(nace.items[name].button)
                //             }
                //             nace.buttons.allButtons = document.getElementsByClassName('nace-button')
                //             resolve()
                //         })
                //     },
                //     allButtons: []
                // },
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

let emissionColors = {
    "CO2, AIR": 'rgb(241, 177, 48)',
    "CO, AIR": 'rgb(234,110,57)'
}

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


/*************************************************/
/* And finally load all json data and display it */
/*************************************************/
document.addEventListener('DOMContentLoaded', (event) => {
    //showMap()
    //loadGlobalDefs()
    fetch('emissions.json')
        .then((response) => {
                return response.json()
            },
            (reject) => {
                console.error(reject)
            })
        .then(loadPRTRlayers)
        // .then(createScale)
        // .then(globalModel.emissions.categories.naceCategories.buttons.createButtons)
        // .then(getFilteredTotals)
        // .then(loadChemicalParksFromJSON)
        // .then(loadSteelMillsAsChemicalParks)
        // .then(checkIfIntro)
        // .then(getActiveChemPlants)
})