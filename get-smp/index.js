const fetch = require('node-fetch');

singleLayers = [
    "EA%2FFloodMapForPlanningRiversAndSeaFloodZone3",
    "EA%2FFloodMapForPlanningRiversAndSeaFloodZone2",
    "NE%2FSpecialProtectionAreasEngland",
    "NE%2FPotentialSpecialProtectionAreasEngland",
    "NE%2FSpecialAreasOfConservationEngland",
    "NE%2FPossibleSpecialAreasOfConservationEngland",
    "NE%2FRamsarEngland",
    "NE%2FNationalNatureReservesEngland",
    "NE%2FLocalNatureReservesEngland",
    "HE%2FListedBuildings",
    "NE%2FMarineConservationZonesEngland",
    "NE%2FAreasOfOutstandingNaturalBeautyEngland",
    "NE%2FHeritageCoastsEngland",
    "NE%2FNationalParksEngland",
    "EA%2FAdministrativeBoundariesRFCC",
]

// "Local_Authority_Districts_(December_2021)_GB_BFC"
// "National_Heritage_List_for_England_NHLE_-7361388647773861022"

sleep = ms => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const createJobURL = "https://environment.data.gov.uk/arcgis/rest/services/gp/DataDownload/GPServer/DataDownload/submitJob?f=json&SourceToken=&OutputFormat=SHP&RequestMode=SPATIAL&FullExtract=true&MapService="

createJob = async (layer) => {
    let url = `${createJobURL}${layer}`
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const api = await response.json();

    return api.jobId
}

getJobResults = async (jobId) => {
    url = `https://environment.data.gov.uk/arcgis/rest/directories/arcgisjobs/gp/datadownload_gpserver/${jobId}/scratch/results.json`
    await sleep(2000);

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const api = await response.json();
    console.log(api.url)
}

start = async () => {
    for (i = 0; i < singleLayers.length; i++) {
        jobId = await createJob(singleLayers[i])
        await getJobResults (jobId)
    }
}

start()