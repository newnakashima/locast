import css from './app.scss';
import $ from 'jquery';

window.$ = $;


var geolocation = navigator.geolocation;
if (!geolocation) {
  alert("この端末では位置情報を取得することができません。");
} 

var map;
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

  var content = `
    <div class="field" id="cast-input">
      <p class="control">
        <textarea class="textarea" name="feeling" id="feeling" placeholder="Type your feeling"></textarea>
      </p>
    </div>
    <div class="field">
      <p class="control">
        <button class="button is-primary" type="button" name="cast-feeling" id="cast-feeling">cast</button>
      </p>
    </div>
    <div class="content" id="cast-output">
      <p id="cast-output-p"></p>
    </div>
  `;

  var infowindow = new google.maps.InfoWindow({
    content: content
  });

  marker.addListener('click', () => {
    $('#cast-feeling').off('click', inputText);
    infowindow.open(map, marker);
    $('#cast-feeling').on('click', inputText);
  });

  var inputText = function(event) {
    $('#cast-output-p').html($('#feeling').val().split('\n').join('<br>'));
    $('#feeling').val('');
  };

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
    alert("位置情報の取得に失敗しました。");
    location = {lat: 41.850, lng: -87.650};
    initMap(location);
  }, {timeout:3000});
}

window.detectBrowser = detectBrowser;

console.log("test");
