import ChessBoard from "./chessboard.js";
import { white_pieces, black_pieces } from "./allPieces.js";
import chessGameClass from "./view.js";
//Testing - REMOVE AFTER
const chessboard = new ChessBoard();
const chessGame = new chessGameClass(
  "white",
  white_pieces,
  black_pieces,
  chessboard
);
chessboard.create_board("#054175");
chessGame.white_pieces.forEach((piece) =>
  piece.init(
    chessboard.getSquares()[piece.startingCoord[0]][piece.startingCoord[1]],
    chessboard
  )
);
chessGame.black_pieces.forEach((piece) =>
  piece.init(
    chessboard.getSquares()[piece.startingCoord[0]][piece.startingCoord[1]],
    chessboard
  )
);
chessGame.setup();
// console.log(black_pieces[0].getOpposingPieces(chessboard));
// console.log(white_pieces[0].getOpposingPieces(chessboard));
//CHECKMATE
//TEST 1
// const blackKing = black_pieces.find((piece) => piece.type === "king");
// console.log(blackKing.hasBeenCheckmated(chessboard));
// const queen = white_pieces.find((piece) => piece.type === "queen");
// queen.moveTo(chessboard.getSquares()[6][5], chessboard);
// console.log(blackKing.hasBeenCheckmated(chessboard));
// console.log(blackKing.getAvailableSquares(chessboard));
// const bishop = white_pieces.find((piece) => piece.type === "bishop");
// bishop.moveTo(chessboard.getSquares()[5][6], chessboard);
// console.log(
//   bishop.getAvailableSquares(chessboard, undefined, undefined, undefined, true)
// );
// console.log(blackKing.hasBeenCheckmated(chessboard));

//TEST 2
// const blackKing = black_pieces.find((piece) => piece.type === "king");

// const queen = white_pieces.find((piece) => piece.type === "queen");
// const pawn = black_pieces.find(
//   (piece) => piece.type === "pawn" && piece.curSquare.column === 6
// );
// pawn.moveTo(chessboard.getSquares()[2][3], chessboard);
// const second_pawn = black_pieces.find(
//   (piece) => piece.type === "pawn" && piece.curSquare.column === 7
// );
// second_pawn.moveTo(chessboard.getSquares()[2][4], chessboard);
// queen.moveTo(chessboard.getSquares()[4][7], chessboard);
// console.log(blackKing.isInCheck(chessboard));

// console.log(blackKing.hasBeenCheckmated(chessboard));

//KING AVAILABLE SQUARES
// const rook = white_pieces.find((piece) => piece.type === "rook");
// const king = black_pieces.find((piece) => piece.type === "king");
// console.log(king.getAvailableSquares(chessboard));
// rook.moveTo(chessboard.getSquares()[3][4], chessboard);
// console.log(rook.isCheckingKing(rook.getAvailableSquares(chessboard)));
// console.log(rook.getAvailableSquares(chessboard));
// console.log(rook.getLineToKingSquares(chessboard));
// console.log(king.getAvailableSquares(chessboard));

//LINE OF SIGHT ROOK
// const rook = white_pieces.find((piece) => piece.type === "rook");
// rook.moveTo(chessboard.getSquares()[3][4]);
// console.log(rook.isCheckingKing(rook.getAvailableSquares(chessboard)));
// console.log(rook.getAvailableSquares(chessboard));
// console.log(rook.getLineToKingSquares(chessboard));

