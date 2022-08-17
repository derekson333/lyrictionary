const word = "test"
const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '70bb5898ebmsh299ec14bc66936ap173708jsna572c78a32aa',
      'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com'
    }
  };
    
fetch('https://wordsapiv1.p.rapidapi.com/words/'+word+'/definitions', options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));