// const bibleVersionID = document.querySelector('#languages').value || `06125adad2d5898a-01`;

let selObj = document.getSelection();
let offset = 0;

const elememtSel = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, a');
Array.from(elememtSel).forEach(function (elem) {
    removeresultList();
    if (elem) {
    elem.addEventListener("mouseup", showResult, true);
}
})

function nextpage() {
    offset += 1;
    showResult();
}

function previouspage() {
    if (offset >= 0) {
        offset -= 1;
        showResult();
    }
}

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

function renderHTML(data, searchText) {
    let resultDiv = document.createElement('div');
    resultDiv.classList.add('resultdiv');
    resultHTML = ``;
        if (data.passages) {
            if (!data.passages[0]) {
                resultHTML = `<div class="data-not-found cont">☹️ No results. Try <a href="index.html">changing versions?</a></div>`;
            } else {
                resultHTML += `<div class="cont" style="width: 400px; max-height:400px; overflow-y: scroll; padding: 0 10px; position:absolute; display:block; background-color:#fff; border: 1px solid #c8d9e7;">`;
                resultHTML += `<div class="resulthead" style="position: fixed; background-color:#fff; margin-top: 0; padding-top:5px;">`
                resultHTML += `<div>
                                    <div class="searchtext" style="width: 380px; margin-top:20px; padding-left:5px; color:#fff;">${searchText}</div>
                                    <div class="cancel" title="Close" style="cursor:pointer; display:flex; align-items:center; justify-content:center; text-justify:center; width:15px; height:15px; position:absolute; top:0; right:0; color:#fff; border-radius:50%; font-size:8px;">✖</div>
                                    <div style="display:flex; align-items:center; justify-content: space-between;">
                                        <div class="navigatepage" style="">
                                        <button title="Go to the previous page" class="previous pagenav" style="display: none; border:none; background-color:#fff; font-size:x-small;"><< Previous</button>
                                        <p style="display: none; background-color:rgb(147, 201, 252);font-size:x-small;">${offset+1} of ${data.total}</p>
                                        <button title="Go to the next page" class="next pagenav" style="display: none; border:none; background-color:#fff;font-size:x-small;">Next >></button>
                                        </div>
                                        <div class="tooltip">
                                        <button class="copybtn" style="border:none; background-color:#fff; font-size:x-small;" onclick="copyResult()" onmouseout="outFunc()">
                                        <span class="tooltiptext" id="myTooltip">Copy to clipboard</span>
                                        <i style="font-size:15px; margin-top:5px;" class="fa">&#xf24d;</i>
                                        </button>
                                        </div>
                                    </div>
                                </div>`;
                resultHTML += `</div>`;

                resultHTML += `<div style="margin-top: 80px;">`;
                for (const passage of data.passages) {
                    resultHTML += ` <div class="resultbody">
                                        <h5 style="font-size: 30px; font-weight:700; padding: 0; margin: 0;">${passage.reference}</h5>
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
                resultHTML += `<div class="cont" style="width: 400px; max-height:400px; overflow-y: scroll; padding: 0 10px; position:absolute; display:block; background-color:#fff; border: 1px solid #c8d9e7;">`;
                resultHTML += `<div class="resulthead" style="position: fixed; background-color:#fff; margin-top: 0; padding-top:5px;">`
                resultHTML += `<div>
                            <div class="searchtext" style="width: 380px; margin-top:20px; padding-left:5px; color:#fff;">${searchText}</div>
                            <div title="Close" class="cancel" style="cursor:pointer; display:flex; align-items:center; justify-content:center; text-justify:center; width:15px; height:15px; position:absolute; top:0; right:0; color:#fff; border-radius:50%; font-size:8px;">✖</div>
                            <div style="display:flex; align-items:center; justify-content: space-between;">
                            <div class="navigatepage" style="display: flex;">
                                <button class="previous pagenav" style="border:none; font-size:x-small;"><< Previous</button>
                                <p class="pagenum" style="font-size:x-small;">${offset+1} of ${data.total}</p>
                                <button class="next pagenav" style="border:none; font-size:x-small;">Next >></button>
                            </div>
                            <div class="tooltip" style="">
                                <button class="copybtn" style="border:none; background-color:none; font-size:x-small;" onclick="copyResult()" onmouseout="outFunc()">
                                <span class="tooltiptext" id="myTooltip">Copy to clipboard</span>
                                <i style="font-size:15px;" class="fa">&#xf24d;</i>
                                </button>
                            </div>
                            </div>
                        </div>`;
                resultHTML += `</div>`;
                resultHTML += `<div style="margin-top: 100px;">`;
                for (const verse of data.verses) {
                    resultHTML += `<div class="resultbody" style="padding: 0 5px;">
                            <h5 class="verse-ref" style="padding: 0; margin:0;">${verse.reference}</h5>
                            <p style="font-size: small; padding: 0; margin: 0;">${verse.text}</p>
                        </div>
                        `;
                }
                resultHTML += `</div>`;
                resultHTML += `</div>`;
            }
    }
    resultDiv.innerHTML = resultHTML;
    resultList.append(resultDiv);
    document.querySelector('.previous').addEventListener('click', function () {
        previouspage(data)
    }, false);
  
    document.querySelector('.next').addEventListener('click', function () {
        nextpage(data)
    }, false);

    const cancel = document.querySelector('.cancel');
    cancel.addEventListener('click', removeresultList, true);
  
    moveDiv(resultList);
  
    let searchT = document.querySelector('.searchtext').innerText
    sessionStorage.LocalToGlobalVar = searchT;
}

function showResult() {
    const firstDiv = document.querySelector('div');
    resultList = document.createElement('div');
    firstDiv.append(resultList);
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
        console.log(languageOption.value);
        
        languageOption.addEventListener('change', function () {
            resultList.removeChild(resultList.children[1]);
            fetchRes()
        }, false);
        
        function fetchRes() {
            const searchText = selObj.toString() || sessionStorage.LocalToGlobalVar;
            const bibleVersionID = languageOption.value;
            fetch(`https://api.scripture.api.bible/v1/bibles/${bibleVersionID}/search?query=${searchText}&offset=${offset}`,
                {
                headers: {
                    "api-key": API_KEY
                },
                credentials: 'same-origin'
                }
            ).then(response=>response.json())
                .then(data => {
                    resultList.style.display = 'none';
                    resultList.style.display = 'block';
                    renderHTML(data.data, searchText);
            })
        }
        fetchRes();  
     })
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