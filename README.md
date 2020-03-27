See live example: https://ddt-dechema.github.io/potana-dev/

# General
* geotiffs were converted and compressed in QGis (Bucuresti) <span style="color:red">not cited yet</span>. 
8 bit and pseudo-one channel color
* available (Geo)JSONs were partly converted via free online tools <span style="color:red">not cited yet</span>
* CSVs (containing lat,lon) were converted via https://www.convertcsv.com/csv-to-geojson.htm (at least the first line of lat, lon must be wrapped in `" "`) or via https://odileeds.github.io/CSV2GeoJSON/ which has the option to rename properties
* Some data (mostly geotiffs and shapefiles) were uploaded to http://studio.mapbox.com and formated therein. The resulting styles are then used in this map for a faster loading time

# Sources
## General
* Solar Direct Normal Irradiation https://globalsolaratlas.info/
* Wind - Mean Wind Speed at 100 m https://globalwindatlas.info/
* Exclusive Economic Zone - Maritime Boundaries v11 https://www.marineregions.org/downloads.php
* Country borders - https://geojson-maps.ash.ms/
the lines were simplified for faster loading with https://mapshaper.org/  
* Country centers - https://developers.google.com/public-data/docs/canonical/countries_csv
* Global CO<sub>2</sub> emissions - http://www.globalcarbonatlas.org/en/CO2-emissions

## COx - emissions 
* Europe - Carbon4Pur Project https://carbon4pur.github.io/mapping/index.html
as taken from European Pollutant Release and Transfer Register (E-PRTR) https://prtr.eea.europa.eu/
* USA - taken from EPA - Facility Level Information on GreenHouse Gases Tool (Flight) https://ghgdata.epa.gov/ghgp/main.do#/facility/; Reporting Year: 2018

## pipelines
* usa 
  * full and previous version: https://hifld-geoplatform.opendata.arcgis.com/datasets/natural-gas-pipelines?geometry=-130.171%2C37.289%2C-93.103%2C43.155
  * possible to use this date in future versions: 
  Natural Gas Interstate and Intrastate Pipelines https://www.eia.gov/maps/layer_info-m.php
* kenya https://energydata.info/dataset?res_format=SHP
* Europe: <span style="color:red">not cited yet</span>
* North Africa: <span style="color:red">not cited yet</span>
* Australia: <span style="color:red">not cited yet</span>


## water
* Africa https://energydata.info/dataset/africa-water-bodies-2015
* Global water stress: World Resources Institute (WRI) https://www.wri.org/resources/data-sets/aqueduct-water-stress-projections-data

## Renewable Power plants
* Global dataset was retrieved by Luisa (@Dechema)

## protected areas
* africa https://energydata.info/dataset/protected-areas

## SVGs
SVGS were created from JPGs, PNGs, etc. with https://convertio.co/de/svg-umwandeln/ or other free online tools.
The SVGs were converted to symbols with  https://svgsprit.es/
* sources will be listed the correct ones at a later stage...