var map = L.map("map").setView([45.529441, -482.618408], 13);
L.tileLayer(
  "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
  {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: "mapbox/streets-v11",
    tileSize: 512,
    zoomOffset: -1,
    accessToken:
      "pk.eyJ1Ijoid2lja2VkYWxjaGVtaXN0IiwiYSI6ImNrem9qa21nbDAxbXIycG9hZmlqMzNwNG8ifQ.2PMnoC3eXQrQPfnUYE9pTw",
  }
).addTo(map);
// L.marker([51.5, -0.09]).addTo(map)
//     .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
//     .openPopup();

var geojsonFeature = {
  type: "Feature",
  properties: {
    name: "Coors Field",
    amenity: "Baseball Stadium",
    popupContent: "This is where the Rockies play!",
  },
  geometry: {
    type: "Point",
    coordinates: [44.134913, -480.60791],
  },
    };
// L.geoJSON(geojsonFeature).addTo(map);

var popup = L.popup();
var tempArr = [];
var soldier = false;
var armor = false;


var armorButton = document.getElementById("armorButton");
armorButton.addEventListener('click', function(){
    armor = true;
    soldier = false;
    console.log("armor pressed")
});

var armorButton = document.getElementById("soldierButton");
armorButton.addEventListener('click', function(){
    armor = false;
    soldier = true;
    console.log("armor pressed")
});

    function onMapClick(e) {
        
            if(soldier){
            popup
            .setLatLng(e.latlng)
            .setContent("Enemy Soldier at  " + e.latlng.toString())
            .openOn(map);

        
            
            

            var circle = L.circle(e.latlng, {
                color: 'red',
                fillColor: '#f03',
                fillOpacity: 0.5,
                radius: 20
            }).addTo(map);
        }
            if(armor){
            var polygon = L.polygon([
                [e.latlng.lat, e.latlng.lng],
                [e.latlng.lat, e.latlng.lng + 0.005],
                [e.latlng.lat + .0025, e.latlng.lng + 0.0025]
            ],
            {
                color: 'red'
            }).addTo(map);
            popup
            .setLatLng(e.latlng)
            .setContent("Enemy Armor at  " + e.latlng.toString())
            .openOn(map);
        }

            // var myLines = [{
            //     "type": "LineString",
            //     "coordinates": [[45.529441, -482.618408], [45.6, -483], [45.7, -484]]
            // }];
            // L.geoJSON(myLines).addTo(map);
            // var selector = document.getElementById("selector")
            // var position = document.createElement('position')
            // var tempArr2 = [];
            // tempArr2.push(tempArr.lat)
            // tempArr2.push(" ")
            // // tempArr2.push(tempArr[1])
            // position.innerHTML = (tempArr[0])
            // selector.appendChild(position);


            // console.log(tempArr[0]);
            // tempArr = [];
            // L.geoJSON(geojsonFeature, {
            //       type: "Feature",
            //       properties: {
            //         name: "Coors Field",
            //         amenity: "Baseball Stadium",
            //         popupContent: "This is where the Rockies play!",
            //       },
            //       geometry: {
            //         type: "Point",
            //         coordinates: [44.134913, -480.60791],
            //       },
            //         }).addTo(map);
            console.log(e.latlng.toString())

    }
    
    map.on('click', onMapClick);

    