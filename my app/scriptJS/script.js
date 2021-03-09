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


$(function(){
    alert('jQuery est prêt !');
    var jaro_winkler = {};
    var a='TOURifelle';
    var b='tour eiffel';
    //alert(jaro_winkler.distance("xer","auxers").val());
    //alert('touvabien');;
 
     
     jaro_winkler.distance = function(a, b) {
 
       if (!a || !b) { return 0.0; }
 
       a = a.trim().toUpperCase();
       b = b.trim().toUpperCase();
       var a_len = a.length;
       var b_len = b.length;
       var a_flag = []; var b_flag = [];
       var search_range = Math.floor(Math.max(a_len, b_len) / 2) - 1;
       var minv = Math.min(a_len, b_len);
 
       // Looking only within the search range, count and flag the matched pairs. 
       var Num_com = 0;
       var yl1 = b_len - 1;
       for (var i = 0; i < a_len; i++) {
         var lowlim = (i >= search_range) ? i - search_range : 0;
         var hilim  = ((i + search_range) <= yl1) ? (i + search_range) : yl1;
         for (var j = lowlim; j <= hilim; j++) {
           if (b_flag[j] !== 1 && a[j] === b[i]) {
             a_flag[j] = 1;
             b_flag[i] = 1;
             Num_com++;
             break;
           }
         }
       }
 
       // Return if no characters in common
       if (Num_com === 0) { return 0.0; }
 
       // Count the number of transpositions
       var k = 0; var N_trans = 0;
       for (var i = 0; i < a_len; i++) {
         if (a_flag[i] === 1) {
           var j;
           for (j = k; j < b_len; j++) {
             if (b_flag[j] === 1) {
               k = j + 1;
               break;
             }
           }
           if (a[i] !== b[j]) { N_trans++; }
         }
       }
       N_trans = Math.floor(N_trans / 2);
 
       // Adjust for similarities in nonmatched characters
       var N_simi = 0; var adjwt = jaro_winkler.adjustments;
       if (minv > Num_com) {
         for (var i = 0; i < a_len; i++) {
           if (!a_flag[i]) {
             for (var j = 0; j < b_len; j++) {
               if (!b_flag[j]) {
                 if (adjwt[a[i]] === b[j]) {
                   N_simi += 3;
                   b_flag[j] = 2;
                   break;
                 }
               }
             }
           }
         }
       }
 
       var Num_sim = (N_simi / 10.0) + Num_com;
 
       // Main weight computation
       var weight = Num_sim / a_len + Num_sim / b_len + (Num_com - N_trans) / Num_com;
       weight = weight / 3;
 
       // Continue to boost the weight if the strings are similar
       if (weight > 0.7) {
         // Adjust for having up to the first 4 characters in common
         var j = (minv >= 4) ? 4 : minv;
         var i;
         for (i = 0; (i < j) && a[i] === b[i]; i++) { }
         if (i) { weight += i * 0.1 * (1.0 - weight) };
 
         // Adjust for long strings.
         // After agreeing beginning chars, at least two more must agree
         // and the agreeing characters must be more than half of the
         // remaining characters.
         if (minv > 4 && Num_com > i + 1 && 2 * Num_com >= minv + i) {
           weight += (1 - weight) * ((Num_com - i - 1) / (a_len * b_len - i*2 + 2));
         }
       }
 
       return weight
       
     };
     //alert('postweightras');
 
     // The char adjustment table used above
     jaro_winkler.adjustments = {
       'A': 'E',
       'A': 'I',
       'A': 'O',
       'A': 'U',
       'B': 'V',
       'E': 'I',
       'E': 'O',
       'E': 'U',
       'I': 'O',
       'I': 'U',
       'O': 'U',
       'I': 'Y',
       'E': 'Y',
       'C': 'G',
       'E': 'F',
       'W': 'U',
       'W': 'V',
       'X': 'K',
       'S': 'Z',
       'X': 'S',
       'Q': 'C',
       'U': 'V',
       'M': 'N',
       'L': 'I',
       'Q': 'O',
       'P': 'R',
       'I': 'J',
       '2': 'Z',
       '5': 'S',
       '8': 'B',
       '1': 'I',
       '1': 'L',
       '0': 'O',
       '0': 'Q',
       'C': 'K',
       'G': 'J',
       'E': ' ',
       'Y': ' ', 
       'S': ' '
     }
     //alert('toutvatoujoursbien');
     var resultat = jaro_winkler.distance(a,b)*100;
     var pourcentage= resultat + '%';
     alert(pourcentage);
 });
 