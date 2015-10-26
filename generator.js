var word1, word2;
var sufijos_femeninos, sufijos_verbos;
var lado;
// Ñapa, debería tener en cuenta el JSON definido...
if ( !location.search || location.search.match(/izq/) ){
    lado = 'izquierdas';
} else {
    lado = 'derechas'
}

$(document).ready(function() {
    $.getJSON("words.json", function( data ) {
	word1 = data[lado][0];
	word2 = data[lado][1];
	sufijos_femeninos = data["sufijos_femeninos"];
	sufijos_verbos = data["sufijos_verbos"];
    });

    $("#generate").click(function(){
	$("#partidoBlock").fadeIn("slow");
    });

    $('#generate').on('click', function(ev) {
	ev.preventDefault();
	// Remove existing iframe
	$('#tweetBtn iframe').remove();
	// Generate new markup
	var tweetBtn = $('<a></a>')
	    .addClass('twitter-share-button')
	    .attr('href', 'http://twitter.com/share')
	    .attr('data-url', 'http://jmml97.github.io/generadorPartidos/')
	    .attr('data-text', 'Mi nuevo partido de ' + lado + ' es: ' + document.getElementById("partido").innerHTML + '. Genera el tuyo propio en: ');
	$('#tweetBtn').append(tweetBtn);
	
	twttr.widgets.load();
    });
});

function test_sufijos(word, sufijos) {
	for (var s in sufijos)
		if (word.substring(word.length-sufijos[s].length) == sufijos[s])
			return true;
	
	return false;
}

 function femenino(word) {
	return test_sufijos(word, sufijos_femeninos);
 }
 
 function verbo(word) {
	return test_sufijos(word, sufijos_verbos);
 }
 
function generate(){
	var firstWord = word1[Math.floor(Math.random()*word1.length)];
	var primera_verbo = verbo(firstWord);
	var primera_femenino = femenino(firstWord);
	do {
		var secondWord = word2[Math.floor(Math.random()*word2.length)].replace(/@/g, (primera_femenino ? "a" : "o")).replace(/_/g, (primera_femenino ? "a" : ""));
	} while (primera_verbo && verbo(secondWord));
		
    var partido = firstWord + " " + secondWord;
    
    document.getElementById("partido").innerHTML = partido;
    
}
 
