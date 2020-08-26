const fetch = require('node-fetch');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const csvWriter = createCsvWriter({
    path: 'output-test.csv',
    header: [{
            id: 'notation',
            title: 'Notation'
        },
        {
            id: 'latest',
            title: 'Latest update'
        }
    ]
});
const url = "https://environment.data.gov.uk/flood-monitoring/id/measures";

let data = [];

fetch(url)
    .then((response) => response.json())
    .then(json => {
        for (i = 0; i < json.items.length; i++) {
            if (json.items[i].unitName == "---") {
                if (json.items[i].latestReading != null) {
                    latestReading = json.items[i].latestReading.dateTime
                } else {
                    latestReading = "No update in last month"
                }
                data.push({
                    notation: json.items[i].notation,
                    latest: latestReading
                })
            }
        }
        csvWriter.writeRecords(data)
            .then(() => {
                console.log('...Done');
            });
        return data
    }).catch(function (error) {
        console.log(error);
    });