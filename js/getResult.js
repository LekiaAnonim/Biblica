// const bibleVersionID = document.querySelector('#languages').value || `06125adad2d5898a-01`;
API_KEY = `e1d3a7bcbb9af8b1232dea1bdf4d9dcb`;
let selObj = document.getSelection();
let offset = 0;

const elememtSel = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, a');
Array.from(elememtSel).forEach(function (elem) {
    removeresultList();
    if (elem) {
    elem.addEventListener("mouseup", showResult, true);
}
})

function renderHTML(data, offset) {
    let resultDiv = document.createElement('div');
    resultDiv.classList.add('resultdiv');
    resultHTML = ``;
        if (data.passages) {
            if (!data.passages[0]) {
                resultHTML = `<div class="data-not-found cont">☹️ No results. Try <a href="index.html">changing versions?</a></div>`;
            } else {
                resultHTML += `<div class="cont">`;
                
                resultHTML += `<div class="resultbody-cont">`;
                resultHTML += `<div class="page"><p class="page-p">Page: ${offset+1}</p></div>`;
                for (const passage of data.passages) {
                    resultHTML += ` <div class="resultbody">
                                        <h5 class="body-heading">${passage.reference}</h5>
                                        <div>${passage.content}</div>
                                    </div>
                                    `;
                    resultHTML += `</div>`;
                }
                resultHTML += `</div>`;
                resultHTML += `</div>`;
            }
        }
        if (data.verses) {
            if (!data.verses) {
                resultHTML = `<div class="data-not-found cont">☹️ No results. Try <a href="index.html">changing versions?</a></div>`;
            } else {
                resultHTML += `<div class="cont">`;
                resultHTML += `<div class="resultbody-cont">`;
                resultHTML += `<div class="page"><p class="page-p">Page: ${offset+1}</p></div>`;
                for (const verse of data.verses) {
                    resultHTML += `<div class="resultbody">
                            <h5 class="verse-ref">${verse.reference}</h5>
                            <p class="verse-text">${verse.text}</p>
                        </div>
                        `;
                }
                resultHTML += `</div>`;
                resultHTML += `</div>`;
            }
    }
    resultDiv.innerHTML = resultHTML;
    resultList.append(resultDiv);

    const cancel = document.querySelector('.cancel');
    cancel.addEventListener('click', removeresultList, true);
  
    moveDiv(resultList);
  
    let searchT = document.querySelector('.searchtext').innerText
    sessionStorage.LocalToGlobalVar = searchT;
}

function showResult(e) {
    resultList = document.createElement('div');
    resultList.style.left = `${e.clientX + window.scrollX}px`;
    resultList.style.top = `${e.clientY + window.scrollY}px`;
    
    document.body.append(resultList);
    resultList.id = 'passages';
    resultList.classList.add('display-passage');
    resultList.style.display = 'block';
    getBibleVersions().then((versions) => {
        const sortedVersions = sortVersionsByLanguage(versions);
        let vDiv = document.createElement('div');
        vDiv.classList.add('selectDiv');
        let select = document.createElement('select');
        select.id = `languages`;
        vDiv.append(select);
        let option1 = document.createElement('option');
        option1.value = `06125adad2d5898a-01`;
        option1.text = `King James (Authorized) Version`;
        select.append(option1)
        try {
            for (let languageGroup in sortedVersions) {
                const language = languageGroup;
                
                let optiongroup = document.createElement('optgroup');
                optiongroup.label = language;
                select.appendChild(optiongroup);
                const versionss = sortedVersions[languageGroup];
                for (const version of versionss) {
                    let option = document.createElement('option');
                    option.value = version.id;
                    option.text = version.name;
                    optiongroup.appendChild(option)
                }
            }
        } catch (err) {
            console.log(err.message)
        }
        resultList.append(vDiv);

        let languageOption = document.querySelector('#languages');
        languageOption.addEventListener('change', function () {
            resultList.removeChild(resultList.children[1]);
            fetchResultBobdy();
            offset = 0;
        }, false);

        function fetchResultBobdy() {
            const searchText = selObj.toString().replace(/[.]/g,'') || sessionStorage.LocalToGlobalVar;
            const bibleVersionID = languageOption.value;
            fetchData(searchText, bibleVersionID, offset)
            .then(response=>response.json())
            .then(data => {
                resultList.style.display = 'none';
                resultList.style.display = 'block';
                renderHTML(data.data, offset);
            })
        }

        function fetchResultHeadBobdy() {
            const searchText = selObj.toString().replace(/[.]/g,'') || sessionStorage.LocalToGlobalVar;
            const bibleVersionID = languageOption.value;
            fetchData(searchText, bibleVersionID, offset)
            .then(response=>response.json())
            .then(data => {
                resultList.style.display = 'none';
                resultList.style.display = 'block';
                headerHTML(searchText, data.data, vDiv);
                renderHTML(data.data, offset);

                document.querySelector('.previous').addEventListener('click', function (e) {
                    e.preventDefault();
                    previouspage();
                }, false);
            
                document.querySelector('.next').addEventListener('click', function (e) {
                    e.preventDefault();
                    nextpage();
                }, false);

                function nextpage() {
                    offset += 1;
                    fetchResultBobdy();
                }

                function previouspage() {
                    if (offset >= 1) {
                        offset -= 1;
                        fetchResultBobdy();
                    }
                }
            })
        }
        fetchResultHeadBobdy();  
     })
}

