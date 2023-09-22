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
// const black_pieces = {};
// const white_pieces = {};
// black_pieces.rooks = [new Rook("black", "left"), new Rook("black", "right")];
// black_pieces.rooks
//   .find((rook) => rook.side === "left")
//   .init(chessboard.getSquares()[7][7]);
// black_pieces.rooks
//   .find((rook) => rook.side === "right")
//   .init(chessboard.getSquares()[7][0]);
// black_pieces.rooks.forEach((rook) => {
//   console.log(rook);
//   console.log(
//     rook.curSquare.square.isOccupied,
//     rook.curSquare.square.pieceOccupying
//   );
// });

// white_pieces.rooks = [new Rook("white", "left"), new Rook("white", "right")];
// white_pieces.rooks
//   .find((rook) => rook.side === "left")
//   .init(chessboard.getSquares()[0][7]);
// white_pieces.rooks
//   .find((rook) => rook.side === "right")
//   .init(chessboard.getSquares()[0][0]);
