const cardSubheaders = Array.from(document.querySelectorAll(".card-subheaders"))

const dataAnalysisHeaders = [
    "Streaming Analysis"
];
const intelligentHeaders = ["Talent and Content Management System",
    "Marketing and Targeting Planning & Analysis",
    "Contract Constructor and Generator",
    "Customizable Task Manager"];

const bridgeHeaders = [
    "Spotify API Bridge",
    "Airtable Base Auto-Backup",
    "Airtable API Bridge",
    "Monito.website Data Hub",
    "Server-Client system for running multiple VPS instances"
];

const links_dataAnalysisHeaders = ["http://poznyakov.netlify.app/data-analysis-projects/"];
const links_intelligentHeaders = ["https://poznyakov.netlify.app/public-website/talent-and-content-management-system/", "https://poznyakov.netlify.app/notes/public-website-marketing-and-targeting-planning-and-amp-analysis", "https://poznyakov.netlify.app/public-website/contract-constructor-and-generator/", "https://poznyakov.netlify.app/customizable-task-manager/"];
const links_bridgeHeaders = ["https://poznyakov.netlify.app/public-website/spotify-api-bridge/", "https://poznyakov.netlify.app/public-website/airtable-base-auto-backup/", "https://poznyakov.netlify.app/public-website/airtable-api-bridge/", "https://poznyakov.netlify.app/public-website/monito-website-data-hub/", "https://poznyakov.netlify.app/public-website/server-client-system-for-running-multiple-vps-instances/"];




const elementCreation = (elem) => {
    let n = document.createElement('elem');
}
const appendHeaders = (parent, arr, links) => {
    arr.map((item, index) => {
        let a = document.createElement("a")
        a.innerHTML = item;
        a.classList.add("subheaders")
        a.href = links[index];
        parent.append(a)
        console.log(links[index])
    })
}

appendHeaders(document.querySelectorAll(".card-subheaders")[0], dataAnalysisHeaders, links_dataAnalysisHeaders)
appendHeaders(document.querySelectorAll(".card-subheaders")[1], intelligentHeaders, links_intelligentHeaders)
appendHeaders(document.querySelectorAll(".card-subheaders")[2], bridgeHeaders, links_bridgeHeaders)



// cardSubheaders.map((item, index) => item.addEventListener('click', () => {
//     if (index === 0) createSubFolder(dataAnalysisHeaders)
//     if (index === 1) createSubFolder(intelligentHeaders)
//     if (index === 2) createSubFolder(bridgeHeaders)
// }))