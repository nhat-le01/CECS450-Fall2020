let STOPWORDS = ['i','me','my','myself','we','our','ours','ourselves','you','your','yours','yourself','yourselves','he','him','his','himself','she','her','hers','herself','it','its','itself','they','them','their','theirs','themselves','what','which','who','whom','this','that','these','those','am','is','are','was','were','be','been','being','have','has','had','having','do','does','did','doing','a','an','the','and','but','if','or','because','as','until','while','of','at','by','for','with','about','against','between','into','through','during','before','after','above','below','to','from','up','down','in','out','on','off','over','under','again','further','then','once','here','there','when','where','why','how','all','any','both','each','few','more','most','other','some','such','no','nor','not','only','own','same','so','than','too','very','s','t','can','will','just','don','should','now']
var punctuation = '!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~\n';
var REGEX = new RegExp('[' + punctuation + ']', 'g');
var started = false;

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

function clickListener(elem){
  var elemLeft = elem.offsetLeft + elem.clientLeft;
  var elemTop = elem.offsetTop + elem.clientTop;
  elem.addEventListener('click', function(event) {
    var x = event.pageX - elemLeft,
        y = event.pageY - elemTop;
        //console.log(x, y)

    // Collision detection between clicked offset and element.
    elements.forEach(function(element) {
        if (y > element.bottom - element.height && y < element.bottom 
            && x > element.left && x < element.left + element.width) {
            alert(element.word + ' appears ' + element.frequency + ' times!');
        }
    });

}, false);
}


function handler(wordsList) {
  /**
   * Given a list of words, draw it
   */
  //Should not be constant, depending on the lenght of text
  const maxSize = 120;
  const table = {};
  const min_freq = 1;
  for (let i = 0; i < wordsList.length; i++) {
    if (wordsList[i].length > 0){
      if (!(wordsList[i] in table)) {
        table[wordsList[i]] = 1;
      }
      else {
        table[wordsList[i]] += 1
      }
    }
  }
  
  let startX = 10;
  let startY = 100;
  var elem = document.getElementById('canvas'),
    ctx = elem.getContext('2d')
    elements = [];

    ctx.clearRect(0,0,1000,1000)


if(!started){
  clickListener(elem);
  started = true;
}

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

  const maxFreq = sortable[0][1];
  var baseSize = maxSize / maxFreq;
  var positions = [];
  console.log(elements);
  for (let i = 0; i < sortable.length; i++) {
    const word = sortable[i];
    const size = word[1] / min_freq * baseSize; //Font size
    const numLetter = word[0].length;
    const width = numLetter * size / 1.6; 

    let endX = startX + width;
    if (endX > 1000) {
      startY += size;
      startX = 10;
    }
    positions.push([startX, startY, width, size]);
    
    elements.push({
      frequency: word[1],
      word: word[0],
      width: width,
      height: size,
      bottom: startY,
      left: startX
    })
    startX += width;

  }

  console.log(sortable);

  for (let i = 0; i < positions.length;i++) {
    const word = sortable[i];
    const size = word[1] / min_freq * baseSize;
    ctx.font =  size.toString() + "px Georgia";
    ctx.fillStyle = getColor(word[1] / maxFreq);
    ctx.fillText(word[0], positions[i][0], positions[i][1]);
  }
  
}
