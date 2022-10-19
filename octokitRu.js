import { Octokit, App } from "https://cdn.skypack.dev/octokit?dts";
const mainDescription = document.getElementById('main-description');
const dataAnalysisArrs = [];
const dataAnalysisSubfolders = [];
const intelligentInfoArrs = [];
const intelligentInfoSubfolders = [];
const bridgeArrs = [];
const bridgeSubfolders = [];
const projectHeader = Array.from(document.querySelectorAll('.project-header'));

const linkToRuRepo = "/repos/levpravstudio/poznyakovRU/contents/"
const octokit = new Octokit({
    auth: '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'
})
async function getIntroMd() {
    const introResponse = await octokit.request(`GET ${linkToRuRepo}интро.md?ref=main`, {

        owner: 'OWNER',
        repo: 'REPO'

    })
    let uncodedRepository = atob(introResponse.data.content)

    let encodedRu = utf8.decode(uncodedRepository);

    var converter = new showdown.Converter(),
        text = encodedRu,
        html = converter.makeHtml(text);

    mainDescription.innerHTML = html;
}
getIntroMd()
async function getFolders() {
    const responseDataAnalysis = await octokit.request(`GET ${linkToRuRepo}1%20Проект`, {

        owner: 'OWNER',
        repo: 'REPO'

    })
    for (let i = 0; i < responseDataAnalysis.data.length; i++) {
        dataAnalysisArrs.push(responseDataAnalysis.data[i].name.replace(/.md/, ''));
    }
    const responseNestedDataAnalysis = await octokit.request(`GET ${linkToRuRepo}1%20Проект/1%20Вложенный`, {

        owner: 'OWNER',
        repo: 'REPO'

    })
    for (let i = 0; i < responseDataAnalysis.data.length; i++) {
        dataAnalysisSubfolders.push(responseNestedDataAnalysis.data[i].name.replace(/.md/, ''));
    }
    const responseIntelligent = await octokit.request(`GET ${linkToRuRepo}2%20Проект`, {

        owner: 'OWNER',
        repo: 'REPO'

    })
    for (let i = 0; i < responseIntelligent.data.length; i++) {
        intelligentInfoArrs.push(responseIntelligent.data[i].name.replace(/.md/, ''));
    }
    const responseIntelligentSubfolders = await octokit.request(`GET ${linkToRuRepo}2%20Проект/2%20Вложенный`, {

        owner: 'OWNER',
        repo: 'REPO'

    })
    for (let i = 0; i < responseIntelligentSubfolders.data.length; i++) {
        intelligentInfoSubfolders.push(responseIntelligentSubfolders.data[i].name.replace(/.md/, ''));
    }
    const responseBridge = await octokit.request(`GET ${linkToRuRepo}3%20Проект`, {

        owner: 'OWNER',
        repo: 'REPO'

    })

    for (let i = 0; i < responseBridge.data.length; i++) {
        bridgeArrs.push(responseBridge.data[i].name.replace(/.md/, ''));
    }
    const responseBridgeSubfolders = await octokit.request(`GET ${linkToRuRepo}3%20Проект/3%20Вложенный`, {

        owner: 'OWNER',
        repo: 'REPO'

    })
    for (let i = 0; i < responseBridgeSubfolders.data.length; i++) {
        bridgeSubfolders.push(responseBridgeSubfolders.data[i].name.replace(/.md/, ''));
    }
}
getFolders()



const dataArr = [];
async function getSpecifiedMdFile() {
    const repository = await octokit.request('GET /repos/levpravstudio/digitalgarden/contents/src/site/notes/test.md?ref=main', {
        owner: 'OWNER',
        repo: 'REPO',
        path: 'PATH'
    })
    let uncodedRepository = atob(repository.data.content)



    var converter = new showdown.Converter(),
        text = uncodedRepository,
        html = converter.makeHtml(text);

    dataArr.push(html)
}
getSpecifiedMdFile()
const createSubFolder = (arr, index) => {
    Array.from(document.querySelector(".left-content").children).map(item => item.remove())
    for (let i = 0; i < arr.length; i++) {
        let a = document.createElement('a')
        a.classList.add('left-content-subfolder');
        a.innerHTML = arr[i];
        document.querySelector(".left-content").append(a)
        a.addEventListener('click', () => {
            Array.from(document.querySelectorAll(".left-content-subfolder")).map((item, index) => Array.from(item.children).map(item => item.remove()));
            let subA = document.createElement('div');
            if (index === 0) subA.innerHTML = dataAnalysisSubfolders[i]
            if (index === 1) subA.innerHTML = intelligentInfoSubfolders[i]
            if (index === 2) subA.innerHTML = bridgeSubfolders[i]
            subA.classList.add("left-content-suba");
            a.append(subA);
            subA.addEventListener('click', () => {
                mainDescription.innerHTML = dataArr[i];
            })
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
    if (index === 0) createSubFolder(dataAnalysisArrs, index)
    if (index === 1) createSubFolder(intelligentInfoArrs, index)
    if (index === 2) createSubFolder(bridgeArrs, index)
}))