//LINE OF SIGHT BISHOP
// const bishop = white_pieces.find(
//   (piece) => piece.type === "bishop" && piece.curSquare.column === 6
// );
// bishop.moveTo(chessboard.getSquares()[4][1]);
// console.log(bishop.isCheckingKing(bishop.getAvailableSquares(chessboard)));
// console.log(bishop.getAvailableSquares(chessboard));
// console.log(bishop.getLineToKingSquares(chessboard));
//LINE OF SIGHT QUEEN
//1.
// const queen = white_pieces.find((piece) => piece.type === "queen");
// queen.moveTo(chessboard.getSquares()[4][1]);
// console.log(queen.isCheckingKing(queen.getAvailableSquares(chessboard)));
// console.log(queen.getAvailableSquares(chessboard));
// console.log(queen.getLineToKingSquares(chessboard));
//2.
// const queen = white_pieces.find((piece) => piece.type === "queen");
// queen.moveTo(chessboard.getSquares()[3][4]);
// console.log(queen.isCheckingKing(queen.getAvailableSquares(chessboard)));
// console.log(queen.getAvailableSquares(chessboard));
// console.log(queen.getLineToKingSquares(chessboard));
//OTHER TESTS
// const king = white_pieces.find((piece) => piece.type === "king");
// const queen = black_pieces.find((piece) => piece.type === "queen");
// // queen.moveTo(chessboard.getSquares()[3][4]);
// console.log(
//   king.isBehindPinnedPiece(
//     white_pieces.find(
//       (piece) => piece.type === "pawn" && piece.curSquare.column === 6
//     ),
//     chessboard
//   )
// );
// console.log(king.isInCheck(chessboard));
// console.log(queen.isCheckingKing(queen.getAvailableSquares(chessboard)));
// const knight = white_pieces.find(
//   (piece) => piece.type === "knight" && piece.curSquare.column === 7
// );
// knight.moveTo(chessboard.getSquares()[1][4]);

//PINNING

//KNIGHT
// const king = white_pieces.find((piece) => piece.type === "king");
// console.log(
//   king.isBehindPinnedPiece(
//     white_pieces.find(
//       (piece) => piece.type === "pawn" && piece.curSquare.column === 6
//     ),
//     chessboard
//   )
// );
// console.log(
//   white_pieces.find(
//     (piece) => piece.type === "pawn" && piece.curSquare.column === 6
//   )
// );
// const queen = black_pieces.find((piece) => piece.type === "queen");
// queen.moveTo(chessboard.getSquares()[3][4]);
// console.log(
//   king.isBehindPinnedPiece(
//     white_pieces.find(
//       (piece) => piece.type === "pawn" && piece.curSquare.column === 6
//     ),
//     chessboard
//   )
// );
// console.log(king.isInCheck(chessboard));
// console.log(queen.isCheckingKing(queen.getAvailableSquares(chessboard)));
// const knight = white_pieces.find(
//   (piece) => piece.type === "knight" && piece.curSquare.column === 7
// );
// knight.moveTo(chessboard.getSquares()[1][4], chessboard);
// console.log(king.isBehindPinnedPiece(knight, chessboard));
// console.log(king.isInCheck(chessboard));
// console.log(queen.isCheckingKing(queen.getAvailableSquares(chessboard)));
// console.log(chessboard.getSquares());
// console.log(
//   knight.getAvailableSquares(
//     chessboard,
//     undefined,
//     true,
//     king.piecePinning(knight, chessboard)
//   )
// );
//BISHOP
// //#1
// const king = white_pieces.find((piece) => piece.type === "king");

// const queen = black_pieces.find((piece) => piece.type === "queen");
// queen.moveTo(chessboard.getSquares()[3][5]);

// console.log(king.isInCheck(chessboard));
// console.log(queen.isCheckingKing(queen.getAvailableSquares(chessboard)));
// const bishop = white_pieces.find(
//   (piece) => piece.type === "bishop" && piece.curSquare.column === 6
// );
// bishop.moveTo(chessboard.getSquares()[1][4], chessboard);
// console.log(king.isBehindPinnedPiece(bishop, chessboard));
// console.log(king.isInCheck(chessboard));
// console.log(queen.isCheckingKing(queen.getAvailableSquares(chessboard)));
// console.log(chessboard.getSquares());
// console.log(bishop.getAvailableSquares(chessboard));

//2
// const king = white_pieces.find((piece) => piece.type === "king");

// const queen = black_pieces.find((piece) => piece.type === "queen");
// queen.moveTo(chessboard.getSquares()[3][4]);

