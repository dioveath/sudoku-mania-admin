# SudokuMania Admin Web App
To help generating and uploading puzzle for SudokuMania Game.

## version 0.2.0
- NodeJs as Backend server. 
- Deployable through Docker
- Automatically creates and updates the new season.

# Instructions
- Requires credential.js, Use your project's config file

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyBF-................",
  authDomain: "sudokumania..................com",
  databaseURL: "https://sudokumania-.............................app",
  projectId: "sudokumania-......",
  storageBucket: "sudokumania-.........com",
  messagingSenderId: "4488565........",
  appId: "1:.......:web:..........",
  measurementId: "G-......."
};

export { firebaseConfig };
```
- Set the difficulty level and press generate to generate Random Sudoku
- You can upload to your realtime-database with upload
