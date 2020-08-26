const URL = "https://environment.data.gov.uk/api/search?searchTerm=environment&orderBy=Relevancy";
    const start = 0
    const pageSize = 1
    // let results = [];

    controller()

    function getData(a, b) {
        pageRequest = URL + '&from=' + a + '&to=' + b;
        // console.log(pageRequest)
        return fetch(pageRequest)
            .then(response => response.json())
            .then((data) => {
                return data;
            })
            .catch(error => {
                console.error(error)
                return;
            })
    }

    function resolveAfter() {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve('resolved');
            }, 50);
        });
    }

    async function controller() {
        console.log('Button pressed')
        const total = await getData(1, 1);
        let totalResults = total.totalResults

        //temp overide
        // totalResults = 5
        results = await results(totalResults);
        console.log(results)
        addDataToPage(results)

    }

    async function results(data) {
        d = []
        for (i = start; i < data; i + pageSize) {
            const wait = await resolveAfter();
            result = await getData(i + 1, i + pageSize);
            try {
                d.push(result.results[0])
            } catch (error) {
                console.error(error);
            }
            i = i + pageSize
        }
        return d
    }

    function addDataToPage(data) {
        content = "Dataset title,Owner,Description,Metadata catalogue reference,Last updated,Licence1,Licence2,Licence3,LinkURL1,LinkName1,LinkURL2,LinkName2,LinkURL3,LinkName3,LinkURL4,LinkName4,LinkURL5,LinkName5,LinkURL6,LinkName6,LinkURL7,LinkName7,LinkURL8,LinkName8,LinkURL9,LinkName9,LinkURL10,LinkName10,LinkURL11,LinkName11,LinkURL12,LinkName12"
        for (i = 0; i < data.length; i++) {
            licence = ""
            for (j=0; j < 3; j++) {
                if (data[i].licenceLinks[j] != null) {
                licence = licence + data[i].licenceLinks[j].url + ","
                }
                else {
                    licence = licence + ","
                    }
            }
            links = ""
            for (k=0; k < 12; k++) {
                if (data[i].links[k] != null) {
                links = links + data[i].links[k].url + ',"' + data[i].links[k].name + '",'
                }
                else {
                    links = links + ","
                    }
            }
            content = content + '<br>"' + data[i].title + '","' + data[i].publishedByName + '","' + data[i].abstract + '",'+ data[i].id + ','+ data[i].revisionDate + ',' + licence + links + ','
        }
        Console.log(content)

    }