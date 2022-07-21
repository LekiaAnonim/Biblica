

📙#BIBLICA

📓##Description: 
Biblica is a bible browser extension. Users can get the quote of a bible passage by selecting the bible passage. Biblica comes in different languages and bible versions.



📗##Structure:
bible.api : This is a free Bible API service that serve as the source for the biblica application.
bibleObject: The bibleObject is a JavaScript library that makes API calls to bible.api. Users selects a bible passage (e.g. John 3:16) and the algorithm processes the selected text and sends it as a request to bible.api to get a response. The text is processed into 
book (e.g John)
chapter (e.g 3)
verse (e.g 16)
UI: The UI for the display of results will open a sub window in the browser. It will display the quoted bible passage, references, option for reading in other languages and versions.

📘##Biblica Website:
The website provides the description, user guide, and features of Biblica. And a call to action for first users to add the application as a browser extension.
________________________________

Bible Object/Class
________________________________
passageProcessor() // This method contains the algorithm for processing selected Bible passages.
—---------------------------------------------------
getLanguage(Default="user defined")
—---------------------------------------------------
getVersion(default="user defined")
—--------------------------------------------------
getBook()
—---------------------------------------------------
getChapter()
—---------------------------------------------------
getVerse()
________________________________

N/B: The Bible should implement the getLanguage and getVersion methods as an interface.
