var q; // référence le bloc d'affichage id="quizz
var re;
var te='Tour Eiffel';
var mymap;

var invite = "<p style='font-size:22px; text-align:center;'>Cliquez pour jouer</p><br/>";
	invite += "<button style='background-color:skyblue; color:white; display:block; margin:auto; font-size:20px;' onclick='init();'>Lancer le quizz</button>";
	
	
window.onload = function () {
	q =  document.getElementById('Quizz'); //initialisation de q
	lancer();
}


function lancer() {
	q.innerHTML = invite;	//affichage de l'invite
}

function init()  {
	q.innerHTML = question();
}

function question(mymap) {
	var quest;
	quest = "<h1 style='text-align:center;'>Test de culture générale</h1><br>";
	quest += "<p style='text-align:center; font-size:18px;'>"
	//quest += tabObject[1].question;
	quest += "Quel est le monument le plus haut de Paris (324 metres) ?</p><br/>";
	quest += reponse();
	quest += bouton();
	quest += "<div id='map' style='width: 600px; height: 400px; display:block; margin:auto; margin-top:10%;'></div>";
	return quest;
}

function reponse() {
	var rep = "<input id='textbox' style='display:block; margin:auto; font-size:18px; text-align:center;' oninput='re=value'><br/>";
	return rep;
}

function bouton() {
	var b= '<input type="button" style="display:block; margin:auto; background-color:white; font-size:18px; color:green; border:1px solid green;" value="Valider" onclick="verif(re,te);">';
	return b;
}

function verif(r, reponse) {
	if(r==reponse) {
		alert("Bonne réponse");
		carte();
	}
	else {
		alert("Mauvaise réponse");
	}
}

function carte() {
	mymap = L.map('map').setView([48.8582620692546,2.2944955763291],20);

	L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
		maxZoom: 18,
		attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
			'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
		id: 'mapbox/streets-v11',
		tileSize: 512,
		zoomOffset: -1
	}).addTo(mymap);
}


