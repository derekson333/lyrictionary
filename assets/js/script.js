

var lyricsIn = document.querySelector('#lyrics');
var artistIn = document.querySelector('#artist');
var trackIn = document.querySelector('#track');
var submitEl = document.querySelector('#submit');
var lyricsContent = document.querySelector('#content');
var historyContent = document.querySelector('#history')


var corsLink = 'https://tranquil-tundra-39612.herokuapp.com/'

var requestUrl = 'https://api.musixmatch.com/ws/1.1/track.search?'
var trackUrl = 'https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id='
var secondParam = '&page_size=5&apikey=46de1ff7cdb6bc5903ea0ab79193cea2';

var artistQuery = 'q_artist=';
var trackQuery = '&q_track=';
var lyricsQuery = '&q_lyrics=';


var apikey = 'apikey=46de1ff7cdb6bc5903ea0ab79193cea2';

var historyArray = []
var storageIndex = 1




submitEl.addEventListener('click', function () {



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

  fetch(completeUrl)
    .then(function (response) {

      return response.json();
    })
    .then(function (data) {

      var title = document.createElement('h2');
      title.innerHTML = (data.message.body.track_list[0].track.track_name);
      lyricsContent.appendChild(title);
      var trackId = (data.message.body.track_list[0].track.track_id);

      getLyrics(trackId);
      if (historyArray.length > 5) {
        historyArray.shift()
      }
      var currentTitle = title.innerText
      
      localStorage.setItem(currentTitle, completeUrl)
    historyArray.unshift(localStorage.getItem(currentTitle))
    console.log(localStorage.getItem(currentTitle))
    console.log(localStorage.key(storageIndex))
    var historyLink = document.createElement('a')
    historyLink.setAttribute('href',"localStorage.getItem(currentTitle)");
    historyLink.innerText = (localStorage.key(storageIndex))
    historyContent.appendChild(historyLink)
    storageIndex += 1
  

    });
    

});


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