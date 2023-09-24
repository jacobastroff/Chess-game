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

// TEST BISHOP
const bishop = white_pieces.find(
  (piece) => piece.type === "bishop" && piece.curSquare.column === 6
);
console.log(bishop.moveTo(chessboard.getSquares()[5][6]));
console.log(bishop.getAvailableSquares(chessboard));
console.log(bishop.isCheckingKing(bishop.getAvailableSquares(chessboard)));
