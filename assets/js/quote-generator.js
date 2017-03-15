//two dimensional array with quote and person quote is attributed to
var quotes = [["I leave the mic in body bags, my rap style has, The force to leave you lost like the tribe of Shabazz", "Inspectah Deck, 7th Chamber"], ["Ruler Zig-Zag-Zig Allah jam is fatal, Quick to stick my Wu-Tang sword right through your navel", "RZA, 7th Chamber"], ["Well I'm a sire, I set the microphone on fire, Rap styles vary, Cary like Maria, My hip-hop will rock and shock the nation Like the Emancipation Proclamation", "U-God, Mystery of Chessboxin'"],["Huff? Puff? I'm gonna catch your bluff tuff, Rough, kicking rhymes like Jim Kelly Or Alex Haley, I'm a Mi-..Beetle Bailey rhymes", "Ol' Dirty Bastard, Mystery of Chessboxin'"], ["Homicide's illegal and death is the penalty, What justifies the homicide, when he dies, In his own iniquity it's the Master of the Mantis Rapture coming at ya We have an APB on an MC Killer Looks like the work of a Master", "Masta Killa, Mystery of Chessboxin'"], ["I'd rather flip shows instead of those Hanging on my living room wall: My first joint - and it went gold!", "Ghostface Killah, Can It Be All So Simple"], ["A young youth, rocking the gold tooth, 'Lo goose Only way I begin to G off was drug loot, Figured out I went the wrong route, So I got with a kick-ass clique and went all out, Catching keys from across seas, Rolling in MPV's every week we made forty G's","Raekwon, C.R.E.A.M."], ["I bomb atomically, Socrates' philosophies and hypotheses, Can't define how I be dropping these mockeries, Lyrically perform armed robbery","Inspectah Deck, Triumph"], ["Is court adjourned for the bad seed from bad sperm, Herb got my wig fried like a bad perm, what the blood Clot, we smoke pot and blow spots, You want to think twice, I think not, The Iron Lung ain't got to tell you where it's coming from","Method Man, Triumph"], ["Innocent black immigrants locked in housing tenements, Eighty-Five percent, tenants depended welfare recipients, Stapleton's been stamped as a concentration camp, At night I walk through, third eye as bright as a street lamp","RZA, Impossible"], ["Cock back my tongue like a hammer, my head is like A nickel-plated bammer, spit forty-five caliber grammar","RZA, Deadly Melody"]];

var x;
var quote;
var author;

//document ready function
$(function() {
  // function to generate quotes
   function generateQuote() {
   x = Math.floor((Math.random() * quotes.length));
   quote = quotes[x][0];
   author = quotes[x][1];
   $("#quote-pad").empty();
   $("#quote-pad").append("<p class='quote-body'>" + quote + "</p>");
   $("#quote-pad").append("<h3 class='quote-attribution'>" + author + "</h3>");
};
  // call generate quotes function on page load
  generateQuote();
  // call generate when button clicked
  $( "#quote-gen" ).click(function() {
    generateQuote();
    
  });
  
  // generate tweet when button clicked
   $( "#quote-tweet" ).click(function() {
    var tweetLink = "https://twitter.com/intent/tweet?text=" + quote + " (" + author + ")";
    $("#tweet-button-link").attr("href", tweetLink)
    
  });
  
});