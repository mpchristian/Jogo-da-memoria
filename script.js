// Creating the board

function createLines() {
  let board = document.querySelector('#board');
  board.style.width = `${size * 82}px`;
  board.style.height = `${size * 82}px`;
  counter = createCollumns(size, counter, board);
}

function createCollumns(size, cont, board) {
  let line = document.createElement('div');
  for (let i = 1; i <= size; i += 1) {
    let pixel = document.createElement('div');
    pixel.id = cont;
    pixel.className = 'pixel';
    line.appendChild(pixel);
    cont += 1;
  }
  board.appendChild(line);
  return cont;
}

// Reading the size
let size = 4;
let counter = 0;

function createBoard(size) {
  for (let i = 1; i <= size; i += 1) {
    createLines();
  }
}

createBoard(size);



// Selecting the pairs
function selectPair(size) {
  let listOfPairs = [[], []];
  let choosen = [];
  while (choosen.length !== size ** 2) {
    let randomIndex1 = Math.floor(Math.random() * size ** 2);
    let randomIndex2 = Math.floor(Math.random() * size ** 2);
    if (!choosen.includes(randomIndex1) && !choosen.includes(randomIndex2) && randomIndex1 !== randomIndex2) {
      choosen.push(randomIndex1);
      choosen.push(randomIndex2);

      listOfPairs[0].push(randomIndex1);
      listOfPairs[1].push(randomIndex2);
    }
  }
  return listOfPairs;
}

listOfPairs = selectPair(size);

// Answer, putting images at right places and hiding them in arrayImages

function createImages(listOfPairs) {
  let arrayImages = [];

  for (i = 0; i < listOfPairs[0].length; i += 1) {
    arrayImages[listOfPairs[0][i]] = `url(https://picsum.photos/200/200?random=${i + 1})`;
    arrayImages[listOfPairs[1][i]] = arrayImages[listOfPairs[0][i]];
  }

  console.log(arrayImages);

  // testing
  for (let i = 0; i < listOfPairs[0].length; i += 1) {
    let image = document.createElement('div');
    image.style.backgroundImage = arrayImages[listOfPairs[1][i]];
    image.className = 'test';
    let main = document.querySelector('#main');
    main.appendChild(image);
  }

  return arrayImages;
}

arrayImages = createImages(listOfPairs);
console.log(arrayImages);


// pint the selected pixels
function pintSelected(arrayImages) {
  selectedOnes = document.querySelectorAll('.selected');
  numberSelected = selectedOnes.length;
  console.log(numberSelected);

  // if there are 2 selected pixels
  if (numberSelected === 2) {
    let pixel1 = selectedOnes[0];
    pixel1.style.backgroundImage = arrayImages[parseInt(pixel1.id)];
    let pixel2 = selectedOnes[1];
    pixel2.style.backgroundImage = arrayImages[parseInt(pixel2.id)];

    // if they match or not
    matchNotMatch(pixel1, pixel2);
  }
}

let wrongsCounter = 0;
let rightsCounter = 0;


function matchNotMatch(pixel1, pixel2) {
  // if they match
  if (arrayImages[parseInt(pixel1.id)] === arrayImages[parseInt(pixel2.id)]) {
    pixel1.classList.add('matched');
    pixel2.classList.add('matched');
    console.log('acertou');
    addSelectingEvent(arrayImages);
    rightsCounter += 1;

  } else {
    console.log('errou');
    wrongsCounter += 1;
    resetTheWrong(pixel1, pixel2);
  }

  // remove selected class name of the matched
  pixel1.classList.remove('selected');
  pixel2.classList.remove('selected');

  updateScore(wrongsCounter, rightsCounter, size);

}

function updateScore(wrongsCounter, rightsCounter, size) {
  let wrongsElement = document.querySelector('#wrongs-score');
  let rightsElement = document.querySelector('#rights-score')
  let scoreElement = document.querySelector('#score');

  wrongsElement.innerText = wrongsCounter;
  rightsElement.innerText = rightsCounter;

  let result =  100 * rightsCounter - 10 * wrongsCounter;
  scoreElement.innerText = `${Math.ceil(result)} / ${100 * size * 2}`;
}

function resetTheWrong(pixel1, pixel2) {
  setTimeout(function () {
    alert('Errou');
    // remove selected class name of the matched
    pixel1.style.backgroundImage = '';
    pixel2.style.backgroundImage = '';
    addSelectingEvent(arrayImages);
  }, 1000);
}

// where the game starts
function addSelectingEvent(arrayImages) {
  // selecting two pixels

  let notMatched = document.querySelectorAll('.pixel');
  for (let i = 0; i < notMatched.length; i += 1) {
    if (!notMatched[i].className.includes('matched')) {
      notMatched[i].style.backgroundImage = '';
    }
  }

  let numberSelected = 0;
  let board = document.querySelector('#board');
  board.addEventListener('click', function (event) {
    console.log(event.target.style.backgroundImage);
    if (numberSelected <= 1) {
      event.target.classList.add('selected');
      event.target.style.backgroundImage = arrayImages[parseInt(event.target.id)];
      numberSelected += 1;
    }

    // pint the selected pixels

    pintSelected(arrayImages);
  });
}

addSelectingEvent(arrayImages);

//

let goButton = document.querySelector('#go-button');
goButton.addEventListener('click', function () {
  let sizeButton = document.querySelector('#size-board');
  size = sizeButton.value;
  let mainElement = document.querySelector('main');
  let boardElement = document.querySelector('#board');
  mainElement.removeChild(boardElement);

  let newBoard = document.createElement('section');
  newBoard.id = 'board';
  mainElement.appendChild(newBoard);

  createBoard(size);
  listOfPairs = selectPair(size);
  arrayImages = createImages(listOfPairs);
  addSelectingEvent(arrayImages);
});