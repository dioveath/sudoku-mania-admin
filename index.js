import { generateSudoku, printPuzzle } from './SudokuLevelGenerator.test.js';
import { uploadPuzzle } from './firebase.js';

let generateButton = document.getElementById("generateButton");
let difficultyLevel = document.getElementById("difficultyLevel");
let uploadButton = document.getElementById("upload");
let puzzle = null;

generateButton.addEventListener("click", (e) => {
  e.preventDefault();
  puzzle = generateSudoku(difficultyLevel.value);
  printPuzzle(puzzle);
});

uploadButton.addEventListener("click", (e) => {
  e.preventDefault();
  if(puzzle != null){
    uploadPuzzle(puzzle, difficultyLevel.value);
  } else {
    output.innerHTML = "Generate first!";
  }
});
