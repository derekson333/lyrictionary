// Api Key 46de1ff7cdb6bc5903ea0ab79193cea2

// https://api.musixmatch.com/ws/1.1/

var lyricsIn = document.querySelector('#lyrics');
var artistIn = document.querySelector('#artist');
var trackIn = document.querySelector('#track');
var sendit = document.querySelector('#SEND');
var content = document.querySelector('#content');

var corsLoop = 'https://tranquil-tundra-39612.herokuapp.com/'

var requestUrl = 'https://api.musixmatch.com/ws/1.1/track.search?'
var trackUrl = 'https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id='
var secondParam = '&page_size=5&apikey=46de1ff7cdb6bc5903ea0ab79193cea2';
// track.search?q_lyrics
var artistQuery = '&q_artist=';
var trackQuery = '&q_track=';
var lyricsQuery = 'q_lyrics=';


var apikey = 'apikey=46de1ff7cdb6bc5903ea0ab79193cea2';
var getTrack = function () {

  var currentArtist = artistIn.value;
  var currentTrack = trackIn.value;
  var currentLyrics = lyricsIn.value;
  currentArtist = currentArtist.replaceAll(" ", "+");
  currentTrack = currentTrack.replaceAll(" ", "+");
  currentLyrics = currentLyrics.replaceAll(" ", "+");
  if (currentArtist == '' && currentTrack == '' && currentLyrics == '') {
    return
  }
  if (currentLyrics != '') {
    requestUrl = requestUrl + lyricsQuery + currentLyrics;

  }
  if (currentArtist != '') {
    requestUrl = requestUrl + artistQuery + currentArtist;

  }
  if (currentTrack != '') {
    requestUrl = requestUrl + trackQuery + currentTrack;

  }
  console.log(requestUrl);
  var completeUrl = corsLoop + requestUrl + secondParam
  console.log(completeUrl);
  console.log(currentLyrics);
  fetch(completeUrl)
    .then(function (response) {

      return response.json();
    })
    .then(function (data) {
      console.log(data);
      console.log(data.message.body.track_list[0].track.track_name);
      var paragraph = document.createElement('p');
      paragraph.innerHTML = (data.message.body.track_list[0].track.track_name);
      var trackId = (data.message.body.track_list[0].track.track_id);
      content.append(paragraph);

      getLyrics(trackId);

    });
}

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
      var lyricsParagraph = document.createElement('p');
      lyricsParagraph.innerHTML = removed;
      content.append(lyricsParagraph);

      var stringLyrics = removed.toString();
      console.log(stringLyrics);
      var noBrakes = stringLyrics.replace(/[\r\n]/gm, ' ');
      var lyricArr = noBrakes.split(" ");
      console.log(lyricArr);

      lyricArr.forEach(function (item) {
        var a = document.createElement('a');
        a.href = "#";
        a.innerText = item + " ";
        document.body.appendChild(a);
      });
    })
}
sendit.addEventListener('click', getTrack);