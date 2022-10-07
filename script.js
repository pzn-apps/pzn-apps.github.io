const projectHeader = Array.from(document.querySelectorAll('.project-header'));
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
const elementCreation = (elem) => {
    let n = document.createElement('elem');
}


const createSubFolder = (arr) => {
    Array.from(document.querySelector(".left-content").children).map(item => item.remove())
    for (let i = 0; i < arr.length; i++) {
        let a = document.createElement('a')
        a.classList.add('left-content-subfolder');
        a.innerHTML = arr[i]
        document.querySelector(".left-content").append(a)
    }
}





projectHeader.map((item, index) => item.addEventListener('click', () => {
    if (index === 0) createSubFolder(dataAnalysisHeaders)
    if (index === 1) createSubFolder(intelligentHeaders)
    if (index === 2) createSubFolder(bridgeHeaders)
}))