// console.log(king.isInCheck(chessboard));
// console.log(queen.isCheckingKing(queen.getAvailableSquares(chessboard)));
// const bishop = white_pieces.find(
//   (piece) => piece.type === "bishop" && piece.curSquare.column === 6
// );
// bishop.moveTo(chessboard.getSquares()[1][4], chessboard);
// console.log(king.isBehindPinnedPiece(bishop, chessboard));
// console.log(king.isInCheck(chessboard));
// console.log(queen.isCheckingKing(queen.getAvailableSquares(chessboard)));
// console.log(chessboard.getSquares());
// console.log(bishop.getAvailableSquares(chessboard));
//3

// const king = white_pieces.find((piece) => piece.type === "king");

// const queen = black_pieces.find((piece) => piece.type === "queen");
// queen.moveTo(chessboard.getSquares()[2][6]);

// console.log(king.isInCheck(chessboard));
// console.log(queen.isCheckingKing(queen.getAvailableSquares(chessboard)));
// const bishop = white_pieces.find(
//   (piece) => piece.type === "bishop" && piece.curSquare.column === 6
// );
// bishop.moveTo(chessboard.getSquares()[1][5], chessboard);
// console.log(king.isBehindPinnedPiece(bishop, chessboard));
// console.log(king.isInCheck(chessboard));
// console.log(queen.isCheckingKing(queen.getAvailableSquares(chessboard)));
// console.log(chessboard.getSquares());
// console.log(bishop.getAvailableSquares(chessboard));
//4
// const king = white_pieces.find((piece) => piece.type === "king");

// const queen = black_pieces.find((piece) => piece.type === "queen");
// queen.moveTo(chessboard.getSquares()[3][7]);

// console.log(king.isInCheck(chessboard));
// console.log(queen.isCheckingKing(queen.getAvailableSquares(chessboard)));
// const bishop = white_pieces.find(
//   (piece) => piece.type === "bishop" && piece.curSquare.column === 6
// );
// bishop.moveTo(chessboard.getSquares()[1][5], chessboard);
// console.log(king.isBehindPinnedPiece(bishop, chessboard));
// console.log(king.isInCheck(chessboard));
// console.log(queen.isCheckingKing(queen.getAvailableSquares(chessboard)));
// console.log(chessboard.getSquares());
// console.log(bishop.getAvailableSquares(chessboard));

//QUEEN
//#1
// const king = white_pieces.find((piece) => piece.type === "king");

// const queen = black_pieces.find((piece) => piece.type === "queen");
// queen.moveTo(chessboard.getSquares()[3][5]);

// console.log(king.isInCheck(chessboard));
// console.log(queen.isCheckingKing(queen.getAvailableSquares(chessboard)));
// const white_queen = white_pieces.find((piece) => piece.type === "queen");
// queen.moveTo(chessboard.getSquares()[1][4], chessboard);
// console.log(king.isBehindPinnedPiece(white_queen, chessboard));
// console.log(king.isInCheck(chessboard));
// console.log(queen.isCheckingKing(queen.getAvailableSquares(chessboard)));
// console.log(chessboard.getSquares());
// console.log(white_queen.getAvailableSquares(chessboard));
// console.log(queen.getAvailableSquares(chessboard));
// 2;
// const king = white_pieces.find((piece) => piece.type === "king");

// const queen = black_pieces.find((piece) => piece.type === "queen");
// queen.moveTo(chessboard.getSquares()[3][4]);

// console.log(king.isInCheck(chessboard));
// console.log(queen.isCheckingKing(queen.getAvailableSquares(chessboard)));
// const white_queen = white_pieces.find((piece) => piece.type === "queen");
// white_queen.moveTo(chessboard.getSquares()[1][4], chessboard);
// console.log(king.isBehindPinnedPiece(white_queen, chessboard));
// // console.log("HELLO");
// console.log(king.isInCheck(chessboard));
// console.log(queen.isCheckingKing(queen.getAvailableSquares(chessboard)));
// console.log(chessboard.getSquares());
// console.log(white_queen.getAvailableSquares(chessboard));
//3

// const king = white_pieces.find((piece) => piece.type === "king");

// const queen = black_pieces.find((piece) => piece.type === "queen");
// queen.moveTo(chessboard.getSquares()[2][6]);

