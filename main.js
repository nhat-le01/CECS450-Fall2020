
let STOPWORDS = ['i','me','my','myself','we','our','ours','ourselves','you','your','yours','yourself','yourselves','he','him','his','himself','she','her','hers','herself','it','its','itself','they','them','their','theirs','themselves','what','which','who','whom','this','that','these','those','am','is','are','was','were','be','been','being','have','has','had','having','do','does','did','doing','a','an','the','and','but','if','or','because','as','until','while','of','at','by','for','with','about','against','between','into','through','during','before','after','above','below','to','from','up','down','in','out','on','off','over','under','again','further','then','once','here','there','when','where','why','how','all','any','both','each','few','more','most','other','some','such','no','nor','not','only','own','same','so','than','too','very','s','t','can','will','just','don','should','now']
var punctuation = '!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~';
var REGEX = new RegExp('[' + punctuation + ']', 'g');

function remove_stopwords(str) {
  var cleanString = str.replace(REGEX, '');
  res = []
  words = cleanString.split(' ')
  for(i = 0; i < words.length; i++) {
     word_clean = words[i].split(".").join("")
     if(!STOPWORDS.includes(word_clean)) {
         res.push(word_clean)
     }
  }
  return res;
}  


function clickButtonHandler() { 
    var wordsList = remove_stopwords(document.getElementById("message").value);
    handler(wordsList);


}
function handler(wordsList) {
  /**
   * Given a list of words, draw it
   */

  var baseSize = 15;
  var table = {};
  var min_freq = 0;
  for (var i = 0; i < wordsList.length; i++) {
    if (!(wordsList[i] in table)) {
      table[wordsList[i]] = 1;
    }
    else {
      table[wordsList[i]] += 1
    }
  }
  
  for (const word in table) {
    if (table[word] < min_freq || min_freq == 0) {
      min_freq = table[word]
    }
  }
  console.log(table);
  console.log(min_freq);
  var startX = 10;
  var startY = 100;
  var draw = document.getElementById("canvas");
  var ctx = draw.getContext("2d");
  
  for (const word in table) {
    const size = table[word] / min_freq * baseSize;
    ctx.font =  size.toString() + "px Georgia";
    ctx.fillText(word, startX, startY);
    startX += 10 *size;
    if (startX > 800) {
      startY += 20;
      startX = 10;
    }
  }
    
}