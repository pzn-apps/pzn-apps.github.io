import { Octokit, App } from "https://cdn.skypack.dev/octokit?dts";
const api_key = config.API_KEY;
const mainDescription = document.getElementById('main-description');
const leftContent = document.querySelector(".left-content");
const wordAutoFillFolders = [];
const wordAutoFillContent = [];
const dataAnalysisArrs = [];
const dataAnalysisSubfolders = [];
const intelligentInfoArrs = [];
const intelligentInfoSubfolders = [];
const bridgeArrs = [];
const bridgeSubfolders = [];

const projectHeader = Array.from(document.querySelectorAll('.project-header'));
const linkToEngRepo = "/repos/pzn-apps/pzn-apps.github.io/contents/en/"
const linkToEngWordDocumentAutoFill = "/repos/pzn-apps/pzn-apps.github.io/contents/en/word-document-auto-fill/"
const endOfMdFile = "?ref=main";
const octokit = new Octokit({
    auth: "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",
})


const dataArr = [];
//get intro md file eng
const introMdArray = [];
// async function getIntroMd() {
//     const introResponse = await octokit.request(`GET ${linkToEngRepo}intro.md${endOfMdFile}`, {

//         owner: 'OWNER',
//         repo: 'REPO'

//     })

//     addToWordArr(introResponse, introMdArray)
//     mainDescription.innerHTML = introMdArray[0];
// }
// getIntroMd()
const addToWordArr = (response, array) => {
    //[Link text Here](https://link-url-here.org)
    let uncodedRepository = atob(response.data.content)
    let fixedText = uncodedRepository.replaceAll("![[pzn-apps/img", "![alt text](https://github.com/pzn-apps/pzn-apps.github.io/blob/main/img")
    let endFixedText = fixedText.replaceAll("]]", "?raw=true)");
    var converter = new showdown.Converter(),
        convertedText = endFixedText,
        html = converter.makeHtml(convertedText);

    array.push(html);
}
// const testArr = '[abc](./)'
// var converter = new showdown.Converter(),
//     convertedText = testArr,
//     html = converter.makeHtml(convertedText);

// mainDescription.innerHTML = html;
//---------------example of raw link 
// async function getContentWordDocumentAutoFill() {
//     const firstFile = await octokit.request(`GET ${linkToEngWordDocumentAutoFill}0.%20About%20Word%20Document%20Auto-Fill.md${endOfMdFile}`, {

//         owner: 'OWNER',
//         repo: 'REPO' 

//     })
const enProjects = [];
const getEnProjects = async () => {
    const response = await octokit.request(`GET ${linkToEngRepo}`, {
        owner: 'OWNER',
        repo: 'REPO'
    })
    for (let i = 0; i < response.data.length; i++) {
        if (!response.data[i].name.includes(".md")) {
            enProjects.push(response.data[i].name)
        }
    }
}
getEnProjects()
const getContent = async (projectName, item, length) => {
    for (let i = 0; i < 1; i++) {
        let regExpItem = item.name.replaceAll(/ /g, "%20");

        const responseData = await octokit.request(`GET ${projectName}${regExpItem}${endOfMdFile}`)

        addToWordArr(responseData, wordAutoFillContent)
    }
}
// let enFolders = {};
let pathWordDocument = []

async function getFoldersCount(project, arr) {
    const response = await octokit.request(`GET ${project}`, {
        owner: 'OWNER',
        repo: 'REPO'
    })
    for (let i = 0; i < response.data.length; i++) {
        getContent(project, response.data[i], response.data.length)
        arr.push(response.data[i].name)
    }


}
getFoldersCount(linkToEngWordDocumentAutoFill, wordAutoFillFolders)



const createSubFolder = (arr, index, subacontent) => {
    mainDescription.innerHTML = '';
    pathWordDocument = arr.map(item => item.replace(/ /g, '').replace(/.md/g, ''))

    if (leftContent.children.length === 0) {
        for (let i = 0; i < arr.length; i++) {
            let a = document.createElement('a')
            a.href = pathWordDocument[i];
            a.classList.add('left-content-subfolder');
            a.innerHTML = arr[i].replace(/.md/g, '')
            document.querySelector(".left-content").append(a)
            a.addEventListener('click', () => {
                mainDescription.innerHTML = subacontent[i];
            })
        }
        return pathWordDocument
    }

}
let resp = 0;

projectHeader.map((item, index) => item.addEventListener('click', () => {
    projectHeader.map(item => {
        item.style.backgroundColor = 'rgb(207, 207, 207)';
        item.style.transform = "scale(1)"
    })
    item.style.backgroundColor = "white"
    item.style.transform = "scale(1.09)"
    if (index === 0) resp = createSubFolder(wordAutoFillFolders, index, wordAutoFillContent)
    // if (index === 1) createSubFolder(dataAnalysisArrs, index)
    // if (index === 2) createSubFolder(intelligentInfoArrs, index)
    // if (index === 3) createSubFolder(bridgeArrs, index)

}))
console.log(resp)

