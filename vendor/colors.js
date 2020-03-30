var areaStyle = {
    color: "#19fa28",
    weight: 5,
    opacity: 0.65
};

var waterStyle = {
    color: "#19cdfa",
    weight: 5,
    opacity: 0.65
};
function getColor(d) {
    return d > 1000 ? '#800026' :
           d > 500  ? '#BD0026' :
           d > 200  ? '#E31A1C' :
           d > 100  ? '#FC4E2A' :
           d > 50   ? '#FD8D3C' :
           d > 20   ? '#FEB24C' :
           d > 10   ? '#FED976' :
                      '#FFEDA0';
}
var powerplantsColors = {
    //"Biomass": 'rgb(0, 141, 180)', //Kopernikus 100%
    Biomass: "#09B57C", // greeny
    Hydro: "#0A5469", // dark blue
    Solar: "#B51247", // red
    Waste: "#696105", // brwonish
    "Wave and Tidal": "#008DB4", // Kopernikus 100%
    Wind: "#99D1E1", //Kopernikus 40%
    Coal: "#be5599", // Coal
    Cogeneration: "#AB4C89", // Cogeneration
    "Gas:": "#98447A", // Gas
    Geothermal: "#853B6B", // Geothermal
    Nuclear: "#72335B", // Nuclear
    Oil: "#5F2A4C", // Oil
    Other: "#4C223D", // Other
    Petcoke: "#39192D", // Petcoke
    Storage: "#26111E" // Storage
  };

var grades_powerEE = [
    "#09B57C", // greeny
    "#0A5469", // dark blue
    "#B51247", // red
    "#696105", // brwonish
    "#008DB4", // Kopernikus 100%
    "#99D1E1"
]
  
var labels_powerEE = [
    "Biomass", // greeny
    "Hydro", // dark blue
    "Solar", // red
    "Waste", // brwonish
    "Wave and Tidal", // Kopernikus 100%
    "Wind" //Kopernikus 40%
];

var grades_power = [
    //shades of the Carbon4PUR electricity color scheme
    "#be5599", // Coal
    "#AB4C89", // Cogeneration
    "#98447A", // Gas
    "#853B6B", // Geothermal
    "#72335B", // Nuclear
    "#5F2A4C", // Oil
    "#4C223D", // Other
    "#39192D", // Petcoke
    "#26111E" // Storage
  ]

var labels_power = [
// 9 stück
"Coal",
"Cogeneration",
"Gas",
"Geothermal",
"Nuclear",
"Oil",
"Other",
"Petcoke",
"Storage"
];