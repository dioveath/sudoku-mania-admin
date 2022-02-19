import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-analytics.js";
import { getDatabase, ref, set, get, push } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-database.js";
import { firebaseConfig } from "./credential.js";

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase();

function uploadPuzzle(puzzle, difficultyLevel) {
  let puzzlesRef = ref(db, "Puzzles");
  push(puzzlesRef).then(newRef => {
    push(puzzlesRef, {
      id: newRef.key,
      puzzle: puzzleToString(puzzle),
      points: difficultyLevel * 100,
    }).then((res) => {
      console.log(res);
    });
  });
}

function puzzleToString(puzzle){
  let res = "";
  for(let i = 0; i < 9; i++)
    for(let j = 0; j < 9; j++)
      res += puzzle[i][j];
  return res;
}


export { uploadPuzzle };

