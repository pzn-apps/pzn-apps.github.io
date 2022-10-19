import { Octokit, App } from "https://cdn.skypack.dev/octokit?dts";
const mainDescription = document.getElementById('main-description');
const wordAutoFillArrs = [];
const wordAutoFillContent = [];
const dataAnalysisArrs = [];
const dataAnalysisSubfolders = [];
const intelligentInfoArrs = [];
const intelligentInfoSubfolders = [];
const bridgeArrs = [];
const bridgeSubfolders = [];
const projectHeader = Array.from(document.querySelectorAll('.project-header'));
const linkToEngRepo = "/repos/pzn-apps/pzn-apps.github.io/contents/EN/"
const linkToEngWordDocumentAutoFill = "/repos/pzn-apps/pzn-apps.github.io/contents/EN/word-document-auto-fill/"
const endOfMdFile = "?ref=main";
const octokit = new Octokit({
    auth: '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'
})

async function getIntroMd() {
    const introResponse = await octokit.request(`GET ${linkToEngRepo}intro.md${endOfMdFile}`, {

        owner: 'OWNER',
        repo: 'REPO'

    })
    let uncodedRepository = atob(introResponse.data.content)
    let fixedText = uncodedRepository.replaceAll("![[pzn-apps/img", "![alt text](https://github.com/pzn-apps/pzn-apps.github.io/blob/main/img")
    let endFixedText = fixedText.replaceAll("]]", "?raw=true)");
    var converter = new showdown.Converter(),
        convertedText = endFixedText,
        html = converter.makeHtml(convertedText);

    mainDescription.innerHTML = html;
}
getIntroMd()
const dataArr = [];
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

