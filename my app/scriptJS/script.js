var q; // référence le bloc d'affichage id="quizz
var re;
var te='Tour Eiffel';

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

function question() {
	var quest;
	quest = "<h1 style='text-align:center;'>Test de culture générale</h1><br>";
	quest += "<p style='text-align:center; font-size:18px;'>"
	//quest += tabObject[1].question;
	quest += "Quel est le monument le plus haut de Paris (324 metres) ?</p><br/>";
	quest += reponse();
	quest += bouton();
	quest += "<li style='color:red; text-align:center;'></li>";
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
		lancer();
	}
	else {
		alert("Mauvaise réponse");
	}
}
