var word
var wordDef
var displayDef
var currentWord

var definitionLocation = document.querySelector('#def')

const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': '70bb5898ebmsh299ec14bc66936ap173708jsna572c78a32aa',
    'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com'
  }
};

function getDefinition(word) {
  fetch('https://wordsapiv1.p.rapidapi.com/words/' + word + '/definitions', options)
    .then(response => response.json())
    .then(response => wordDef = response)
    .then(response => console.log(wordDef))
    .catch(err => console.error(err));
}
// manipulates JSON into string to display
function defString() {
  currentWord = wordDef["word"] + ": ";
  displayDef = wordDef.definitions[0].definition
  var fullDefinition = (currentWord + displayDef)
  addDefinition(fullDefinition)

}


function addDefinition(fullDefinition) {
  definitionLocation.innerHTML = fullDefinition
}