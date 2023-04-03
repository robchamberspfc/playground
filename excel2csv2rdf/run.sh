#!/bin/bash

# variables
input=licence-dataset
csv2rdf_path=/Users/robchambers/github/work/csv2rdf/target/csv2rdf-standalone.jar

# start node server to allow fetch access to input files
# npx serve &
# echo "Server starting, PID: $!"

# # wait for server to start
# sleep 1

# node scripts/wait.js 

echo "Creating csv2rdf input file"
node scripts/xls2csv.js $input
echo "csv2rdf file prepared"

# kill $!
# echo "Server closed, PID: $!"

# Run csv2rdf transform
echo "Starting csv2rdf conversion"
java -jar $csv2rdf_path -u licence-dataset.csv-metadata.json -o licence-dataset-output.ttl
echo "RDF prepared"