import { Octokit, App } from "https://cdn.skypack.dev/octokit?dts";
const mainDescription = document.getElementById('main-description');
const folderNames = [];
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
const octokit = new Octokit({
    auth: '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'
})

async function getReadme() {
    const responseDataAnalysis = await octokit.request('GET /repos/levpravstudio/digitalgarden/contents/src/site/notes', {

        owner: 'OWNER',
        repo: 'REPO'

    })
    console.log(responseDataAnalysis.data)
    for (let i = 0; i < responseDataAnalysis.data.length; i++) {
        folderNames.push(responseDataAnalysis.data[i].name.replace(/.md/, ''));
    }
}
getReadme()
async function getSpecifiedMdFile() {
    const repository = await octokit.request('GET /repos/levpravstudio/digitalgarden/contents/src/site/notes/test.md?ref=main', {
        owner: 'OWNER',
        repo: 'REPO',
        path: 'PATH'
    })
    const gitImg = await octokit.request('GET /repos/levpravstudio/digitalgarden/contents/src/site/notes/image.png?ref=main', {
        owner: 'OWNER',
        repo: 'REPO',
        path: 'PATH'
    })
    console.log(repository)
    console.log(gitImg)
    let uncodedRepository = atob(repository.data.content)



    var converter = new showdown.Converter(),
        text = uncodedRepository,
        html = converter.makeHtml(text);
    mainDescription.innerHTML = html;
}
getSpecifiedMdFile()


const createSubFolder = (arr) => {
    Array.from(document.querySelector(".left-content").children).map(item => item.remove())
    for (let i = 0; i < arr.length; i++) {
        let a = document.createElement('a')
        a.classList.add('left-content-subfolder');
        a.innerHTML = arr[i];
        document.querySelector(".left-content").append(a)
        a.addEventListener('click', () => {
            Array.from(document.querySelectorAll(".left-content-subfolder")).map(item => Array.from(item.children).map(item => item.remove()));
            // Array.from(document.querySelectorAll(".left-content-subfolder")[i].children).map(item => item.remove());
            let subA = document.createElement('div');
            subA.innerHTML = "Change when ready"
            subA.classList.add("left-content-suba");
            a.append(subA);
        })
    }

}

projectHeader.map((item, index) => item.addEventListener('click', () => {
    projectHeader.map(item => {
        item.style.backgroundColor = 'rgb(207, 207, 207)';
        item.style.transform = "scale(1)"
    })
    item.style.backgroundColor = "white"
    item.style.transform = "scale(1.09)"
    if (index === 0) createSubFolder(folderNames)
    if (index === 1) createSubFolder(intelligentHeaders)
    if (index === 2) createSubFolder(bridgeHeaders)
}))





//    // let img = new Image();
    // img.src = "data:image/png;base64," + (gitImg.data.content)
    // console.log(img)
    // let uncodedImg = atob(gitImg.data.content)



