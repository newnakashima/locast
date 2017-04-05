import css from './app.scss';
import $ from 'jquery';
import io from 'socket.io-client';

window.$ = $;

// var socket = io.connect(location.protocol + "//" + location.host);
var socket = io();

var geolocation = navigator.geolocation;
if (!geolocation) {
  alert("この端末では位置情報を取得することができません。");
} 

var map;
const ID = (function() {
    let start = 48, end = 126;
    var res = "";
    for (var i=0,len=16;i<len;i++) {
        res += String.fromCharCode(Math.floor(Math.random()*(end - start + 1) + start));
    }
    return res;
})();
console.log(ID);
function initMap(location) {
  map = new google.maps.Map(document.getElementById('map'), {
    center: location,
    zoom: 16,
    zoomControl: true,
    mapTypeControl: false,
    scaleControl: true,
    streetViewControl: false,
    rotateControl: false
  });

  var marker = new google.maps.Marker({
    position: location,
    map: map,
    title: 'Hello World!',
    icon: 'images/test.png',
    draggable: true
  });
  socket.emit('initMarker', {
    ID: ID,
    location: location
  });
  console.log("initMarker");

  var content = `
    <div class="field" id="cast-input">
      <p class="control">
        <textarea class="textarea" name="feeling" id="feeling" placeholder="Type your feeling"></textarea>
      </p>
    </div>
    <div class="field">
      <p class="control">
        <button class="button is-primary" type="button" name="cast-feeling" id="cast-feeling">cast</button>
    <a href="https://twitter.com/share" class="twitter-share-button" data-via="newnakashima" data-hashtags="test">Tweet</a>
    <script src="out/dist/twitter.bundle.js"></script>
      </p>
    </div>
    <div class="content is-medium" id="cast-output">
      <p id="cast-output-p"></p>
    </div>
  `;

  var infowindow = new google.maps.InfoWindow({
    content: content
  });

  marker.addListener('click', () => {
    $('#cast-feeling').off('click', inputText);
    $('#feeling').off('keydown', hitEnter);
    infowindow.open(map, marker);
    $('#cast-feeling').on('click', inputText);
    $('#feeling').on('keydown', hitEnter);
    socket.emit('clickMarker', {});
  });

  var inputText = function(event) {
    var feeling = $('#feeling').val().replace(/</g, "&lt;").replace(/>/g, "&gt;");
    $('#cast-output-p').html(feeling.split('\n').join('<br>'));
    $('#feeling').val('');
  };
  var hitEnter = function(event) {
    if (((event.ctrlKey && !event.metaKey) || (!event.ctrlKey && event.metaKey)) && event.keyCode === 13)
      $('#cast-feeling').click();
  }

  // Create a div to hold the control.
  var controlDiv = document.createElement('div');

  // Set CSS for the control border
  var controlUI = document.createElement('div');
  controlUI.style.backgroundColor = '#fff';
  controlUI.style.border = '2px solid #fff';
  controlUI.style.cursor = 'pointer';
  controlUI.style.marginBottom = '22px';
  controlUI.style.textAlign = 'center';
  controlUI.title = 'Click to recenter the map';
  controlDiv.appendChild(controlUI);

  // Set CSS for the control interior
  var controlText = document.createElement('div');
  controlText.style.color = 'rgb(25,25,25)';
  controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
  controlText.style.fontSize = '16px';
  controlText.style.lineHeight = '38px';
  controlText.style.paddingLeft = '5px';
  controlText.style.paddingRight = '5px';
  controlText.innerHTML = 'Center Map';
  controlUI.appendChild(controlText);

  google.maps.event.addDomListener(controlDiv, 'click', () => {
    map.setCenter(marker.getPosition());
  });

  map.controls[google.maps.ControlPosition.TOP_RIGHT].push(controlDiv);

  var watchId = navigator.geolocation.watchPosition(p => {
    let location = {lat: p.coords.latitude, lng: p.coords.longitude};
    marker.setPosition(location);
    console.log(ID);
    socket.emit("updatePosition", {
        id      : ID,
        location: location
    });
  }, () => {

  }, {timeout:3000});

}

function detectBrowser() {
  var useragent = navigator.userAgent;
  var mapdiv = document.getElementById('map');

  if (useragent.indexOf('iPhone') != -1 || useragent.indexOf('Android') != -1) {
    // when opened with smartphones
  } else {
    // pc or something else
  }
  mapdiv.style.width = '100%';
  mapdiv.style.height = '100%';

  var location = {};
  geolocation.getCurrentPosition(p => {
    location = {lat: p.coords.latitude, lng: p.coords.longitude};
    console.log('success');
    initMap(location);
  }, () => {
    console.warn("位置情報の取得に失敗しました。");
    location = {lat: 41.850, lng: -87.650};
    initMap(location);
  }, {timeout:3000});
}

socket.on('initMarker', data => {
    console.log('initMarker', data);
});

socket.on('updatePosition', data => {
    console.log('updatePosition', data);
});

socket.on('clickMarker', data => {
    console.log('clickMarker!');
})

socket.on('test', data => {
    console.log(data);
});

window.detectBrowser = detectBrowser;
