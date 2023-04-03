const fetch = require('node-fetch');

let url = "https://beta.gss-data.org.uk/sparql?accept=application%2Fjson&query=PREFIX%20dcat%3A%20%3Chttp%3A%2F%2Fwww.w3.org%2Fns%2Fdcat%23%3E%0APREFIX%20dcterms%3A%20%3Chttp%3A%2F%2Fpurl.org%2Fdc%2Fterms%2F%3E%0APREFIX%20owl%3A%20%3Chttp%3A%2F%2Fwww.w3.org%2F2002%2F07%2Fowl%23%3E%0APREFIX%20qb%3A%20%3Chttp%3A%2F%2Fpurl.org%2Flinked-data%2Fcube%23%3E%0APREFIX%20rdf%3A%20%3Chttp%3A%2F%2Fwww.w3.org%2F1999%2F02%2F22-rdf-syntax-ns%23%3E%0APREFIX%20rdfs%3A%20%3Chttp%3A%2F%2Fwww.w3.org%2F2000%2F01%2Frdf-schema%23%3E%0APREFIX%20skos%3A%20%3Chttp%3A%2F%2Fwww.w3.org%2F2004%2F02%2Fskos%2Fcore%23%3E%0APREFIX%20void%3A%20%3Chttp%3A%2F%2Frdfs.org%2Fns%2Fvoid%23%3E%0APREFIX%20xsd%3A%20%3Chttp%3A%2F%2Fwww.w3.org%2F2001%2FXMLSchema%23%3E%0A%0ASELECT%20*%0AWHERE%20%7B%20%3Fs%20rdfs%3Alabel%20%3Fo%20%7D%0ALIMIT%2010"

fetch(url)
    .then((response) => response.json())
    .then(json => {
        rewriteSparql(json.results.bindings, json.head.vars)
    }).catch(function (error) {
        console.log(error);
    });

rewriteSparql = (data, selects) => {
    results = []
    for (j = 0; j < data.length; j++) {
        temp = {}
        for (i = 0; i < selects.length; i++) {
            let thisSelect = selects[i]
            temp[thisSelect] = data[j][thisSelect].value
        }
        results.push(temp)
    }
    console.log(results)
}
