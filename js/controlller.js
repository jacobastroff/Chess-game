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
// console.log(
//   white_pieces
//     .find((piece) => piece.type === "rook" && piece.curSquare.column === 8)
//     .getAvailableSquares(chessboard)
// );
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
// const queen = black_pieces.find((piece) => piece.type === "queen");
// console.log(queen);
// console.log(queen.getAvailableSquares(chessboard));
// queen.moveTo(chessboard.getSquares()[5][5]);

// console.log(queen.getAvailableSquares(chessboard));
// console.log(queen.isCheckingKing(queen.getAvailableSquares(chessboard)));

// PAWN
const pawn = white_pieces.find(
  (piece) => piece.type === "pawn" && piece.curSquare.column === 2
);
const black_pawn = black_pieces.find(
  (piece) => piece.type === "pawn" && piece.curSquare.column === 4
);
console.log(
  pawn.canGoTo(
    chessboard.getSquares()[3][1],
    pawn.getAvailableSquares(chessboard)
  )
);
// NORMAL TEST
// console.log(pawn);
// // black_pawn.moveTo(chessboard.getSquares()[2][0]);
// pawn.moveTo(chessboard.getSquares()[6][6]);
// console.log(pawn.isCheckingKing(pawn.getAvailableSquares(chessboard)));

// console.log(pawn.getAvailableSquares(chessboard));

//EN PASSANT
// console.log(pawn.firstMove);
// pawn.moveTo(chessboard.getSquares()[4][4], chessboard);
// console.log(pawn.en_passant_status, pawn.firstMove);
// console.log(black_pawn.firstMove, black_pawn.en_passant_status);
// black_pawn.moveTo(chessboard.getSquares()[5][3], chessboard);
// black_pawn.moveTo(chessboard.getSquares()[4][3], chessboard);

// console.log(black_pawn.en_passant_status, black_pawn.firstMove);
// console.log(chessboard.getSquares());

// console.log(pawn.getAvailableSquares(chessboard));
// console.log(pawn.getAvailableSquares(chessboard));

//KING

//MOVING TRANSITION
// setTimeout(
//   () =>
//     white_pieces
//       .find((piece) => piece.type === "knight" && piece.curSquare.column === 2)
//       .moveTo(chessboard.getSquares()[2][2]),
//   5000
// );
//SCHOLARS MATE
// setTimeout(
//   () =>
//     white_pieces
//       .find((piece) => piece.type === "pawn" && piece.curSquare.column === 5)
//       .moveTo(chessboard.getSquares()[3][4], chessboard),
//   5000
// );
// setTimeout(
//   () =>
//     white_pieces
//       .find((piece) => piece.type === "queen")
//       .moveTo(chessboard.getSquares()[4][7], chessboard),
//   6000
// );
// setTimeout(
//   () =>
//     white_pieces
//       .find((piece) => piece.type === "bishop" && piece.curSquare.column === 6)
//       .moveTo(chessboard.getSquares()[3][2], chessboard),
//   7000
// );
// setTimeout(
//   () =>
//     white_pieces
//       .find((piece) => piece.type === "queen")
//       .moveTo(chessboard.getSquares()[6][5], chessboard),
//   8000
// );
//KING
// const king = black_pieces.find((piece) => piece.type === "king");
// console.log(king.getOpposingPieces(chessboard));
// console.log(king.isInCheck(chessboard));
// console.log(king.isInCheck(chessboard, chessboard.getSquares()[2][2]));
// // king.moveTo(chessboard.getSquares()[2][2]);
// console.log(king.getAvailableSquares(chessboard));
// king.moveTo(chessboard.getSquares()[4][3]);
// console.log(king);
// console.log(king.getAvailableSquares(chessboard));
//DELETIONS
// pawn.delete(white_pieces);
// console.log(white_pieces);