// console.log(king.isInCheck(chessboard));
// console.log(queen.isCheckingKing(queen.getAvailableSquares(chessboard)));
// const white_queen = white_pieces.find((piece) => piece.type === "queen");
// white_queen.moveTo(chessboard.getSquares()[1][5], chessboard);
// console.log(king.isBehindPinnedPiece(white_queen, chessboard));
// console.log(king.isInCheck(chessboard));
// console.log(queen.isCheckingKing(queen.getAvailableSquares(chessboard)));
// console.log(chessboard.getSquares());
// console.log(white_queen.getAvailableSquares(chessboard));
//4
// const king = white_pieces.find((piece) => piece.type === "king");

// const queen = black_pieces.find((piece) => piece.type === "queen");
// queen.moveTo(chessboard.getSquares()[3][7]);

// console.log(king.isInCheck(chessboard));
// console.log(queen.isCheckingKing(queen.getAvailableSquares(chessboard)));
// const white_queen = white_pieces.find((piece) => piece.type === "queen");
// white_queen.moveTo(chessboard.getSquares()[1][5], chessboard);
// console.log(king.isBehindPinnedPiece(white_queen, chessboard));
// console.log(king.isInCheck(chessboard));
// console.log(queen.isCheckingKing(queen.getAvailableSquares(chessboard)));
// console.log(chessboard.getSquares());
// console.log(white_queen.getAvailableSquares(chessboard));

//PAWN
//1
// const king = white_pieces.find((piece) => piece.type === "king");

// const queen = black_pieces.find((piece) => piece.type === "queen");
// queen.moveTo(chessboard.getSquares()[3][7]);

// // console.log(king.isInCheck(chessboard));
// // console.log(queen.isCheckingKing(queen.getAvailableSquares(chessboard)));
// const pawn = white_pieces.find(
//   (piece) => piece.type === "pawn" && piece.curSquare.column === 7
// );
// pawn.moveTo(chessboard.getSquares()[2][6], chessboard);
// console.log(king.isBehindPinnedPiece(pawn, chessboard));
// // console.log(king.isInCheck(chessboard));
// console.log(
//   queen.isCheckingKing(
//     queen.getAvailableSquares(chessboard, pawn.curSquare.square)
//   )
// );
// // console.log(chessboard.getSquares());
// console.log(pawn.getAvailableSquares(chessboard));
//2

// const king = white_pieces.find((piece) => piece.type === "king");

// const queen = black_pieces.find((piece) => piece.type === "queen");
// queen.moveTo(chessboard.getSquares()[3][7], chessboard);

// // console.log(king.isInCheck(chessboard));
// // console.log(queen.isCheckingKing(queen.getAvailableSquares(chessboard)));
// const pawn = white_pieces.find(
//   (piece) => piece.type === "pawn" && piece.curSquare.column === 6
// );
// // pawn.moveTo(chessboard.getSquares()[2][6], chessboard);
// console.log(king.isBehindPinnedPiece(pawn, chessboard));
// // console.log(king.isInCheck(chessboard));
// console.log(
//   queen.isCheckingKing(
//     queen.getAvailableSquares(chessboard, pawn.curSquare.square)
//   )
// );
// console.log(queen.isCheckingKing(queen.getAvailableSquares(chessboard)));
// // console.log(chessboard.getSquares());
// console.log(pawn.getAvailableSquares(chessboard));
// console.log(
//   pawn.getAvailableSquares(
//     chessboard,
//     undefined,
//     king.isBehindPinnedPiece(pawn, chessboard),
//     king.piecePinning(pawn, chessboard)
//   )
// );
//3
// const king = white_pieces.find((piece) => piece.type === "king");

// const queen = black_pieces.find((piece) => piece.type === "queen");
// queen.moveTo(chessboard.getSquares()[4][4], chessboard);

