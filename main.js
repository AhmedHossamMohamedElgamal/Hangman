
// Letters
const letters = 'abcdefghijklmnopqrstuvwxyz';
//console.log(letters.split(''));
// Get Array From Letters
let lettersArray = Array.from(letters);

// letter containers
let lettersContent = document.querySelector('.the-letter');
/// for each letters in array
lettersArray.forEach((letter)=>{
    // create span
    let span = document.createElement('span');
    let text = document.createTextNode(letter);
    span.className = 'box-letter';
    span.appendChild(text);
    lettersContent.appendChild(span);
});
/// Object of words and catagories
const word = {
    programming: ["php", "javascript", "go", "scala", "fortran", "r", "mysql", "python"],
    movies: ["Prestige", "Inception", "Parasite", "Interstellar", "Whiplash", "Memento", "Coco", "Up"],
    people: ["Albert Einstein", "Hitchcock", "Alexander", "Cleopatra", "Mahatma Ghandi"],
    countries: ["Syria", "Palestine", "Yemen", "Egypt", "Bahrain", "Qatar"]
};

let allKeys = Object.keys(word); // Array of keys 
let ranPropNum = Math.floor(Math.random()*allKeys.length); // random properties number 
let ranPropName = allKeys[ranPropNum]; // random properties name
let ranPropValue = word[ranPropName]; // random properties value
// Random number depend on word
let ranValueNum = Math.floor(Math.random()*ranPropValue.length); // random value Number
// solution  chosen word
let ranValueValue = ranPropValue[ranValueNum]; 
/// set categories info 
document.querySelector(".game-info .category span").innerHTML = ranPropName;
// select letters guess

let letterGuess = document.querySelector(".letter-guess");
let arrayChosenWord = Array.from(ranValueValue);
arrayChosenWord.forEach((letter)=>{
    let emptySpan = document.createElement("span");
    if(letter === ' '){
        emptySpan.className = 'this-space';
    };
    letterGuess.appendChild(emptySpan);
});
/// 
// set wrong attemp
let wrongAttemps = 0;
// select the draw element
let draw = document.querySelector('.hangman-draw')

/// Handle click on letters
document.addEventListener('click',(e)=>{
    let thestatus = false;
    if(e.target.className === 'box-letter'){
        e.target.classList.add('clicked')
        let clickedLetter = e.target.innerHTML.toLowerCase();
        let arraychosenword = Array.from(ranValueValue.toLowerCase()); 
        arraychosenword.forEach((wordLetter,index)=>{
            if(clickedLetter === wordLetter){
                thestatus = true;
                document.querySelectorAll('.letter-guess span').forEach((span,indexs)=>{
                    if(index == indexs){
                        span.innerHTML = clickedLetter;
                    }
                });
            }
        });
        // out side the loop
        if(thestatus == false){
            wrongAttemps++;
            draw.classList.add(`wrong-${wrongAttemps}`);
            document.getElementById('fail').play();
            if(wrongAttemps == 7){
                endGame();
                lettersContent.classList.add('finished');
            }
        }else{
            document.getElementById('success').play();
        }
    }
});
function endGame(){
    let div = document.createElement('div');
    let text = document.createTextNode(`Game Over, the word is ${ranValueValue}`);
    div.appendChild(text);
    div.className = 'popup';
    document.body.appendChild(div);
}