async function getContentWordDocumentAutoFill() {
    const firstFile = await octokit.request(`GET ${linkToEngWordDocumentAutoFill}0.%20About%20Word%20Document%20Auto-Fill.md${endOfMdFile}`, {

        owner: 'OWNER',
        repo: 'REPO'

    })
    addToWordArr(firstFile, wordAutoFillContent)

    const secondFile = await octokit.request(`GET ${linkToEngWordDocumentAutoFill}1.%20Installation.md${endOfMdFile}`, {

        owner: 'OWNER',
        repo: 'REPO'

    })
    addToWordArr(secondFile, wordAutoFillContent)
    const thirdFile = await octokit.request(`GET ${linkToEngWordDocumentAutoFill}2.%20Create%20a%20template.md${endOfMdFile}`, {

        owner: 'OWNER',
        repo: 'REPO'

    });
    addToWordArr(thirdFile, wordAutoFillContent)
    const fourthFile = await octokit.request(`GET ${linkToEngWordDocumentAutoFill}3.%20Fields.md${endOfMdFile}`, {

        owner: 'OWNER',
        repo: 'REPO'

    });
    addToWordArr(fourthFile, wordAutoFillContent)
    const fifthFile = await octokit.request(`GET ${linkToEngWordDocumentAutoFill}4.%20Edit%20field's%20data%20path.md${endOfMdFile}`, {

        owner: 'OWNER',
        repo: 'REPO'

    });
    addToWordArr(fifthFile, wordAutoFillContent)
    const sixthFile = await octokit.request(`GET ${linkToEngWordDocumentAutoFill}5.%20Download%20auto-filled%20document.md${endOfMdFile}`, {

        owner: 'OWNER',
        repo: 'REPO'

    });
    addToWordArr(sixthFile, wordAutoFillContent)
    const privacyPolicy = await octokit.request(`GET ${linkToEngWordDocumentAutoFill}WDAF%20Privacy%20Policy.md${endOfMdFile}`, {

        owner: 'OWNER',
        repo: 'REPO'

    });
    addToWordArr(privacyPolicy, wordAutoFillContent)
    const termsConditions = await octokit.request(`GET ${linkToEngWordDocumentAutoFill}WDAF%20Terms%20and%20Conditions.md${endOfMdFile}`, {

        owner: 'OWNER',
        repo: 'REPO'

    });
    addToWordArr(termsConditions, wordAutoFillContent)
}
getContentWordDocumentAutoFill()
console.log(wordAutoFillContent)
async function getFolders() {
    const responseDataAnalysis = await octokit.request(`GET ${linkToEngRepo}word-document-auto-fill`, {

        owner: 'OWNER',
        repo: 'REPO'

    })
    for (let i = 0; i < responseDataAnalysis.data.length; i++) {
        wordAutoFillArrs.push(responseDataAnalysis.data[i].name.replace(/.md/, ''));

    }
    // const responseNestedDataAnalysis = await octokit.request(`GET ${linkToEngRepo}FirstProject/FirstNestedFolder`, {

    //     owner: 'OWNER',
    //     repo: 'REPO'

    // })
    // for (let i = 0; i < responseDataAnalysis.data.length; i++) {
    //     dataAnalysisSubfolders.push(responseNestedDataAnalysis.data[i].name.replace(/.md/, ''));
    // }
    // const responseIntelligent = await octokit.request(`GET ${linkToEngRepo}SecondProject`, {

    //     owner: 'OWNER',
    //     repo: 'REPO'

    // })
    // for (let i = 0; i < responseIntelligent.data.length; i++) {
    //     intelligentInfoArrs.push(responseIntelligent.data[i].name.replace(/.md/, ''));
    // }
    // const responseIntelligentSubfolders = await octokit.request(`GET ${linkToEngRepo}SecondProject/SecondNestedFolder`, {

    //     owner: 'OWNER',
    //     repo: 'REPO'

    // })
    // for (let i = 0; i < responseIntelligentSubfolders.data.length; i++) {
    //     intelligentInfoSubfolders.push(responseIntelligentSubfolders.data[i].name.replace(/.md/, ''));
    // }
    // const responseBridge = await octokit.request(`GET ${linkToEngRepo}ThirdProject`, {

    //     owner: 'OWNER',
    //     repo: 'REPO'

    // })

    // for (let i = 0; i < responseBridge.data.length; i++) {
    //     bridgeArrs.push(responseBridge.data[i].name.replace(/.md/, ''));
    // }
    // const responseBridgeSubfolders = await octokit.request('GET /repos/levpravstudio/poznyakovENG/contents/ThirdProject/ThirdNestedFolder', {

    //     owner: 'OWNER',
    //     repo: 'REPO'

    // })
    // for (let i = 0; i < responseBridgeSubfolders.data.length; i++) {
    //     bridgeSubfolders.push(responseBridgeSubfolders.data[i].name.replace(/.md/, ''));
    // }
}
getFolders()




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
}
getSpecifiedMdFile()
const createSubFolder = (arr, index, subacontent) => {
    Array.from(document.querySelector(".left-content").children).map(item => item.remove())
    for (let i = 0; i < arr.length; i++) {
        let a = document.createElement('a')
        a.classList.add('left-content-subfolder');
        a.innerHTML = arr[i];
        a.href = `#${arr[i]}`
        document.querySelector(".left-content").append(a)
        a.addEventListener('click', () => {
            mainDescription.innerHTML = subacontent[i];
            Array.from(document.querySelectorAll(".left-content-subfolder")).map((item, index) => Array.from(item.children).map(item => item.remove()));
            let subA = document.createElement('div');
            if (dataAnalysisSubfolders[i] !== undefined) {
                if (index === 0) subA.innerHTML = dataAnalysisSubfolders[i]

            }
            if (intelligentInfoSubfolders[i] !== undefined) {
                if (index === 1) subA.innerHTML = intelligentInfoSubfolders[i]
            }
            if (bridgeSubfolders[i] !== undefined) {
                if (index === 2) subA.innerHTML = bridgeSubfolders[i]
            }
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
    if (index === 0) createSubFolder(wordAutoFillArrs, index, wordAutoFillContent)
    if (index === 1) createSubFolder(dataAnalysisArrs, index)
    if (index === 2) createSubFolder(intelligentInfoArrs, index)
    if (index === 3) createSubFolder(bridgeArrs, index)
}))


