import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { generateSudoku } from './SudokuLevelGenerator.test.js';
import { uploadPuzzle } from './firebase.js';

const app = express();
const PORT = process.env.PORT || 4100;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const d = new Date();
const prevSeason = `${d.getFullYear()}-${d.toLocaleString('default', { month: 'long'})}-${Math.floor(d.getDate()/4)}`;
let tempPuzzles = [];

async function updateSeason(season, limit){
  console.log("THIS SEASON TOTAL PUZZLES: " + limit);
  for(let i = 0; i < limit; i++){
    const diffLevel = i + Math.floor(Math.random() * 4);
    const puzzle = generateSudoku(diffLevel);
    tempPuzzles.push(puzzle);
    await uploadPuzzle(puzzle, season, diffLevel);
  }  
}

setInterval(async () => {
  const newDate = new Date();
  const season = `${newDate.getFullYear()}-${newDate.toLocaleString('default', { month: 'long'})}-${Math.floor(newDate.getDate()/4)}`;

  if(season === prevSeason) {
    return;
  }  

  prevSeason = season;
  const limit = new Date(d.getFullYear(), d.getMonth(), 0).getDate();
  updateSeason(season, limit);
  console.log(`Sudoku Mania Server Running! \nSudoku Mania Season: ${season}`);

}, 1000);

// 1 day = 86400000 milliseconds
// 4 days = 345600000 milliseconds

app.get('/', (_, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Sudoku Mania Server Running! \nSudoku Mania Season: ${prevSeason}`);
});

