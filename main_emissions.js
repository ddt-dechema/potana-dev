let format1Dec, formatSI

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

function loadGlobalDefs() {
    // show all numbers with 1,000.00 format
    format1Dec = d3.format(',.1f')
    formatSI = d3.format(',.3f')
}

let emissionColors = {
    "CO2, AIR": 'rgb(0, 141, 180)', //Kopernikus 100%
    "CO, AIR": 'rgb(77,175,202)' // Kopernikus 70%

}

/* create scale for the index.html */
let createScale = () => {
    var height = 75
    var width = 130
    var svg = d3.select("#scale")
        .append("svg")
        .attr("width", width)
        .attr("height", height)

    // The scale you use for bubble size
    var size = d3.scaleSqrt()
        .domain([0, globalEmissionData.stats.totalMax]) // What's in the data, min-max
        .range([0, 50]) // Size in pixel

    // Add legend: circles
    var valuesToShow = [0.1, 5, 20] // [globalEmissionData.stats.totalMax / 100, globalEmissionData.stats.totalMax / 10, globalEmissionData.stats.totalMax]
    var xCircle = 38
    var xLabel = 100
    var yCircle = 74
    svg
        .selectAll("legend")
        .data(valuesToShow)
        .enter()
        .append("circle")
        .attr("cx", xCircle)
        .attr("cy", function (d) {
            return yCircle - size(d)
        })
        .attr("r", function (d) {
            return size(d)
        })
        .style("fill", "none")
        .style("stroke", "black")
        .style("stroke-width", "0.8")
        .attr("stroke", "black")

    // Add legend: segments
    svg
        .selectAll("legend")
        .data(valuesToShow)
        .enter()
        .append("line")
        .attr('x1', function (d) {
            return xCircle + size(d)
        })
        .attr('x2', xLabel)
        .attr('y1', function (d) {
            return yCircle - size(d)
        })
        .attr('y2', function (d) {
            return yCircle - size(d)
        })
        .attr('stroke', 'black')
        .style("stroke", "black")
        .style("stroke-width", "0.8")
        .style('stroke-dasharray', ('2,2'))

    // Add legend: labels
    svg
        .selectAll("legend")
        .data(valuesToShow)
        .enter()
        .append("text")
        .attr('x', function (d) {
            return xLabel + (d >= 10 ? 1 : 7)
        })
        .attr('y', function (d) {
            return yCircle - size(d)
        })
        .text(function (d) {
            return format1Dec(d)
        }) // to display in Mt
        .style("font-size", 10)
        .attr('alignment-baseline', 'middle')
}



/******************************** */
/*  Einbau der Buttons zum Togglen der Emissionen */
/******************************** */
let pollutantFilterCO2Button = document.getElementById('pollutant-filter-CO2-button'),
    pollutantFilterCOButton = document.getElementById('pollutant-filter-CO-button')
/* styling */
pollutantFilterCO2Button.style.background = emissionColors["CO2, AIR"]
pollutantFilterCOButton.style.background = emissionColors["CO, AIR"]


function returnTogglePollutantFilter(button) {
    return function () {
        button.classList.toggle('is-activated')
        if (button.classList.contains('is-activated')) button.style.background = emissionColors[button.id.includes("CO2") ? "CO2, AIR" : "CO, AIR"]
        else button.style.background = '#fff'
        //getFilteredTotals()
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
pollutantFilterCO2Button.addEventListener('click', returnTogglePollutantFilter(pollutantFilterCO2Button))
pollutantFilterCOButton.addEventListener('click', returnTogglePollutantFilter(pollutantFilterCOButton))

/******************************** */
/*  Notwendige Funktionen zur Darstellung der Emissionen */
/******************************** */
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
/*Add a popup to a GeoJSON feature of a certain type
*
* @param {*} feature A GeoJSON feature with geometry and properties
* @param {string} type The name of the category, in this case "CO2" or "CO" 
* @returns {string} a DOM string containing the popup
*/
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
/**
 * create a translucid color from a color string for the popups
 *
 * @param {*} colorString
 * @param {number} [opacity=0.6]
 * @returns color
 */
function translucidColor(colorString, opacity = 0.6) {
    let c = d3.color(colorString)
    c.opacity = opacity
    return c
}

var markers = {}

/*************************************************/
/* And finally load all json data and display it */
/*************************************************/
document.addEventListener('DOMContentLoaded', (event) => {
    //showMap()
    loadGlobalDefs()
    fetch('emissions.json')
        .then((response) => {
                return response.json()
            },
            (reject) => {
                console.error(reject)
            })
        .then(loadPRTRlayers)
        .then(createScale)
        // .then(globalModel.emissions.categories.naceCategories.buttons.createButtons)
        // .then(getFilteredTotals)
        // .then(loadChemicalParksFromJSON)
        // .then(loadSteelMillsAsChemicalParks)
        // .then(checkIfIntro)
        // .then(getActiveChemPlants)
})