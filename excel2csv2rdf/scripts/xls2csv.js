const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const args = process.argv.slice(2)
// const filePath = 'http://localhost:5000/input/'
const fileName = args[0]
const XLSX = require('xlsx')

console.log("Loading file")
const workbook = XLSX.readFile('./input/Licences_Linked_Dataset_V1.xlsx', {
    cellDates: true
});
const sheet_name_list = workbook.SheetNames;
const xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
const path = fileName + '.csv'

let data = []

// get_header_row(workbook.Sheets[sheet_name_list[0]])
let sheet = workbook.Sheets[sheet_name_list[0]]
let fileHeaders = [];
let range = XLSX.utils.decode_range(sheet['!ref']);
let C, R = range.s.r; 

// walk every column in the range
for (C = range.s.c; C <= range.e.c; ++C) {
    let cell = sheet[XLSX.utils.encode_cell({
        c: C,
        r: R
    })] 

    let hdr = "UNKNOWN " + C; // <-- replace with your desired default 
    if (cell && cell.t) hdr = XLSX.utils.format_cell(cell);

    fileHeaders.push(hdr);
}

let headersConfig =[]

for (i = 0; i < fileHeaders.length; i++) {
    convertedID = fileHeaders[i].replace(/\W/g,'_')
    headersConfig.push({
        title: fileHeaders[i],
        id: convertedID
    })
}

const csvWriter = createCsvWriter({
    path: path,
    header: headersConfig
});

console.log("Updating data")

//content update
for (j = 0; j < xlData.length; j++) {
    console.log(xlData[j])
    if (xlData[j]["Licence Name"] === "Open Government Licence"){
        xlData[j]["Licence Name"] = "Test"
    }
    temp = xlData[j]["Attribution Statement"]
    xlData[j]["Attribution Statement"] = temp.replace(' /n', 'oranges')
    // console.log(xlData[j]["Attribution Statement"])
}

for (j = 0; j < headersConfig.length; j++) {
    for (i = 0; i < xlData.length; i++) {
        result = xlData[i][headersConfig[j].title]
        if (data[i] != null) {
            temp = data[i]
            temp[[headersConfig[j].id]] = result
            data[i] = temp
        } else {
            data[i] = {
                [headersConfig[j].id]: result
            };
        }

    }
}

console.log("Writing CSV")
csvWriter.writeRecords(data)
    .then(() => {
        console.log('Complete file at ' + path);
    });
return