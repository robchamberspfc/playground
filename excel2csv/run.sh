#!/bin/bash

# variables
input=licence-dataset

# start node server to allow fetch access to input files
npx serve &
echo "Server starting, PID: $!"

# wait for server to start
sleep 1

# node scripts/wait.js 

echo "Creating csv2rdf input file"
node scripts/xls2csv.js $input
echo "csv2rdf file prepared"

kill $!
echo "Server closed, PID: $!"