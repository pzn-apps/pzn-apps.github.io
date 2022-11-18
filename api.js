require("dotenv").config();
const { Octokit } = require('octokit')
const expressHandleBars = require('express-handlebars');
const linkToEngRepo = "/repos/pzn-apps/pzn-apps-content/contents/en/"
const linkToEngWordDocumentAutoFill = "/repos/pzn-apps/pzn-apps-content/contents/en/word-document-auto-fill/"
const endOfMdFile = "?ref=main";
const express = require('express');
const app = express();
const arrRender = []
const routeRender = []
const octokit = new Octokit({
    auth: process.env.API_KEY,
})

const wordAutoFillContent = [];

async function getIntroMd() {
    const introResponse = await octokit.request(`GET ${linkToEngRepo}intro.md${endOfMdFile}`, {

        owner: 'OWNER',
        repo: 'REPO'

    })

    addToWordArr(introResponse, introMdArray, 0)
}
getIntroMd()

console.log(Math.clz32(1))
const addToWordArr = (response, array, index) => {

    let uncodedRepository = atob(response.data.content)
    let removeLinks = uncodedRepository.replace(/\%20/g, '').replace(/\.md/g, '')
    //change link to img
    let fixedText = removeLinks.replaceAll("![[pzn-apps/img", `![alt text](https://github.com/pzn-apps/pzn-apps-content/blob/main/views/img`)
    let endFixedText = fixedText.replaceAll("]]", "?raw=true)");
    let showdown = require('showdown'),
        converter = new showdown.Converter(),
        convertedText = endFixedText,
        html = converter.makeHtml(convertedText);

    array[index] = html;
    return array
}
const wordArray = [];
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
    let arr
    let index
    for (let i = 0; i < 1; i++) {
        let regExpItem = item.name.replaceAll(/ /g, "%20");

        const responseData = await octokit.request(`GET ${projectName}${regExpItem}${endOfMdFile}`)
        index = responseData.data.name[0]
        arr = addToWordArr(responseData, wordAutoFillContent, index)

    }
    for (let i = 0; i < length; i++) {
        app.get(`/${routeRender[i]}`, (req, res) => {

            res.render('layouts/main', { right_content: arr[i], left_content: arrRender.join('').split(',') })

        })
    }

}
const wordAutoFillFolders = [];
const handlebars = expressHandleBars.create({
    defaultLayout: 'main',
    extname: 'hbs',
});
app.engine('hbs', handlebars.engine)

// view engine - шаблонизатор,hbs - расширение файла
app.set('view engine', 'hbs')

app.get('/', (req, res) => {
    res.render('layouts/main', { right_content: introMdArray })
})



app.use(express.static(__dirname + '/views/'));

app.listen(5050)

const dataArr = [];
const introMdArray = [];



getEnProjects()
async function getFoldersCount(project, arr) {
    const response = await octokit.request(`GET ${project}`, {
        owner: 'OWNER',
        repo: 'REPO'
    })
    for (let i = 0; i < response.data.length; i++) {
        getContent(project, response.data[i], response.data.length)
        arr.push(response.data[i].name)
    }
    const newArr = arr.map(item => item.replace(/ /g, ''))
    return [newArr, arr]
}

getFoldersCount(linkToEngWordDocumentAutoFill, wordAutoFillFolders).then(item => {
    for (let i = 0; i < item[0].length; i++) {
        routeRender.push(item[0][i].replace(/.md/, '').replace(/'.*$/, ""))
        let a = `<a class = 'left-content-subfolder' href='./${item[0][i].replace(/.md/, '')}'>${item[1][i].replace(/.md/, '')}</a>`
        arrRender.push(a)
    }

    app.get('/', (req, res) => {
        res.render("main.hbs",
            { content: arrRender.map(item => item) }
        )
    })



})



const pathWordDocumentArr = [];

const pathCreate = (foldersArray) => {
    foldersArray = foldersArray.forEach(item => item.replace(/ /g, ""));
}
pathCreate(wordAutoFillFolders)









