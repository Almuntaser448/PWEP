
var q; // référence le bloc d'affichage id="quizz
var re;
var te='Tour Eiffel';
var mymap;

var invite = "<p style='font-size:22px; text-align:center;'>Cliquez pour jouer</p><br/>";
	invite += "<button style='background-color:skyblue; color:white; display:block; margin:auto; font-size:25px;' onclick='init();'>Lancer le quizz</button>";
	
	
$(document).ready(function() {
	q =  document.getElementById('Quizz'); //initialisation de q
	$.getJSON("qcm.php", function(data){tabObject = data});
	lancer();
});

/*Fonctions cookies*/

function setCookie(id,utili,exdays) {
  	var d = new Date();
  	d.setTime(d.getTime() + (exdays*60*60*100));
  	var expires = "expires=" + d.toGMTString();
  	document.cookie = id + "=" + utili + ";" + expires + ";path=/";

}

function getCookie(id) {
  	var r = id + "=";
  	var decodedCookie = decodeURIComponent(document.cookie);
  	var ca = decodedCookie.split(';');
  	for(var i = 0; i < ca.length; i++) {
    	var c = ca[i];
	    while (c.charAt(0) == ' ') {
	    	c = c.substring(1);
	    }
	    if (c.indexOf(r) == 0) {
	      	return c.substring(r.length, c.length);
	    }
  	}
  	return "";
}	

function checkCookie() {
	var id = getCookie("1");
	if (id != "") {
		alert("Bon retour parmit nous :) ");
	} 
	else {
		alert("Nous sommes heureux de votre visite !");
	}
}


function lancer() {
	q.innerHTML = invite;	//affichage de l'invite
	$("body").addClass("body1");
	$("#Quizz").addClass("quizz");
	$("p").css({
		'color': 'white',
		'font-size': '45px'
	})
	checkCookie ();
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
	quest = "<img src='images/exit.png'style='position:absolute; right:0; top:0;' onclick='lancer();'/>";
	quest += "<h1 style='text-align:center;'>Test de culture générale</h1><br>";
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

function jarozer(r,reponse){
    var jaro_winkler = {};
    var a=r;
    var b=reponse;
 
     
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
     var resultat = jaro_winkler.distance(a,b)*100;
     var pourcentage= resultat + '%';
     //alert(pourcentage);
     return resultat;
    }

function verif(r, reponse) {
  	var resultatTest = jarozer(r,reponse);
  	if(resultatTest==100) {
    	alert("Réponse exacte !");
    	$("#Quizz").empty();
    	q.innerHTML = repquest();
    	$("#map").addClass("map");
    	carte();
  	}
  	else if(resultatTest>=86) {
    	alert("Bonne réponse malgré une petite faute dans l'orthographe !");
    	$("#Quizz").empty();
    	q.innerHTML = repquest();
    	$("#map").addClass("map");
    	carte();
  	}
  	else {
    	alert("Mauvaise réponse");
  	}
}

function repquest() {
	var v= "<div id='map'></div>";
	v += "<img src='https://img.icons8.com/flat-round/64/000000/arrow--v1.png' onclick='suite();' style='right: 0; bottom:0; position:absolute; margin-bottom: 3%; margin-right:4%;'/>";
	v += "<img id='restaurants' src='https://img.icons8.com/bubbles/100/000000/restaurant.png' style='position:absolute; margin-top: 8%;' onclick='restaurants()'/>";
	v+= "<img src='https://img.icons8.com/clouds/100/000000/shop.png' style='position:absolute; margin-top: 18%;' onclick='magasins()'/>";
	v+= "<img src='https://img.icons8.com/bubbles/100/000000/subway.png' style='position:absolute; margin-top: 28%;' onclick='transports()'/>";
	v += "<img src='https://img.icons8.com/bubbles/100/000000/bed.png' style='position:absolute; margin-top: 38%;' onclick='hotels()'/>";
	v += "<img src='images/exit.png'style='position:absolute; right:0;' onclick='lancer();'/>";
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

function restaurants() {
	var y = L.icon({
	    iconUrl: 'images/yellowmarker.png',
	    iconSize:    [38, 38],
    	iconAnchor:   [22, 22],
    	popupAnchor:  [-3, -3]
	});

	L.marker([48.85692, 2.2922], {icon: y}).addTo(mymap);
	L.marker([48.85923, 2.30131], {icon: y}).addTo(mymap);
	L.marker([48.85693, 2.30096], {icon: y}).addTo(mymap);
	L.marker([48.85558, 2.3008], {icon: y}).addTo(mymap);	
	L.marker([48.85469, 2.29509], {icon: y}).addTo(mymap);
	L.marker([48.85842, 2.28756], {icon: y}).addTo(mymap);

	L.Routing.control({
	  	waypoints: [
	    	L.latLng(48.8582620692546,2.2944955763291),
	    	L.latLng(48.85692, 2.2922)
	  	]
	}).addTo(mymap);

}

function magasins() {

	var y = L.icon({
	  	iconUrl: 'images/purplemarker.png',
	  	iconSize:     [32, 32],
    	iconAnchor:   [16, 16],
    	popupAnchor:  [-5, -5]
  	});

	L.marker([48.85794, 2.30122], {icon: y}).addTo(mymap);

  	L.Routing.control({
  		waypoints: [
    		L.latLng(48.8582620692546,2.2944955763291),
   			L.latLng(48.85794, 2.30122)
  		]
	}).addTo(mymap);
}

function transports() {
  var y = L.icon({
    iconUrl: 'images/redmarker.png',
    iconSize:     [32, 32],
    iconAnchor:   [16, 16],
    popupAnchor:  [-5, -5]
  });

  L.marker([48.8566, 2.2898], {icon: y}).addTo(mymap);
}

function hotels() {
  var y = L.icon({
    iconUrl: 'images/greenmarker.png',
    iconSize:     [32, 32],
    iconAnchor:   [16, 16],
    popupAnchor:  [-5, -5]
  });

  L.marker([48.8604399, 2.3007825], {icon: y}).addTo(mymap);
  L.marker([48.85549, 2.29269], {icon: y}).addTo(mymap);
}

function suite() {
	q.innerHTML = suitetxt();
	$("h1").addClass("p2");
}

function suitetxt() {
	var s = "<img src='images/exit.png'style='position:absolute; right:0; top:0;' onclick='lancer();'/>";
	s += "<h1>À suivre ...</h1>";
	return s;
}



