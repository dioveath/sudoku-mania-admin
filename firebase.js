import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get, push, query, orderByChild } from "firebase/database";
import { firebaseConfig } from "./credential.js";

const app = initializeApp(firebaseConfig);
const db = getDatabase();

async function uploadPuzzle(puzzle, season, difficultyLevel) {
  let puzzlesRef = ref(db, "Puzzles/" + season);

  let newRef = await push(puzzlesRef);
  let res = await push(puzzlesRef, {
      id: newRef.key,
      puzzle: puzzleToString(puzzle),
      points: difficultyLevel * 100,
  });

  console.log("Puzzles uploaded: " + newRef.key);
}

async function getPuzzles(season){
  let puzzlesRef = ref(db, "Puzzles/" + season);
  // let puzzlesQuery = query(puzzlesRef, orderByChild("points"));

  let puzzles = [];
  let snapshot = await get(puzzlesRef);
  if(snapshot.exists()) {
    let puzzlesObj = snapshot.val();
    for(const puzzleId in puzzlesObj){
      puzzles.push(puzzlesObj[puzzleId]);
    }
  }

  return puzzles;
}

function puzzleToString(puzzle){
  let res = "";
  for(let i = 0; i < 9; i++)
    for(let j = 0; j < 9; j++)
      res += puzzle[i][j];
  return res;
}


export { uploadPuzzle, getPuzzles, puzzleToString };

