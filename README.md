

# 📙BIBLICA

---

![Prroduct Logo](/images/128.png)

## 📓Description: 
Biblica is a multi-lingua, multi-version Bible browser extension.  Biblica uses the [scripture.api.bible](https://scripture.api.bible/), a public api that host nearly 2500 Bible versions available across over 1500 languages.

### How it works:
Select or highlight a search word(e.g. ***God***) or Bible reference(e.g ***John 3: 16 or Gen 1:1***) you want to look up in the Bible.

## 📗Structure:
The application consist of two JavaScript files in the js folder.
- bible-version.js
- getResult.js
The ***bible-version.js*** file contain the *getBibleVersion* and *getLanguage* method for returning the Bible Versions and languages, and a *sortVersionsByLanguage* method that takes as argument bibleVersionList.
The ***getResult.js*** file is the heart of the application where API calls are made, consume and rendered. Explanatory comment will be added to block of codes, and variables to describe what they are use for.

### Contribution:
To contribute to this project check the GitHub repository <github.com/LekiaAnonim/Biblica>.

## License
[MIT](https://choosealicense.com/licenses/mit/)
