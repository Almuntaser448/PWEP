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
	quest += "Quel est le monument le plus haut de Paris (324 metres) ?</p><br/>";
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
		q.innerHTML = "<div id='map' style='width: 900px; height: 500px; display:block; margin:auto; margin-top:12%;'></div>";
		carte();
	}
	else {
		alert("Mauvaise réponse");
		$("#textbox").val('');
	}
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
}



