#!/bin/bash

# variables

# # start node server to allow fetch access to input files
# npx serve &
# echo "Server starting, PID: $!"

# # wait for server to start
# sleep 1

# # node scripts/wait.js 
for input in smp1 smp3
# for input in smp1 smp3 smp4 smp5 smp6 smp7 smp8 smp9 smp10 smp11 smp12 smp13 smp14 smp15 smp16 smp17 smp18 smp19 smp22


do
echo $input

echo "Creating csv input file"
node scripts/xls2csv.js $input 
echo "csv file prepared"

done

# kill $!
# echo "Server closed, PID: $!"