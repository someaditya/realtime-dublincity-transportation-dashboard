
var directionsDisplay;
var directionsDisplay2;
var directionsService = new google.maps.DirectionsService();
var map;
var marker1;
var marker2;
var marker3;
var marker4;
var marker5;



function initialize() {
	directionsDisplay = new google.maps.DirectionsRenderer({
		polylineOptions: {
			strokeColor: "red",
			strokeOpacity: 1.0,
			strokeWeight: 5
		},
		suppressMarkers: true
	});

	directionsDisplay2 = new google.maps.DirectionsRenderer({
		polylineOptions: {
			strokeColor: "green",
			strokeOpacity: 1.0,
			strokeWeight: 5
		},
		suppressMarkers: true
	});

	var mapOptions = {
		zoom:12,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		center: {lat: 53.353584, lng: -6.251495}
	}
	map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
	directionsDisplay.setMap(map);
	directionsDisplay2.setMap(map);

  showHeatMap();
	showJson();
	
}


function showJson()
{
  $.getJSON('http://ec2-34-243-117-230.eu-west-1.compute.amazonaws.com:8080/poll/bus/data', function(data) {

    var myJsonString = JSON.stringify(data);
    var mydata1 = JSON.parse(myJsonString);
  // console.log(mydata);
  // alert(mydata[0].location);
  for(var i = 0; i < mydata1.length; i++) {
  	if(parseInt(mydata1[i].stopid) < 100100)
  	{
    // var obj = mydata[key];
    // console.log("obj");
    // console.log(obj);
    var start = {lat: parseFloat(mydata1[i].lattitude), lng: parseFloat(mydata1[i].longitude)};
    // console.log(i);
    if(mydata1[i].due_count == 0)
    {
    	marker5 = new google.maps.Marker({

    		icon: new google.maps.MarkerImage("http://maps.google.com/mapfiles/ms/icons/green-dot.png"),
    		label:mydata1[i].stopid,
    		position: start,
    		map: map
    	});
    }
    else
    {
    	marker5 = new google.maps.Marker({

    		icon: new google.maps.MarkerImage("http://maps.google.com/mapfiles/ms/icons/red-dot.png"),
    		label:mydata1[i].stopid,
    		position: start,
    		map: map
    	});
    }
  }
}
});
}

function showHeatMap()
{
	map2 = L.map('heatmap-canvas').setView([53.343584,-6.261495], 13);
	mapLink = '<a href="http://openstreetmap.org">OpenStreetMap</a>';
	L.tileLayer(
		'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			attribution: '&copy; ' + mapLink + ' Contributors',
			maxZoom: 23,
		}).addTo(map2);

	// request = new XMLHttpRequest();
 //  request.open('GET', 'http://ec2-34-243-117-230.eu-west-1.compute.amazonaws.com:8080/poll/bus/data', true);
  var array = [];

  var heatpoints = [];
  window.stationname = [];
  // request.onload = function() {


$.getJSON('http://ec2-34-243-117-230.eu-west-1.compute.amazonaws.com:8080/poll/bus/data', function(data) {

    var myJsonString = JSON.stringify(data);


    var mydata1 = JSON.parse(myJsonString);
    for(var i = 0; i < mydata1.length; i++) {
      if(parseInt(mydata1[i].stopid) < 100100)
      {
    // var obj = mydata[key];
    // console.log("obj");
    // console.log(obj);
    var start = {lat: parseFloat(mydata1[i].lattitude), lng: parseFloat(mydata1[i].longitude)};
    // console.log(i);
    if(mydata1[i].due_count == 0)
    {
      // console.log("Inside due count loop1");
      array.push([parseFloat(mydata1[i].lattitude), parseFloat(mydata1[i].longitude),0.5]);
    }
    else
    {
      // console.log("Inside due count loop2");
      array.push([parseFloat(mydata1[i].lattitude), parseFloat(mydata1[i].longitude),parseFloat(mydata1[i].due_count)+0.5]);
    }
  }
}

 });
  // console.log(array);
  var heat = L.heatLayer(array
    ,{
      radius: 18,
      blur: 15, 
      maxZoom: 10,
    }).addTo(map2);

// };

// request.onerror = function() {
//   // There was a connection error of some sort
// };

// request.send();
//   //console.log(mydata);
//   // alert(mydata[0].location);
  

}

function logout()
{
	window.location = "Login.html";
}


google.maps.event.addDomListener(window, 'load', initialize);

