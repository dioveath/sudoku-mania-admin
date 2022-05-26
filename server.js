import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { generateSudoku } from './SudokuLevelGenerator.test.js';
import { getPuzzles, uploadPuzzle } from './firebase.js';

const app = express();
const PORT = process.env.PORT || 4100;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let prevSeason = '';
let tempPuzzles = [];

async function updateSeason(season, limit) {
  console.log("THIS SEASON TOTAL PUZZLES: " + limit);
  for (let i = 0; i < limit; i++) {
    const diffLevel = (i + 4) + Math.floor(Math.random() * 4);
    const puzzle = generateSudoku(diffLevel);
    tempPuzzles.push(puzzle);
    await uploadPuzzle(puzzle, season, diffLevel);
  }
}

setInterval(async () => {
  try {
    const newDate = new Date();
    const season = `${newDate.getFullYear()}-${newDate.toLocaleString('default', { month: 'long' })}-${Math.floor(newDate.getDate() / 4)}`;
    // const season = new Date().getMinutes();
    console.log("season: " + season);

    if (season === prevSeason) {
      return;
    }

    const limit = new Date(newDate.getFullYear(), newDate.getMonth(), 0).getDate();
    console.log("limit: " + limit);
    if ((await getPuzzles(season)).length < limit) {
      await updateSeason(season, limit);
      if ((await getPuzzles(sesason)).length >= limit) {
        prevSeason = season;
      }
    }

    console.log(`Sudoku Mania Server Running! \nSudoku Mania Season: ${season}`);
  } catch (e) {
    console.log(e);
  }
}, 5000);

// 1 day = 86400000 milliseconds
// 4 days = 345600000 milliseconds

app.get('/', (_, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(PORT, () => {
  console.log(`Sudoku Mania Server Running! \nSudoku Mania Season: ${prevSeason}`);
});

