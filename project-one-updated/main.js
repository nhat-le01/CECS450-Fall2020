
let STOPWORDS = ['i','me','my','myself','we','our','ours','ourselves','you','your','yours','yourself','yourselves','he','him','his','himself','she','her','hers','herself','it','its','itself','they','them','their','theirs','themselves','what','which','who','whom','this','that','these','those','am','is','are','was','were','be','been','being','have','has','had','having','do','does','did','doing','a','an','the','and','but','if','or','because','as','until','while','of','at','by','for','with','about','against','between','into','through','during','before','after','above','below','to','from','up','down','in','out','on','off','over','under','again','further','then','once','here','there','when','where','why','how','all','any','both','each','few','more','most','other','some','such','no','nor','not','only','own','same','so','than','too','very','s','t','can','will','just','don','should','now']
var punctuation = '!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~\n';
var REGEX = new RegExp('[' + punctuation + ']', 'g');

function remove_stopwords(str) {
  str = str.toLowerCase();
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

function getColor(value){
  //value from 0 to 1
  //green to red
  //1-value for reverse
  var hue=((value)*120).toString(10);
  return ["hsl(",hue,",100%,50%)"].join("");
}


function handler(wordsList) {
  /**
   * Given a list of words, draw it
   */
  //Should not be constant, depending on the lenght of text
  const baseSize = 5;
  const table = {};
  const min_freq = 1;
  for (let i = 0; i < wordsList.length; i++) {
    if (!(wordsList[i] in table)) {
      table[wordsList[i]] = 1;
    }
    else {
      table[wordsList[i]] += 1
    }
  }
  


  let startX = 10;
  let startY = 100;
  const draw = document.getElementById("canvas");
  const ctx = draw.getContext("2d");
  
  let sortable = [];
  for (const word in table) {
      sortable.push([word, table[word]]);
  }

  sortable.sort(function(a, b) {
      return b[1] - a[1];
  });
  if (sortable.length > 100) {
    sortable = sortable.slice(0, 101);
  }

  console.log(sortable[0]);
  const maxFreq = sortable[0][1];
  var positions = [];
  
  for (let i = 0; i < sortable.length; i++) {
    const word = sortable[i];
    const size = word[1] / min_freq * baseSize; //Font size
    const numLetter = word[0].length;
    const width = numLetter * size / 2; 
    //Check for intersection before pushing in
    /** 
    if (positions.length > 0) {
      const recentBox = positions[positions.length - 1];
      if ((startX + width > recentBox[0] && startY + size  > recentBox[1]) || ()) {

      }
    }
    */
   /** 
    if (startX > 800 || startX + width > 1000) {
      //Go to new line
      startY += size;
      startX = 10;
    }
    startX += width;
  */
    let endX = startX + width;
    if (endX > 1000) {
      startY += size;
      startX = 10;
    }
    positions.push([startX, startY, width, size]);
    startX += width;

  }
  
  for (let i = 0; i < positions.length;i++) {
    const word = sortable[i];
    const size = word[1] / min_freq * baseSize;
    console.log(word);
    console.log(size);
    ctx.font =  size.toString() + "px Georgia";
    ctx.fillStyle = getColor(word[1] / maxFreq);
    ctx.fillText(word[0], positions[i][0], positions[i][1]);
  }
  
}
