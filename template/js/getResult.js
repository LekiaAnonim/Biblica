
const bibleVersionID = getParameterByName(`version`) || `06125adad2d5898a-01`;

const btn = document.querySelector('.btn');
const resultList = document.querySelector('.display-passage');

let selObj = document.getSelection();

btn.addEventListener('click', function() {
    let searchText = selObj.toString();
    console.log(searchText);
    getResults(searchText, offset=0).then((data) => {
      resultHTML = ``;
      if (data.passages) {
        if (!data.passages[0]) {
          resultHTML = `<div class="data-not-found">☹️ No results. Try <a href="index.html">changing versions?</a></div>`;
        }
        else {
          
          resultHTML += `<ul>`;
          for (const passage of data.passages) {
            resultHTML += `<li>
              <h5>${passage.reference}</h5>
              <div>${passage.content}</div>
            </li>`;
            resultHTML += `</ul>`;
          }
        }
      }
      if (data.verses) {
        if (!data.verses[0]) {
          resultHTML = `<div class="data-not-found">☹️ No results. Try <a href="index.html">changing versions?</a></div>`;
        }
        else {
          
          resultHTML += `<ul>`;
          for (const verse of data.verses) {
            resultHTML += `<li>
              <h5>${verse.reference}</h5>
              <div>${verse.text}</div>
            </li>`;
            resultHTML += `</ul>`;
          }
        }
      }
      resultList.innerHTML = resultHTML;
    })
})



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