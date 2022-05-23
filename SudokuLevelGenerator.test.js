
function isSudokuValid(board){
  var sum = 45;
  for(var i = 0; i < 9; i++){
    var sumy = 0;
    var sumx = 0;
    var sumd = 0;
    for(var j = 0; j < 9; j++) {
      sumy += board[j][i];
      sumx += board[i][j];
      sumd += board[Math.floor(j/3)][j%3];
    }

    if(sumx != sum || sumx != sum || sumd != sum) return false;
  }

  return true;
}

function sudokuSolve(toSolvePuzzle) {
  let puzzle = toSolvePuzzle.map(arr => arr.slice());
  var iteration = 5;
  for(var iter = 0; iter < iteration; iter++){
    for(var i = 0; i < 9; i++){
      for(var j = 0; j < 9; j++){
        if(puzzle[i][j] == 0 || puzzle[i][j] instanceof Array) {
          var pValues = getPossibleValues(puzzle, j, i);
          puzzle[i][j] = pValues.length == 1 ? pValues[0] : pValues;
        }
      }
    }      
  }
  return puzzle;
}

function generateSudoku(dLevel = 20){
  while(true){
    let difficultyLevel = dLevel;
    let sudoku = [];
    for(let i = 0; i < 9; i++) {
      sudoku[i] = new Array();
      for(let j = 0; j < 9; j++)
        sudoku[i][j] = 0;
    }

    var backTrackedPuzzle = false;
    while(!backTrackedPuzzle) {
      // backtracked puzzle
      backTrackedPuzzle = backtrack(sudoku);
    }

    let iteration = 10;
    for(let iter = 0; iter < iteration; iter++){
      for(let i = 0; i < 9; i+=3){
        for(let j = 0; j < 9; j+=3){
          let x = j + Math.floor(Math.random() * 3);
          let y = i + Math.floor(Math.random() * 3);
          if(backTrackedPuzzle[y][x] == 0) continue;

          backTrackedPuzzle[y][x] = 0;
          if(backtrack(backTrackedPuzzle) == false) {
            continue;
          }
          // console.log(difficultyLevel);
          difficultyLevel--;
          if(difficultyLevel <= 0) return backTrackedPuzzle;          
        }
      }
    }

  }
  
}  

function suffle(array){
  for(var i = 0; i < array.length; i++){
    var rand = i + Math.floor(Math.random() * (array.length - i));
    var temp = array[i];
    array[i] = array[rand];
    array[rand] = temp;
  }
  return array;
}

function getPossibleValues(puzzle, x, y){
  var possibleValues = 0;
  possibleValues = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  for(var j = 0;j < 9; j++){
    
    // horizontal check
    if(possibleValues.includes(puzzle[y][j])){
      possibleValues.splice(possibleValues.indexOf(puzzle[y][j]), 1);
    }

    // vertical check
    if(possibleValues.includes(puzzle[j][x])){
      possibleValues.splice(possibleValues.indexOf(puzzle[j][x]), 1);
    }

    // 3x3 box check
    var offx = Math.floor(x/3);
    var offy = Math.floor(y/3);
    var value = puzzle[offy * 3 + Math.floor(j/3)][offx * 3 + j%3];
    if(possibleValues.includes(value)){
      possibleValues.splice(possibleValues.indexOf(value), 1);
    }            
  }

  return possibleValues.length == 0 ? [0] : possibleValues;
}

function isSudokuSolvable(board){
  return isSudokuValid(sudokuSolve(board));
}

function isValidMove(puzzle, x, y, number){
  for(let i = 0; i < 9; i++){
    if(puzzle[y][i] != 0 || puzzle[y][i] !== undefined)
      if(puzzle[y][i] == number && i != x) {
        return false;
      }

    if(puzzle[i][x] != 0 || puzzle[i][x] !== undefined)
      if(puzzle[i][x] == number && i != y) {
        return false;
      }

    let dx = Math.floor(x / 3) * 3 + (i % 3);
    let dy = Math.floor(y / 3) * 3 + Math.floor(i / 3);

    if(puzzle[dy][dx] != 0 || puzzle[dy][dx] !== undefined)
      if(puzzle[dy][dx] == number && (dy != y || dx != x)) {
        return false;
      }
  }

  return true;
}

function backtrack(puzzle){
  if(isSudokuValid(puzzle)) return puzzle;
  let solvedPuzzle = puzzle.map(arr => arr.slice());
  for(let i = 0; i < 9; i++){
    for(let j = 0; j < 9; j++){
      if(solvedPuzzle[i][j] != 0) continue;
      let solvable = false;
      // suffledPossibles for more random puzzle generation; 
      let suffledPossibles = suffle([1, 2, 3, 4, 5, 6, 7, 8, 9]);
      for(let k = 0; k < 9; k++){
        if(isValidMove(solvedPuzzle, j, i, suffledPossibles[k])) {
          let newPuzzle = solvedPuzzle.map(arr => arr.slice());
          newPuzzle[i][j] = suffledPossibles[k];
          let backTracked = backtrack(newPuzzle);
          if(backTracked == false) continue;
          else return backTracked;
          solvable = true;
        }
      }


      if(!solvable) return false;
    } 
  }

  return solvedPuzzle;
}

function printPuzzle(puzzle){
  var stringOutput = "<br> Generated Puzzle <br/> <br/>";
  for(var i = 0; i < 9; i ++){
    for(var j = 0; j < 9; j++){
      stringOutput += JSON.stringify(puzzle[i][j]) + "--";
    }
    stringOutput += "\n";
  }
  var output = document.getElementById("output");
  output.innerHTML = "";
  output.innerHTML += stringOutput;
  output.innerHTML += "========================================\n" ;
  return stringOutput;
}  


export { generateSudoku, printPuzzle };
