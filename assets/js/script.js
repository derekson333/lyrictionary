var word
var wordDef
var displayDef
var currentWord


var lyricsIn = document.querySelector('#lyrics');
var artistIn = document.querySelector('#artist');
var trackIn = document.querySelector('#track');
var submitEl = document.querySelector('#submit');
var lyricsContent = document.querySelector('#content');
var historyContent = document.querySelector('#history')
var definitionLocation = document.querySelector('#definition')

var corsLink = 'https://tranquil-tundra-39612.herokuapp.com/'

var requestUrl = 'https://api.musixmatch.com/ws/1.1/track.search?'
var trackUrl = 'https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id='
var secondParam = '&page_size=5&apikey=46de1ff7cdb6bc5903ea0ab79193cea2';

var artistQuery = 'q_artist=';
var trackQuery = '&q_track=';
var lyricsQuery = '&q_lyrics=';

var apikey = 'apikey=46de1ff7cdb6bc5903ea0ab79193cea2';

var historyArray = []

const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': '70bb5898ebmsh299ec14bc66936ap173708jsna572c78a32aa',
    'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com'
  }
};


//  event listener for submit button for search

submitEl.addEventListener('click', function (event) {
  event.stopPropagation()
  lyricsContent.innerHTML = ''
  var currentArtist = artistIn.value;
  var currentTrack = trackIn.value;
  var currentLyrics = lyricsIn.value;

  currentArtist = currentArtist.replaceAll(" ", "+");
  currentTrack = currentTrack.replaceAll(" ", "+");
  currentLyrics = currentLyrics.replaceAll(" ", "+");
  if (currentArtist == '' && currentTrack == '' && currentLyrics == '') {
    return
  }
  if (currentArtist != '') {

    var currentRequest = requestUrl + artistQuery + currentArtist + trackQuery + currentTrack + lyricsQuery + currentLyrics
  } else {
    return
  }

  var completeUrl = corsLink + currentRequest + secondParam
  fetchMusic(completeUrl);
})
// executes fetch from Musixmatch API for Track
var fetchMusic = function (completeUrl) {
  lyricsContent.innerHTML = ''

  fetch(completeUrl)
    .then(function (response) {

      return response.json();
    })
    .then(function (data) {

      var title = document.createElement('h2');
      title.innerHTML = (data.message.body.track_list[0].track.track_name);
      lyricsContent.appendChild(title);
      var trackId = (data.message.body.track_list[0].track.track_id);

      historyShift(title.innerText, completeUrl, trackId)
    });


};
var historyShift = function (currentTitle, completeUrl, trackId) {


  if (historyArray.length > 8) {
    historyArray.shift()
    localStorage.shift()
  }
  var historyObject = {
    url: completeUrl,
    title: currentTitle
  }

  localStorage.setItem(currentTitle, JSON.stringify(historyObject))

  var storedObject = localStorage.getItem(currentTitle)
  historyArray.unshift(storedObject)
  var historyLink = document.createElement('a')

  historyLink.setAttribute('href', "#/");
  historyLink.innerText = (JSON.parse(historyArray[0]).title)
  currentLink = (JSON.parse(historyArray[0]).url)
  historyLink.setAttribute('data-url', currentLink);
  historyLink.onclick = function () {
    fetchMusic(historyLink.dataset.url)
  };
  historyContent.appendChild(historyLink)
  getLyrics(trackId);
}

var loadHistory = function () {
  if (localStorage.length >= 1) {
    for (var i = 0; i < localStorage.length; i++) {
      currentHistory = localStorage.getItem((localStorage.key(i)));
      var historyLink = document.createElement('a')
      historyLink.setAttribute('href', "#/");

      historyLink.innerText = (JSON.parse(currentHistory).title)
      currentLink = (JSON.parse(currentHistory).url)
      historyLink.setAttribute('data-url', currentLink);

    };

    historyContent.appendChild(historyLink)
    historyLink.onclick = function () {
      fetchMusic(historyLink.dataset.url)
    }
  }
}
loadHistory()

// executes fetch from Musixmatch API for song lyrics
var getLyrics = function (id) {
  fetch(corsLink + trackUrl + id + '&' + apikey)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {

      var lyricsString = (data.message.body.lyrics.lyrics_body);
      removed = lyricsString.slice(0, lyricsString.indexOf('...'));


      var stringLyrics = removed.toString();

      var noLineBreaks = stringLyrics.replace(/[\r\n]/gm, ' ');
      var lyricsArr = noLineBreaks.split(" ");


      lyricsArr.forEach(function (item) {
        var lyric = document.createElement('a');
        lyric.href = "#/";
        lyric.innerText = item + " ";
        lyricsContent.appendChild(lyric);
        lyric.onclick = function () {
          var currentWord = lyric.innerText
          var trimWord = currentWord.trim()
          var completeWord = trimWord.replace(/[^A-Z0-9]/ig, "");

          (getDefinition(completeWord))


        };

      });
    })
}

// executes fetch from Words API for definition
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
  }
  if (wordDef.definitions.length > 2) {
    var definitionArray = wordDef.definitions
    for (let i = 0; i <= 3; i++) {
      var currentDef = document.createElement('p')
      currentDef.setAttribute('class', 'blue-text')
      var defContent = definitionArray[i].definition.charAt(0).toUpperCase() + definitionArray[i].definition.slice(1)
      currentDef.innerHTML = i + 1 + '. ' + defContent
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