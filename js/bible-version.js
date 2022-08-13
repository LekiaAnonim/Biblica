API_KEY = `e1d3a7bcbb9af8b1232dea1bdf4d9dcb`;

function getLanguages() {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.withCredentials = false;
        xhr.addEventListener(`readystatechange`, function() {
            if (this.readyState === this.DONE) {
                const { data } = JSON.parse(this.responseText);

                const language = data.map((data) => {
                    return (data.language.name)
                })
                resolve(language)
            }
        });
        xhr.open(`GET`, `https://api.scripture.api.bible/v1/bibles`);
        xhr.setRequestHeader(`api-key`, API_KEY);
        xhr.onerror = () => reject(xhr.statusText);
        xhr.send();
    });
}

function getBibleVersions() {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.withCredentials = false;
        xhr.addEventListener(`readystatechange`, function() {
            if (this.readyState === this.DONE) {
                const { data } = JSON.parse(this.responseText);
                const versions = data.map((data) => {
                    return {
                        name: data.name,
                        id: data.id,
                        abbreviation: data.abbreviation,
                        description: data.description,
                        language: data.language.name,
                    };
                });
                resolve(versions);
            }
        });
        xhr.open(`GET`, `https://api.scripture.api.bible/v1/bibles`);
        xhr.setRequestHeader(`api-key`, API_KEY);
        xhr.onerror = () => reject(xhr.statusText);
        xhr.send();
    });
}

// function getBibleVersions() {
//     fetch(`https://api.scripture.api.bible/v1/bibles`,
//         {
//             headers: {
//                 "api-key": API_KEY
//             },
//             credentials: 'same-origin'
//         }
//     ).then(response => response.json())
//         .then(data => {
//             console.log(data.data);
//             let dat = data.data;
//             (dat).map(data => {
//                 // if (data.language.name == language) {
//                 return {
//                     name: data.name,
//                     id: data.id,
//                     abbreviation: data.abbreviation,
//                     description: data.description,
//                     language: data.language.name,
//                 };
//             })
//         }
//     )    
// }


function sortVersionsByLanguage(bibleVersionList) {
    let sortedVersions = {};
    for (const version of bibleVersionList) {
        if (!sortedVersions[version.language]) {
            sortedVersions[version.language] = [];
        }
        sortedVersions[version.language].push(version);
    }
    for (const version in sortedVersions) {
        sortedVersions[version].sort((a, b) => {
            const nameA = a.abbreviation.toUpperCase();
            const nameB = b.abbreviation.toUpperCase();
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }
            return 0;
        });
    }
    return sortedVersions;
}