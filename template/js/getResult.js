
const bibleVersionID = getParameterByName(`version`) || `06125adad2d5898a-01`;

const btn = document.querySelector('.btn');
const resultDiv = document.createElement('div');
const resultList = document.querySelector('.display-passage');
let selObj = document.getSelection();



function renderResult(e) {
  e.preventDefault();
    let searchText = selObj.toString();
    console.log(searchText);
    getResults(searchText, offset=0).then((data) => {
      resultHTML = ``;
      if (data.passages) {
        if (!data.passages[0]) {
          resultHTML = `<div class="data-not-found">☹️ No results. Try <a href="index.html">changing versions?</a></div>`;
        }
        else {
          
          resultHTML += `<div style="width: 400px; padding: 10px; position:absolute; display:block; background-color:#fff; border: 1px solid #F0F8FF;">`;
          for (const passage of data.passages) {
            console.log(passage.content);
            
            resultHTML += ` <div>
                  <div style="width:100%; background-color:#7CB9E8; color:#fff;">${searchText}</div>
                  <div style="width:100%; height:100%;">
                    <h5 style="font-size: 30px; font-weight:700; padding: 0; margin: 0;">${passage.reference}</h5>
                    <div>${passage.content}</div>
                    <div class="cancel" style="cursor:pointer; display:flex; align-items:center; justify-content:center; text-justify:center; width:15px; height:15px; position:absolute; top:0; right:0; color:#fff; background-color: red; border-radius:50%; font-size:8px;">✖</div>
                  </div>
                </div>
              `;
            resultHTML += `</div>`;
          }
        }
      }
      if (data.verses) {
        if (!data.verses[0]) {
          resultHTML = `<div class="data-not-found">☹️ No results. Try <a href="index.html">changing versions?</a></div>`;
        }
        else {
          
          resultHTML += `<div style="width: 400px; height:400px; overflow-y: scroll; padding: 0 10px; position:absolute; display:block; background-color:#fff; border: 1px solid #F0F8FF;">`;
          resultHTML += `<div class="resulthead" style="position: fixed; background-color:#fff; margin-top: 0;">
                            <div style="width: 380px; margin-top:20px; background-color:#7CB9E8; color:#fff;">${searchText}</div>
                            <div class="cancel" style="cursor:pointer; display:flex; align-items:center; justify-content:center; text-justify:center; width:15px; height:15px; position:absolute; top:0; right:0; color:#fff; background-color: red; border-radius:50%; font-size:8px;">✖</div>
                        </div>`;
          resultHTML += `<div style="margin-top: 50px;">`;
          for (const verse of data.verses) {
            // console.log(verse);
            resultHTML += `<div style="padding: 0 5px;">
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
      moveDiv(resultList);
      
      const cancel = document.querySelector('.cancel');
      cancel.addEventListener('click', removeresultList);
      // cancel.removeEventListener('click', removeresultList);
    })
}
function removeresultList() {
  resultList.remove();
}
btn.addEventListener('click', renderResult, true);



function getResults(searchText, offset = 0) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.withCredentials = false;
      xhr.addEventListener(`readystatechange`, function () {
        if (this.readyState === this.DONE) {
          const { data, meta } = JSON.parse(this.responseText);
          _BAPI.t(meta.fumsId);
          resolve(data);
        }
      });
      xhr.open(
        `GET`,
        `https://api.scripture.api.bible/v1/bibles/${bibleVersionID}/search?query=${searchText}&offset=${offset}`
      );
      xhr.setRequestHeader(`api-key`, API_KEY);
      xhr.onerror = () => reject(xhr.statusText);
      xhr.send();
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
  var mousePosition;
  var offset = [0,0];
  // var div;
  var isDown = false;
  // div.style.resize = "both";
  // div.style.overflow = "auto";
  div.style.position = "fixed";
  // div.style.left = "0px";
  // div.style.top = "0px";
  // div.style.overflow = "auto";
  div.addEventListener('mousedown', function (e) {
    
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
      
              x : event.clientX,
              y : event.clientY
      
          };
          div.style.left = (mousePosition.x + offset[0]) + 'px';
          div.style.top  = (mousePosition.y + offset[1]) + 'px';
      }
  }, true);
}

