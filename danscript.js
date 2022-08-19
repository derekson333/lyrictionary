var word
var wordDef
var displayDef

const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '70bb5898ebmsh299ec14bc66936ap173708jsna572c78a32aa',
      'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com'
    }
  };
    
function getDefinition(word) {
    fetch('https://wordsapiv1.p.rapidapi.com/words/'+word+'/definitions', options)
    .then(response => response.json())
    .then(response => wordDef = response)
    .then(response => console.log(wordDef))
    .catch(err => console.error(err));
}
// manipulates JSON into string to display
function defString() {
    displayDef = wordDef["definitions"][0]
    displayDef = wordDef["word"]+": "+displayDef["definition"]
} 


getDefinition("potato")
     
// function addDefinition() {
//     var defPara = wordDef["definitions"][0]
//     defPara = document.createElement('p');
    
//     content.append(defPara);
// }


