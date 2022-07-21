
const bibleVersionID = getParameterByName(`version`) || `06125adad2d5898a-01`;

const btn = document.querySelector('.btn')

let selObj = document.getSelection();

btn.addEventListener('click', function() {
    let passage = selObj.toString();
    console.log(passage);
    getResults(passage);
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
          console.log(data);
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