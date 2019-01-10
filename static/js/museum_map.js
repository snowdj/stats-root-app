var mymap = L.map('map').setView([53, -4], 6);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoibWF4d2VsbDg4ODgiLCJhIjoiY2pqcHJpbnF6MDhzMDN3cDRubGJuMzBsayJ9.bA38eIQYmV3OMpwgeeb2Dg'
}).addTo(mymap);

// var marker = L.marker([map_data[0]['lat'],map_data[0]['lon']]).addTo(mymap);

for (var i = 0; i < map_data.length; i++) {
    marker = L.marker([map_data[i]['lat'],map_data[i]['lon']]).bindPopup(map_data[i]['Unnamed: 0']).addTo(mymap);
    // L.circle([map_data[i]['lat'],map_data[i]['lon']], {
    //     color: 'red',
    //     fillColor: '#f03',
    //     fillOpacity: 0.5,
    //     radius: 500
    // }).addTo(mymap);
    // marker = L.marker([map_data[i]['lat'],map_data[i]['lon']])
        // .bindPopup(map_data[i]['location'])
        // .addTo(map);
}