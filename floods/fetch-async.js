const fetch = require('node-fetch');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const csvWriter = createCsvWriter({
    path: '/tmp/output.csv',
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
final = []
runScript()

async function runScript() {
    const notation = await getData();
    const fetchData =  await loop(notation)
    

    writeCSV(fetchData)
}
function test(individual) {
    final.push({
        notation: individual.notation,
        latest: individual.latestReading
    })
}

async function loop(notation) {
    let data = []
    for (i = 0; i < 10; i++) {
    let individual = getIndividual(notation[i])
    

    // await Promise.all(individual);
}   
    test (individual)
}

function getData() {
    let data = []
    return fetch(url)
        .then((response) => response.json())
        .then(json => {
            for (i = 0; i < json.items.length; i++) {
                if (json.items[i].unitName == "---") {
                    data.push(json.items[i].notation)
                }
            }
            return data
        }).catch(function (error) {
            console.log(error);
        });
}

function getIndividual(input) {
    let data = []
        fetch("http://environment.data.gov.uk/flood-monitoring/id/measures/" + input)
            .then((response) => response.json())
            .then(json => {
                console.log(json.items.notation)
                notation = json.items.notation
                latestReading = json.items.latestReading
                
                return data = {
                    notation: notation,
                    latest: latestReading
                }
            })
            .catch(function (error) {
                console.log(error);
            });    
}

function writeCSV(input) {
    // console.log(input[0])
    csvWriter.writeRecords(input)
        .then(() => {
            console.log('...Done');
        });
}