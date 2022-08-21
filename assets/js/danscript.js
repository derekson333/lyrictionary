var word
// var wordDef
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
    .then(response => defString(response))
  // .then(console.log(wordDef))
  // .catch(err => console.error(err));
  // currentWord = wordDef["word"] + ": ";
  // displayDef = wordDef.definitions[0].definition
  // var fullDefinition = (currentWord + displayDef)
  // addDefinition(fullDefinition)
}
// manipulates JSON into string to display
function defString(wordDef) {
  definitionLocation.innerHTML = ''

  if (wordDef.definitions.length >= 1) {
    currentWord = wordDef["word"] + ": ";
    currentWord = currentWord.charAt(0).toUpperCase() + currentWord.slice(1);
    var word = document.createElement('h3')
    var definition = document.createElement('p')
    word.innerHTML = currentWord
    definitionLocation.appendChild(word)
    console.log(wordDef.definitions.length)
  }
  if (wordDef.definitions.length > 2) {

    var definition1 = document.createElement('p')
    var definition2 = document.createElement('p')
    var definition3 = document.createElement('p')
    var def1Content = wordDef.definitions[0].definition.charAt(0).toUpperCase() + wordDef.definitions[0].definition.slice(1);
    var def2Content = wordDef.definitions[1].definition.charAt(0).toUpperCase() + wordDef.definitions[1].definition.slice(1);
    var def3Content = wordDef.definitions[2].definition.charAt(0).toUpperCase() + wordDef.definitions[2].definition.slice(1);
    definition1.innerHTML = '1. ' + def1Content
    definition2.innerHTML = '2. ' + def2Content
    definition3.innerHTML = '3. ' + def3Content

    definitionLocation.appendChild(definition1)
    definitionLocation.appendChild(definition2)
    definitionLocation.appendChild(definition3)
  } else if (wordDef.definitions.length == 0) {
    return
  } else if (wordDef.definitions.length <= 2) {

    displayDef = wordDef.definitions[0].definition
    displayDef = displayDef.charAt(0).toUpperCase() + displayDef.slice(1)
    definition.innerHTML = displayDef
    definitionLocation.appendChild(definition)
  }



  // var definition = document.createElement('p')
  // displayDef = wordDef.definitions[0].definition
  // var fullDefinition = (currentWord + displayDef)
  // // addDefinition(fullDefinition)

}


// function addDefinition(fullDefinition) {
//   definitionLocation.innerHTML = fullDefinition
// }