// // console.log(king.isInCheck(chessboard));
// // console.log(queen.isCheckingKing(queen.getAvailableSquares(chessboard)));
// const pawn = white_pieces.find(
//   (piece) => piece.type === "pawn" && piece.curSquare.column === 5
// );
// // pawn.moveTo(chessboard.getSquares()[2][6], chessboard);
// console.log(king.isBehindPinnedPiece(pawn, chessboard));
// // console.log(king.isInCheck(chessboard));
// console.log(
//   queen.isCheckingKing(
//     queen.getAvailableSquares(chessboard, pawn.curSquare.square)
//   )
// );
// console.log(queen.isCheckingKing(queen.getAvailableSquares(chessboard)));
// // console.log(chessboard.getSquares());
// console.log(pawn.getAvailableSquares(chessboard));
// console.log(
//   pawn.getAvailableSquares(
//     chessboard,
//     undefined,
//     king.isBehindPinnedPiece(pawn, chessboard),
//     king.piecePinning(pawn, chessboard)
//   )
// );
//ROOK
//1;
// const king = white_pieces.find((piece) => piece.type === "king");

// const queen = black_pieces.find((piece) => piece.type === "queen");
// queen.moveTo(chessboard.getSquares()[3][4]);

// console.log(king.isInCheck(chessboard));
// console.log(queen.isCheckingKing(queen.getAvailableSquares(chessboard)));
// const rook = white_pieces.find(
//   (piece) => piece.type === "rook" && piece.curSquare.column === 8
// );
// rook.moveTo(chessboard.getSquares()[1][4], chessboard);
// console.log(king.isBehindPinnedPiece(rook, chessboard));
// console.log(king.isInCheck(chessboard));
// console.log(queen.isCheckingKing(queen.getAvailableSquares(chessboard)));
// console.log(chessboard.getSquares());
// console.log(rook.getAvailableSquares(chessboard));
//2
// const king = white_pieces.find((piece) => piece.type === "king");

// const queen = black_pieces.find((piece) => piece.type === "queen");
// queen.moveTo(chessboard.getSquares()[3][7]);

// console.log(king.isInCheck(chessboard));
// console.log(queen.isCheckingKing(queen.getAvailableSquares(chessboard)));
// const rook = white_pieces.find(
//   (piece) => piece.type === "rook" && piece.curSquare.column === 8
// );
// rook.moveTo(chessboard.getSquares()[1][5], chessboard);
// console.log(king.isBehindPinnedPiece(rook, chessboard));
// console.log(king.isInCheck(chessboard));
// console.log(queen.isCheckingKing(queen.getAvailableSquares(chessboard)));
// console.log(chessboard.getSquares());
// console.log(rook.getAvailableSquares(chessboard));

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
// const pawn = white_pieces.find(
//   (piece) => piece.type === "pawn" && piece.curSquare.column === 2
// );
// const black_pawn = black_pieces.find(
//   (piece) => piece.type === "pawn" && piece.curSquare.column === 4
// );
// console.log(
//   pawn.canGoTo(
//     chessboard.getSquares()[3][1],
//     pawn.getAvailableSquares(chessboard)
//   )
// );
// NORMAL TEST
// console.log(pawn);
// black_pawn.moveTo(chessboard.getSquares()[2][0]);
// pawn.moveTo(chessboard.getSquares()[6][6], chessboard);
// console.log(pawn.isCheckingKing(pawn.getAvailableSquares(chessboard)));

// console.log(pawn.getAvailableSquares(chessboard));

// EN PASSANT
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
//CASTLING LOGIC
// const king = white_pieces.find((piece) => piece.type === "king");
// console.log(king);
// const rook = white_pieces.find(
//   (piece) => piece.curSquare.column === 8 && piece.type === "rook"
// );
// const rook2 = white_pieces.find(
//   (piece) => piece.curSquare.column === 1 && piece.type === "rook"
// );
// console.log(king.canCastle(rook2, chessboard));
// const queen = black_pieces.find((piece) => piece.type === "queen");
// queen.moveTo(chessboard.getSquares()[1][3]);
// console.log(queen.isCheckingKing(queen.getAvailableSquares(chessboard)));
// console.log(king.isInCheck(chessboard));
// console.log(king.canCastle(rook, chessboard));

//CASTLING ACTION
// const king = white_pieces.find((piece) => piece.type === "king");
// setTimeout(() => king.castle(rook, chessboard), 3000);
