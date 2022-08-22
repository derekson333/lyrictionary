

var word
// var wordDef
var displayDef
var currentWord

var definitionLocation = document.querySelector('#definition')

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
    .then(response => defString(response))
 
}
// manipulates JSON into string to display
function defString(wordDef) {
  definitionLocation.innerHTML = ''

  if (wordDef.definitions.length >= 1) {
    currentWord = wordDef["word"] + ": "
    capsWord = currentWord.charAt(0).toUpperCase() + currentWord.slice(1)
    var word = document.createElement('h3')
    var definition = document.createElement('p')
    definition.setAttribute('class', 'blue-text')
    word.innerHTML = capsWord
    definitionLocation.appendChild(word)
    console.log(wordDef.definitions.length)
  }
  if (wordDef.definitions.length > 2) {
    var definitionArray = wordDef.definitions
      for (let i = 0; i <= 3; i++){
        console.log(i)
        var currentDef = document.createElement('p')
        currentDef.setAttribute('class', 'blue-text')
        var defContent = definitionArray[i].definition.charAt(0).toUpperCase() + definitionArray[i].definition.slice(1)
        currentDef.innerHTML =  i + 1 + '. ' + defContent
        definitionLocation.appendChild(currentDef)
      }

  } else if (wordDef.definitions.length == 0) {
    return
  } else if (wordDef.definitions.length <= 2) {

    displayDef = wordDef.definitions[0].definition
    displayDef = displayDef.charAt(0).toUpperCase() + displayDef.slice(1)
    definition.innerHTML = displayDef
    definitionLocation.appendChild(definition)
  }


}