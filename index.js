import { generateSudoku, printPuzzle } from './SudokuLevelGenerator.test.js';
import { uploadPuzzle, getPuzzles } from './firebase.js';

let generateButton = document.getElementById("generateButton");
let difficultyLevel = document.getElementById("difficultyLevel");
let uploadButton = document.getElementById("upload");
let showButton = document.getElementById("show");
let puzzle = null;

let d = new Date();
let season = `${d.getFullYear()}-${d.toLocaleString('default', { month: 'long'})}-${Math.floor(d.getDate()/4)}`;

currentSeason.innerHTML = "Current Season: " + season;

generateButton.addEventListener("click", (e) => {
  e.preventDefault();
  puzzle = generateSudoku(difficultyLevel.value);
  printPuzzle(puzzle);
});


uploadButton.addEventListener("click", (e) => {
  e.preventDefault();
  if(puzzle != null){
    uploadPuzzle(puzzle, season, difficultyLevel.value);
  } else {
    output.innerHTML = "Generate first!";
  }
});


showButton.addEventListener("click", async (e) => {
  e.preventDefault();
  let puzzles = await getPuzzles(season);
  showPuzzles(puzzles);
});


function showPuzzles(puzzles){
  totalPuzzles.innerHTML = "Total: " + puzzles.length;
  allPuzzles.innerHTML = "";
  for(let i = 0; i < puzzles.length; i++){
    let puzzle = puzzles[i];
    let puzzleElement = document.createElement("div");
    let puzzleInfo = document.createElement("p");
    puzzleInfo.innerHTML = `<b> ${puzzle.id} </b> <br/> points: ${puzzle.points}`;
    puzzleElement.appendChild(puzzleInfo);
    puzzleElement.appendChild(createPuzzleElement(puzzle.puzzle));
    allPuzzles.appendChild(puzzleElement);      
  }
}


function createPuzzleElement(puzzle){
  let container = document.createElement("p");
  let stringOutput = "";
  let puzzleIndex = 0;
  for(var i = 0; i < 9; i ++){
    for(var j = 0; j < 9; j++){
      stringOutput += puzzle[puzzleIndex++] + (j == 8 ? "" : "--");
    }
    stringOutput += "\n <br>";
  }
  container.innerHTML += stringOutput;
  return container;
}
