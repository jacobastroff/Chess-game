import ChessBoard from "./chessboard.js";
import { white_pieces, black_pieces } from "./allPieces.js";

//Testing - REMOVE AFTER

const chessboard = new ChessBoard();

chessboard.create_board("#054175");
white_pieces.forEach((piece) =>
  piece.init(
    chessboard.getSquares()[piece.startingCoord[0]][piece.startingCoord[1]]
  )
);
black_pieces.forEach((piece) =>
  piece.init(
    chessboard.getSquares()[piece.startingCoord[0]][piece.startingCoord[1]]
  )
);
// console.log(chessboard.getSquares());
console.log(
  white_pieces
    .find((piece) => piece.type === "rook" && piece.curSquare.column === 8)
    .getAvailableSquares(chessboard)
);
// TEST ROOK
// white_pieces.find(
//   (piece) => piece.type === "rook" && piece.curSquare.column === 8

// ).moveTo(chessboard.getSquares()[3][4]);
// console.log(
//   white_pieces
//     .find((piece) => piece.type === "rook" && piece.curSquare.column === 8)
//     .getAvailableSquares(chessboard)
// );

// // TEST BISHOP
// white_pieces.find(
//   (piece) => piece.type === "bishop" && piece.curSquare.column === 6
// );
// console.log(
//   white_pieces
//     .find((piece) => piece.type === "bishop" && piece.curSquare.column === 6)
//     .moveTo(chessboard.getSquares()[3][4])
// );
// console.log(
//   white_pieces
//     .find((piece) => piece.type === "bishop" && piece.curSquare.column === 6)
//     .getAvailableSquares(chessboard)
// );

//KNIGHT
// const knight = white_pieces.find(
//   (piece) => piece.type === "knight" && piece.curSquare.column === 7
// );
// console.log(knight);
// knight.moveTo(chessboard.getSquares()[5][5]);
// console.log(knight.getAvailableSquares(chessboard));
// console.log(knight.isCheckingKing(knight.getAvailableSquares(chessboard)));

//QUEEN
const queen = white_pieces.find((piece) => piece.type === "queen");
console.log(queen);
console.log(queen.getAvailableSquares(chessboard));
queen.moveTo(chessboard.getSquares()[5][5]);

console.log(queen.getAvailableSquares(chessboard));
console.log(queen.isCheckingKing(queen.getAvailableSquares(chessboard)));
