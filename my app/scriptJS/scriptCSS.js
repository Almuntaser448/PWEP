var q; // référence le bloc d'affichage id="quizz
var re;
var te='Tour Eiffel';
var mymap;

var invite = "<p style='font-size:22px; text-align:center;'>Cliquez pour jouer</p><br/>";
	invite += "<button style='background-color:skyblue; color:white; display:block; margin:auto; font-size:25px;' onclick='init();'>Lancer le quizz</button>";
	
	
window.onload = function () {
	q =  document.getElementById('Quizz'); //initialisation de q
	lancer();
}


function lancer() {
	q.innerHTML = invite;	//affichage de l'invite
	$("body").addClass("body1");
	$("#Quizz").addClass("quizz");
	$("p").css({
		'color': 'white',
		'font-size': '45px'
	})
}

function init()  {
	q.innerHTML = question();
	$("body").addClass("body2");
	$("p").addClass("p");
	$("h1").addClass("h1");
	$("#Quizz").removeClass();
	$("#bt").addClass("btValider");
	$("#textbox").addClass("textbox");
}

function question(mymap) {
	var quest;
	quest = "<h1 style='text-align:center;'>Test de culture générale</h1><br>";
	quest += "<p style='text-align:center;''>"
	//quest += tabObject[1].question;
	quest += "Quel est le monument le plus haut de Paris (324 mètres) ?</p><br/>";
	quest += reponse();
	quest += bouton();
	return quest;
}

function reponse() {
	var rep = "<input id='textbox' oninput='re=value'><br/>";
	return rep;
}

function bouton() {
	var b= '<input id="bt" type="button" value="Valider" onclick="verif(re,te);">';
	return b;
}

function verif(r, reponse) {
	if(r==reponse) {
		alert("Bonne réponse");
		$("#Quizz").empty();
		q.innerHTML = repquest();
		$("#map").addClass("map");
		carte();
	}
	else {
		alert("Mauvaise réponse");
		$("#textbox").val('');
	}
}

function repquest() {
	var v= "<div id='map' style=''></div>";
	v += "<img src='https://img.icons8.com/flat-round/64/000000/arrow--v1.png' onclick='init();' style='right: 0; bottom:0; position:absolute; margin-bottom: 3%; margin-right:4%;'/>";
	v += "<img src='https://img.icons8.com/bubbles/100/000000/restaurant.png' style='position:absolute; margin-top: 8%;'/>";
	v+= "<img src='https://img.icons8.com/clouds/100/000000/shop.png' style='position:absolute; margin-top: 18%;'/>";
	v+= "<img src='https://img.icons8.com/bubbles/100/000000/subway.png' style='position:absolute; margin-top: 28%;'/>";
	v += "<img src='https://img.icons8.com/bubbles/100/000000/bed.png' style='position:absolute; margin-top: 38%;'/>"
	return v;
}

function carte() {
	mymap = L.map('map').setView([48.8582620692546,2.2944955763291],16);

	L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
		maxZoom: 18,
		attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
			'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
		id: 'mapbox/streets-v11',
		tileSize: 512,
		zoomOffset: -1
	}).addTo(mymap);

	var myIcon = L.icon({
    	iconUrl: 'images/eiffel.png',
    	iconSize:     [38, 38],
		iconAnchor:   [22, 22],
		popupAnchor:  [-3, -3]
	});

	L.marker([48.85829, 2.29446], {icon: myIcon}).addTo(mymap);

	var circle = L.circle([48.8582620692546, 2.2944955763291], {
	    color: 'moccasin',
	    fillColor: 'rgb(255,250,205)',
	    fillOpacity: 0.35,
	    radius: 600
	}).addTo(mymap);
}
