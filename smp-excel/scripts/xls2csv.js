const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const args = process.argv.slice(2)
// const filePath = 'http://localhost:5000/input/'
const fileName = args[0]
const XLSX = require('xlsx')

let missing = `11C8.6
13.6
21.5
21.6
23.3
23.4
26.3
26.4
26.5
26.6
26.7
26.8
4A09
4A18
4A19
4A20
4A21
4A22
4A23
4A24
4A25
4A26
A10C1
A10C2
A10C3
A10C4
A11A1
A11A2
A3A1
A3A2
A8A1
A8A2
A9A1
A9A2
A9A3
A9A4
A9A5
A9A6
A9D1
A9D2
A9D3
A9D4
A9D5
A9F1
A9F2
A9F3
A9F4
A10C1
A10C2
A10C3
A10C4
A11A1
A11A2
A3A1
A3A2
A8A1
A8A2
A9A1
A9A2
A9A3
A9A4
A9A5
A9A6
A9D1
A9D2
A9D3
A9D4
A9D5
A9F1
A9F2
A9F3
A9F4
B2A
B2B
B2C
B3A1
B3A2
B5A
B5B
B2A
B2B
B2C
B3A1
B3A2
B5A
B5B
13.6
21.5
21.6
23.3
23.4
26.3
26.4
26.5
26.6
26.7
26.8
A10C1
A10C2
A10C3
A10C4
A11A1
A11A2
A3A1
A3A2
A8A1
A8A2
A9A1
A9A2
A9A3
A9A4
A9A5
A9A6
A9D1
A9D2
A9D3
A9D4
A9D5
A9F1
A9F2
A9F3
A9F4
B2A
B2B
B2C
B3A1
B3A2
B5A
B5B
D1A1
D1A2
D1B1
D1B2
D1B3
D1B4
D1B5
D2A
D2B
D3A
D3B
D3C
D4A
D5A
D5B
D5C
D6A1
D6A2
D6A3
D8A1
D8A2
D8B1
D8B2
E2A
E2B
E2C
E2D
E2E
E2F
E2G
E3A
E3B
E3C
F12A
F12B
F14A
F14B
F1A
F1B
F3A
F3B
F5A
F5B
F7A
F8A
H10A
H10B
H11B1
H11B2
H2A1
H2A2
H2A3
H2A4
H2B1
H2B2
H2B3
H2B4
4A09
4A18
4A19
4A20
4A21
4A22
4A23
4A24
4A25
4A26
11C8.6
D1A1
D1A2
D1B1
D1B2
D1B3
D1B4
D1B5
D2A
D2B
D3A
D3B
D3C
D4A
D5A
D5B
D5C
D6A1
D6A2
D6A3
D8A1
D8A2
D8B1
D8B2
D1A1
D1A2
D1B1
D1B2
D1B3
D1B4
D1B5
D2A
D2B
D3A
D3B
D3C
D4A
D5A
D5B
D5C
D6A1
D6A2
D6A3
D8A1
D8A2
D8B1
D8B2
E2A
E2B
E2C
E2D
E2E
E2F
E2G
E3A
E3B
E3C
E2A
E2B
E2C
E2D
E2E
E2F
E2G
E3A
E3B
E3C
F12A
F12B
F14A
F14B
F1A
F1B
F3A
F3B
F5A
F5B
F7A
F8A
F12A
F12B
F14A
F14B
F1A
F1B
F3A
F3B
F5A
F5B
F7A
F8A
H10A
H10B
H11B1
H11B2
H2A1
H2A2
H2A3
H2A4
H2B1
H2B2
H2B3
H2B4
H10A
H10B
H11B1
H11B2
H2A1
H2A2
H2A3
H2A4
H2B1
H2B2
H2B3
H2B4
13.6
21.5
21.6
23.3
23.4
26.3
26.4
26.5
26.6
26.7
26.8
13.6
21.5
21.6
23.3
23.4
26.3
26.4
26.5
26.6
26.7
26.8
4A09
4A18
4A19
4A20
4A21
4A22
4A23
4A24
4A25
4A26
11C8.6
A10C1
A10C2
A10C3
A10C4
A11A1
A11A2
A3A1
A3A2
A8A1
A8A2
A9A1
A9A2
A9A3
A9A4
A9A5
A9A6
A9D1
A9D2
A9D3
A9D4
A9D5
A9F1
A9F2
A9F3
A9F4
B2A
B2B
B2C
B3A1
B3A2
B5A
B5B
D1A1
D1A2
D1B1
D1B2
D1B3
D1B4
D1B5
D2A
D2B
D3A
D3B
D3C
D4A
D5A
D5B
D5C
D6A1
D6A2
D6A3
D8A1
D8A2
D8B1
D8B2
E2A
E2B
E2C
E2D
E2E
E2F
E2G
E3A
E3B
E3C
F12A
F12B
F14A
F14B
F1A
F1B
F3A
F3B
F5A
F5B
F7A
F8A
H10A
H10B
H11B1
H11B2
H2A1
H2A2
H2A3
H2A4
H2B1
H2B2
H2B3
H2B4
`

console.log("Loading file")
const workbook = XLSX.readFile('input/' + fileName + '.xlsx', {
    cellDates: true
});
const sheet_name_list = workbook.SheetNames;
const xlData = XLSX.utils.sheet_to_json(workbook.Sheets["Policy areas"]);
const path = fileName + '.csv'

let data = []
let options = missing.split('\n');
// console.log(options)

// get_header_row(workbook.Sheets[sheet_name_list[0]])
let sheet = workbook.Sheets["Policy areas"]
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

// //content update
// for (j = 0; j < xlData.length; j++) {
//     if (xlData[j]["Licence Name"] === "Open Government Licence"){
//         xlData[j]["Licence Name"] = "Test"
//     }
//     temp = xlData[j]["Attribution Statement"]
//     xlData[j]["Attribution Statement"] = temp.replace(' /n', 'oranges')
//     console.log(xlData[j]["Attribution Statement"])
// }
let k=0
for (j = 0; j < headersConfig.length; j++) {
    for (i = 0; i < xlData.length; i++) {
        if (missing.includes(xlData[i].Number)) {
        result = xlData[i][headersConfig[j].title]
        // console.log(result)
        if (data[k] != null) {
            
                // console.log(xlData[i].Number)
                // data.push(xlData[i].Number)
                temp = data[k]
                temp[[headersConfig[j].id]] = result
                data[k] = temp
                
            }


         else {
            data[k] = {
                [headersConfig[j].id]: result
            };
            
        }
        k=k+1
    }

    }
}

// for (i = 0; i < xlData.length; i++) {
//     // console.log(xlData[i].Number)
//     // const found = missing.includes(xlData[i].Number);



// }
console.log(data)
console.log("Writing CSV")
csvWriter.writeRecords(data)
    .then(() => {
        console.log('Complete file at ' + path);
    });
return