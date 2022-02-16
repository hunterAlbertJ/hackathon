
//why is the long broken...?
//this is portland but the actual coordinates are 45.5152° N, 122.6784° W
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


var popup = L.popup();
var tempArr = [];
var soldier = false;
var armor = false;
var friendly = false;
var hostile = false;
var selectedTeam = document.getElementById('currentlySelected');
var currentEntity = '';
var entityStatus  = '';

var armorButton = document.getElementById("armorButton");
armorButton.addEventListener('click', function(){
    currentEntity = ''
    armor = true;
    soldier = false;
    currentEntity = 'Armor';
    selectedTeam.innerText = "Currently Selected: " + entityStatus + currentEntity;

    console.log("armor pressed")
});

var armorButton = document.getElementById("soldierButton");
armorButton.addEventListener('click', function(){
    currentEntity = '';
    armor = false;
    soldier = true;
    console.log("soldier selected")
    currentEntity = 'Soldier';
    selectedTeam.innerText = "Currently Selected: " + entityStatus + currentEntity;

});


var armorButton = document.getElementById("friendly");
armorButton.addEventListener('click', function(){
    entityStatus  = '';
    hostile = false;
    friendly = true;
    console.log("friendly selected")
    entityStatus = "Friendly "
    selectedTeam.innerText = "Currently Selected: " + entityStatus + currentEntity;
    
});


var armorButton = document.getElementById("hostile");
armorButton.addEventListener('click', function(){
    entityStatus  = '';
    hostile = true;
    friendly = false;
    entityStatus = "Hostile "
    console.log("hostile selected")
    selectedTeam.innerText = "Currently Selected: " + entityStatus + currentEntity;
});

    function onMapClick(e) {
        
            if(soldier && hostile){
            popup
            .setLatLng(e.latlng)
            .setContent("Enemy Soldier at  " + e.latlng.toString())
            .openOn(map);

        
            
            

            var circle = L.circle(e.latlng, {
                color: 'red',
                fillColor: '#f03',
                fillOpacity: 0.5,
                radius: 10
            }).addTo(map);
        }
        if(soldier && friendly){
            popup
            .setLatLng(e.latlng)
            .setContent("Friendly Soldier at  " + e.latlng.toString())
            .openOn(map);

        
            
            

            var circle = L.circle(e.latlng, {
                color: 'blue',
                fillColor: 'lightblue',
                fillOpacity: 0.5,
                radius: 10
            }).addTo(map);
        }
            if(armor && hostile){
            var polygon = L.polygon([
                [e.latlng.lat, e.latlng.lng],
                [e.latlng.lat, e.latlng.lng + 0.0005],
                [e.latlng.lat + .00025, e.latlng.lng + 0.00025]
            ],
            {
                color: 'red'
            }).addTo(map);
            popup
            .setLatLng(e.latlng)
            .setContent("Enemy Armor at  " + e.latlng.toString())
            .openOn(map);
        }

        if(armor && friendly){
            var polygon = L.polygon([
                [e.latlng.lat, e.latlng.lng],
                [e.latlng.lat, e.latlng.lng + 0.0005],
                [e.latlng.lat + .00025, e.latlng.lng + 0.00025]
            ],
            {
                color: 'blue'
            }).addTo(map);
            popup
            .setLatLng(e.latlng)
            .setContent("Friendly Armor at  " + e.latlng.toString())
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

    