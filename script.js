
export const importFunc = () => {
    console.log("text")
}



// const elementCreation = (elem) => {
//     let n = document.createElement('elem');
// }


// const createSubFolder = (arr) => {
//     Array.from(document.querySelector(".left-content").children).map(item => item.remove())
//     for (let i = 0; i < arr.length; i++) {
//         let a = document.createElement('a')
//         a.classList.add('left-content-subfolder');
//         a.innerHTML = arr[i]
//         document.querySelector(".left-content").append(a)
//         a.addEventListener('click', () => {
//             Array.from(document.querySelectorAll(".left-content-subfolder")).map(item => Array.from(item.children).map(item => item.remove()));
//             // Array.from(document.querySelectorAll(".left-content-subfolder")[i].children).map(item => item.remove());
//             let subA = document.createElement('div');
//             subA.innerHTML = "Change when ready";
//             subA.classList.add("left-content-suba");
//             a.append(subA);
//         })
//     }

// }





// projectHeader.map((item, index) => item.addEventListener('click', () => {
//     projectHeader.map(item => {
//         item.style.backgroundColor = 'rgb(207, 207, 207)';
//         item.style.transform = "scale(1)"
//     })
//     item.style.backgroundColor = "white"
//     item.style.transform = "scale(1.09)"
//     if (index === 0) createSubFolder(dataAnalysisHeaders)
//     if (index === 1) createSubFolder(intelligentHeaders)
//     if (index === 2) createSubFolder(bridgeHeaders)
// }))

// const projectHeader = Array.from(document.querySelectorAll('.project-header'));