function fetchData(searchText, bibleVersionID, offset) {
    return fetch(`https://api.scripture.api.bible/v1/bibles/${bibleVersionID}/search?query=${searchText}&offset=${offset}`,
        {
        headers: {
            "api-key": API_KEY
        },
        credentials: 'same-origin'
        }
    )
}
const logo = chrome.runtime.getURL("/images/biblica.png");
function headerHTML(searchText, data, vDiv) {
    let headDiv = document.createElement('div');
    headDiv.classList.add('head-div');
    headHTML = ``;
    headHTML += `<div class="resulthead">`
    headHTML += `<div>
                        <img class="logo" src=${logo}>
                        <div class="searchtext">${searchText}</div>
                        <div title="Close" class="cancel">✖</div>
                        <div class="pagenav-copy-div">
                            <div class="navigatepage">
                                <button class="previous pagenav"><< Previous</button>
                                <p class="pagenum">${data.total||1}</p>
                                <button class="next pagenav">Next >></button>
                            </div>
                            <div class="tooltip">
                                <button class="copybtn">
                                <span class="tooltiptext" id="myTooltip">Copy to clipboard</span>
                                <i>&#x1F4DD;</i>
                                </button>
                            </div>
                        </div>
                    </div>`;
    headHTML += `</div>`;
    headDiv.innerHTML = headHTML;
    vDiv.append(headDiv);
    const copybutton = document.querySelector('.copybtn');
    copybutton.addEventListener('click', copyResult);
    copybutton.addEventListener('mouseout', outFunc);
    function copyResult() {
        textToCopy = document.querySelectorAll('.resultbody');
        allText = [];
        Array.from(textToCopy).forEach(function(text) {
            allText.push(text.innerText);
            navigator.clipboard.writeText(allText);
        })
        var tooltip = document.getElementById("myTooltip");
        tooltip.innerHTML = "Copied";
    }

    function outFunc() {
        var tooltip = document.getElementById("myTooltip");
        tooltip.innerHTML = "Copy to clipboard";
    }
}

function removeresultList() {
    resultLis = document.querySelectorAll('.display-passage');
    resultLis.forEach(box => {
        box.remove();
    });
}

function getParameterByName(name) {
    const url = window.location.href;
    name = name.replace(/[\[\]]/g, `\\$&`);
    const regex = new RegExp(`[?&]` + name + `(=([^&#]*)|&|#|$)`),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return ``;
    return decodeURIComponent(results[2].replace(/\+/g, ` `));
}

function moveDiv(div) {
    try {
        var mousePosition;
        var offset = [0, 0];
        var isDown = false;
        x = div.x - this.offsetLeft;
        y = div.y - this.offsetTop;
        y += 10;
        div.style.position = "absolute";
        div.style.left = `${x}px`;
        div.style.top = `${y}px`;
        div.addEventListener('mousedown', function(e) {
            isDown = true;
            offset = [
                div.offsetLeft - e.clientX,
                div.offsetTop - e.clientY
            ];
        }, true);
        document.addEventListener('mouseup', function() {
            isDown = false;
        }, true);

        document.addEventListener('mousemove', function(event) {
            if (isDown) {
                mousePosition = {
                    x: event.clientX,
                    y: event.clientY
                };
                div.style.left = (mousePosition.x + offset[0]) + 'px';
                div.style.top = (mousePosition.y + offset[1]) + 'px';
            }
        }, true);
    } catch (err) {
        console.log(err.message);
    }
}