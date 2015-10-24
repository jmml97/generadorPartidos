var word1, word2;
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
    });
    $("#generate").click(function(){
	$("#partidoBlock").fadeIn("slow");
    });
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

 
 
function generate(){
    var firstWord = word1[Math.floor(Math.random()*word1.length)];
    var secondWord = word2[Math.floor(Math.random()*word2.length)];
    
    var partido = firstWord + " " + secondWord;
    
    document.getElementById("partido").innerHTML = partido;
    
}
 
