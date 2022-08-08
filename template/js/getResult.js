// const bibleVersionID = document.querySelector('#languages').value || `06125adad2d5898a-01`;

const btn = document.querySelector('.btn');
const resultDiv = document.createElement('div');
const resultList = document.querySelector('.display-passage');
let selObj = document.getSelection();
let offset = 0;



document.body.addEventListener('mouseup', function () {
  const searchText = selObj.toString() || sessionStorage.LocalToGlobalVar;
  console.log(searchText);
  const bibleVersionID =  `bba9f40183526463-01` || sessionStorage.LocalToGlobalVID;
  getResults(searchText, offset, bibleVersionID);
});


function nextpage(data) {
    offset += 1;
    renderResult(data);
}

function previouspage(data) {
    if (offset >= 0) {
        offset -= 1;
        renderResult(data);
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

function renderResult(data) {
  // try {
      getBibleVersions().then((versions) => {

          // e.preventDefault();
          try {

              versionss = versions.slice(1);
          } catch (err) {
              location.reload(false);
              console.log(err.message);
          }
      });
      resultList.style.display = 'block';
        // getResults(searchText, offset, bibleVersionID).then((data) => {

      resultHTML = ``;
      if (data.passages) {
          if (!data.passages[0]) {
              resultHTML = `<div class="data-not-found">☹️ No results. Try <a href="index.html">changing versions?</a></div>`;
          } else {


              resultHTML += `<div style="width: 400px; max-height:400px; overflow-y: scroll; padding: 0 10px; position:absolute; display:block; background-color:#fff; border: 1px solid #c8d9e7;">`;
              resultHTML += `<div class="resulthead" style="position: fixed; background-color:#fff; margin-top: 0; padding-top:5px;">`
              resultHTML += `<div style="padding:10px;">`
              resultHTML += `<select id="languages" style="border:none; width:300px; font-size:x-small; position:absolute;">`;
              resultHTML += `<option value='06125adad2d5898a-01'>King James (Authorized) Version</option>`;

              try {
                  for (const version of versionss) {

                      resultHTML += `<option value=${version.id}>${version.name}</option>`;

                  }
              } catch (err) {
                  console.log(err.message)
              }

              resultHTML += `</select>`;
              resultHTML += `</div>`;
              resultHTML += `<div>
                                  <div class="searchtext" style="width: 380px; margin-top:20px; padding-left:5px; background-color:#7CB9E8; color:#fff;">${searchText}</div>
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
                  // console.log(passage.content);

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

              resultHTML = `<div class="data-not-found">☹️ No results. Try <a href="index.html">changing versions?</a></div>`;
          } else {
              resultHTML += `<div style="width: 400px; max-height:400px; overflow-y: scroll; padding: 0 10px; position:absolute; display:block; background-color:#fff; border: 1px solid #c8d9e7;">`;
              resultHTML += `<div class="resulthead" style="position: fixed; background-color:#fff; margin-top: 0; padding-top:5px;">`
              resultHTML += `<div style="padding:10px;">`
              resultHTML += `<select id="languages" style="border:none; width:300px; font-size:x-small; position:absolute;">`;
              resultHTML += `<option value='06125adad2d5898a-01'>King James (Autorized) Version</option>`;

              try {
                  for (const version of versionss) {

                      resultHTML += `<option value=${version.id}>${version.name}</option>`;

                  }
              } catch (err) {
                  console.log(err.message)
              }

              resultHTML += `</select>`;
              resultHTML += `</div>`;
              resultHTML += `<div>
                        <div class="searchtext" style="width: 380px; margin-top:20px; padding-left:5px; background-color:#7CB9E8; color:#fff;">${searchText}</div>
                        <div title="Close" class="cancel" style="cursor:pointer; display:flex; align-items:center; justify-content:center; text-justify:center; width:15px; height:15px; position:absolute; top:0; right:0; color:#fff; border-radius:50%; font-size:8px;">✖</div>
                        <div style="display:flex; align-items:center; justify-content: space-between;">
                          <div class="navigatepage" style="display: flex;">
                            <button class="previous pagenav" style="border:none; background-color:none; font-size:x-small;"><< Previous</button>
                            <p style="background-color:rgb(147, 201, 252);font-size:x-small;">${offset+1} of ${data.total}</p>
                            <button class="next pagenav" style="border:none; background-color:none;font-size:x-small;">Next >></button>
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
                  // console.log(verse);
                  resultHTML += `<div class="resultbody" style="padding: 0 5px;">
                        <h5 style="padding: 0; margin:0;">${verse.reference}</h5>
                        <p style="font-size: small; padding: 0; margin: 0;">${verse.text}</p>
                      </div>
                      `;
              }
              resultHTML += `</div>`;
              resultHTML += `</div>`;

          }


      }

      resultList.innerHTML = resultHTML;
      // document.querySelector('.previous').addEventListener('click', function () {
      //   previouspage(data)
      // }, false);
      // document.querySelector('.next').addEventListener('click', function () {
      //   nextpage(data)
      // }, false);
      // const cancel = document.querySelector('.cancel');
      // cancel.addEventListener('click', removeresultList, true);
      // moveDiv(resultList);
      // let searchT = document.querySelector('.searchtext').innerText
      // sessionStorage.LocalToGlobalVar = searchT;
      // languageOption = document.querySelector('#languages');
      // VersionLanguage = languageOption.value;
      // sessionStorage.LocalToGlobalVID = VersionLanguage;
        // })
    // }
    // catch (err) {
    //     console.log(err.message);
    // }


}

function removeresultList() {
    resultList.style.display = 'none';
}


function getResults(searchText, offset, bibleVersionID) {
    //     return new Promise((resolve, reject) => {
    //         const xhr = new XMLHttpRequest();
    //         xhr.withCredentials = false;
    //         xhr.addEventListener(`readystatechange`, function() {
    //             if (this.readyState === this.DONE) {
    //                 const { data, meta } = JSON.parse(this.responseText);
    //                 // _BAPI.t(meta.fumsId);
    //                 resolve(data);
    //             }
    //         });
    //         xhr.open(
    //             `GET`,
    //             `https://api.scripture.api.bible/v1/bibles/${bibleVersionID}/search?query=${searchText}&offset=${offset}`
    //         );
    //         xhr.setRequestHeader(`api-key`, API_KEY);
    //         xhr.onerror = () => reject(xhr.statusText);
    //         xhr.send();
    //     });
      // 
  fetch(`https://api.scripture.api.bible/v1/bibles/${bibleVersionID}/search?query=${searchText}&offset=${offset}`,
    {
      headers: {
        "api-key": API_KEY
      },
      credentials: 'same-origin'
      // mode: 'no-cors'
      // ,
      // body:JSON.stringify(callData)
    }
  ).then(response => response.json())
  // .then(data => console.log(data));
  .then(data => renderResult(data))

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
        // var div;
        var isDown = false;
        // div.style.resize = "both";
        // div.style.overflow = "auto";
        x = div.x - this.offsetLeft;
        y = div.y - this.offsetTop;
        y += 10;
        div.style.position = "absolute";
        div.style.left = `${x}px`;
        div.style.top = `${y}px`;

        // div.style.overflow = "auto";
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
            // event.preventDefault();
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