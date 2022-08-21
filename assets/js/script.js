// Api Key 46de1ff7cdb6bc5903ea0ab79193cea2

// https://api.musixmatch.com/ws/1.1/

var lyricsIn = document.querySelector('#lyrics');
var artistIn = document.querySelector('#artist');
var trackIn = document.querySelector('#track');
var submitEl = document.querySelector('#submit');
var content = document.querySelector('#content');
var def = document.querySelector('#def')

var corsLoop = 'https://tranquil-tundra-39612.herokuapp.com/'

var requestUrl = 'https://api.musixmatch.com/ws/1.1/track.search?'
var trackUrl = 'https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id='
var secondParam = '&page_size=5&apikey=46de1ff7cdb6bc5903ea0ab79193cea2';

var artistQuery = 'q_artist=';
var trackQuery = '&q_track=';
var lyricsQuery = '&q_lyrics=';


var apikey = 'apikey=46de1ff7cdb6bc5903ea0ab79193cea2';




submitEl.addEventListener('click', function () {
  content.innerHTML = ''
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
  console.log(requestUrl);
  var completeUrl = corsLoop + currentRequest + secondParam
  console.log(completeUrl);
  console.log(currentLyrics);
  fetch(completeUrl)
    .then(function (response) {

      return response.json();
    })
    .then(function (data) {
      console.log(data);
      console.log(data.message.body.track_list[0].track.track_name);
      var title = document.createElement('h2');
      title.innerHTML = (data.message.body.track_list[0].track.track_name);
      content.appendChild(title);
      var trackId = (data.message.body.track_list[0].track.track_id);

      getLyrics(trackId);

    });
});


var getLyrics = function (id) {
  fetch(corsLoop + trackUrl + id + '&' + apikey)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      var lyricsString = (data.message.body.lyrics.lyrics_body);
      removed = lyricsString.slice(0, lyricsString.indexOf('...'));
      console.log(removed);

      var stringLyrics = removed.toString();
      console.log(stringLyrics);
      var noBreaks = stringLyrics.replace(/[\r\n]/gm, ' ');
      var lyricArr = noBreaks.split(" ");
      console.log(lyricArr);

      lyricArr.forEach(function (item) {
        var a = document.createElement('a');
        a.href = "#/";
        a.innerText = item + " ";
        content.appendChild(a);
        a.onclick = function () {
          var currentWord = a.innerText
          var trimWord = currentWord.trim()
          var completeWord = trimWord.replace(/[^A-Z0-9]/ig, "");

          (getDefinition(completeWord))


        };
        // Does a definition fetch when clicking on a word and stores the string definition to displayDef
      });
    })
}