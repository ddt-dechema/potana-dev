See live example: https://ddt-dechema.github.io/potana-dev/

# General
* geotiffs were converted and compressed in QGis (Bucuresti) <span style="color:red">not cited yet</span>. 
8 bit and pseudo-one channel color
* available (Geo)JSONs were partly converted via free online tools <span style="color:red">not cited yet</span>
* CSVs (containing lat,lon) were converted via https://www.convertcsv.com/csv-to-geojson.htm (at least the first line of lat, lon must be wrapped in `" "`) or via https://odileeds.github.io/CSV2GeoJSON/ which has the option to rename properties
* Some data (mostly geotiffs and shapefiles) were uploaded to http://studio.mapbox.com and formated therein. The resulting styles are then used in this map for a faster loading time
* Files for the "protected areas" were simplified to result in files with a size of beloww ca. 5 MB - simplification factors for each region/country are mentioned below

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
* global: http://www.globalcarbonatlas.org/en/CO2-emissions
  additional notes: Somaliland was grouped together with Somalia


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
  * Global data (as of 2014) takes "Level of water stress: freshwater withdrawal as a proportion of available freshwater resources" (indicator code ER.H2O.FWST.ZS)
  taken from world bank (https://datacatalog.worldbank.org/dataset/world-development-indicators)
  * alternatively, "Annual freshwater withdrawals, total (% of internal resources)" could be taken: https://www.indexmundi.com/facts/indicators/ER.H2O.FWTL.ZS 
  * https://wri.org/applications/aqueduct/country-rankings/
  * baseline water stress (BWS) with the total withdrawal (tot) as gridded weight

## Renewable Power plants
* Global dataset was retrieved by Luisa (@Dechema)

## Refineries
* European dataset was retrieved by Luisa (@Dechema) via https://www.concawe.eu/refineries-map/
* Data for Petroleum (global) was taken from https://www.prio.org/Data/Geographical-and-Resource-Datasets/Petroleum-Dataset/Petroleum-Dataset-v11/

## Chemical Parks
* European dataset was retrieved by Luisa (@Dechema)

## protected areas
* africa (simplified to 10%) https://energydata.info/dataset/protected-areas 
additionally added: 
  * Madagascar (100%) https://www.protectedplanet.net/country/MG
  * Algeria (100%) https://www.protectedplanet.net/country/DZ
  * Tunisia (10%) https://www.protectedplanet.net/country/TN
  * Morocco (10%)  https://www.protectedplanet.net/country/MAR
  * Mauritania (100%) https://www.protectedplanet.net/country/MR
  * Egypt (100%) https://www.protectedplanet.net/country/EG
  * Sudan (100%) https://www.protectedplanet.net/country/SD

* China (10%) https://www.protectedplanet.net/country/CN
* Kazakhstan (100%) https://www.protectedplanet.net/country/KZ
* Mexico (1%) https://www.protectedplanet.net/country/MX
* Argentina (50%) https://www.protectedplanet.net/country/AR
* Chile (1%) https://www.protectedplanet.net/country/CL
* South Europe - simplified (x%) and then grouped with QGis (precision level 15) and then simplified again (1%)
  * France (1%) https://www.protectedplanet.net/country/FR
  * Spain https://www.protectedplanet.net/country/ES
  * Italy (1%) https://www.protectedplanet.net/country/IT
  * Greece (1%) https://www.protectedplanet.net/country/GR
  * Portugal https://www.protectedplanet.net/country/PT
* North Europe - simplified grouped with QGis (precision level 15) and then simplified by (1%)
  * Norway (1%) https://www.protectedplanet.net/country/NO
  * Iceland (100%) https://www.protectedplanet.net/country/IS
  * Denmark (1%) https://www.protectedplanet.net/country/DK
  * Great Britain https://www.protectedplanet.net/country/GB 
* Germany (1%) https://www.protectedplanet.net/country/DE



## SVGs
SVGS were created from JPGs, PNGs, etc. with https://convertio.co/de/svg-umwandeln/ or other free online tools.
The SVGs were converted to symbols with  https://svgsprit.es/
* sources will be listed the correct ones at a later stage...