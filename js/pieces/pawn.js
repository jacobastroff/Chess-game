import { Piece } from "./piece.js";
class Pawn extends Piece {
  firstMove = true;
  en_passant_status = false;
  constructor(color, startingCoordX) {
    super(color);
    this.image = `./Assets/${this.color}-pawn.svg`;
    this.type = "pawn";
    this.startingCoordX = startingCoordX;
  }
  get startingCoord() {
    if (this.color === "black") return [6, this.startingCoordX];
    else return [1, this.startingCoordX];
  }
  getAvailableSquares(
    chessboard,
    isCheckingAllSquares = undefined,
    isPinned = undefined,
    piecePinning = undefined,
    isCheckingLineOfSightKing = undefined
  ) {
    const allSquares = chessboard.getSquares().flat();
    const allPotentialSquares = [];
    const opposingPieces = this.getOpposingPieces(chessboard);
    const upOrDown = this.color === "white" ? 1 : -1;
    const nextSquare = allSquares.find(
      (square) =>
        square.column === this.curSquare.column &&
        square.row === this.curSquare.row + 1 * upOrDown
    );
    const nextNextSquare = allSquares.find(
      (square) =>
        square.column === this.curSquare.column &&
        square.row === this.curSquare.row + 2 * upOrDown
    );
    const diagonals = [
      allSquares.find(
        (square) =>
          square.column === this.curSquare.column + 1 &&
          square.row === this.curSquare.row + 1 * upOrDown
      ),
      allSquares.find(
        (square) =>
          square.column === this.curSquare.column - 1 &&
          square.row === this.curSquare.row + 1 * upOrDown
      ),
    ];
    if (
      nextSquare &&
      !nextSquare?.isOccupied &&
      (!isPinned || (isPinned && piecePinning.curSquare.column === this.column))
    ) {
      allPotentialSquares.push(nextSquare);
      if (this.firstMove && !nextNextSquare?.isOccupied) {
        allPotentialSquares.push(nextNextSquare);
      }
    }
    if (!isCheckingAllSquares) {
      diagonals.forEach((square) => {
        if (
          square?.isOccupied &&
          (!square?.pieceOccupyingName.startsWith(this.color) ||
            isCheckingLineOfSightKing) &&
          (!isPinned || piecePinning === square?.piece)
        ) {
          allPotentialSquares.push(square);
        }
      });
    } else {
      allPotentialSquares.push(...diagonals);
    }
    const allAvailableSquares = [...new Set(allPotentialSquares)].filter(
      (square) => square
    );
    const en_passant_pieces = allSquares.filter((square) => {
      // console.log(
      //   square.piece?.curSquare?.column - this.curSquare.column,
      //   square
      // );
      return (
        square?.piece?.color !== this.color &&
        square?.piece?.type === "pawn" &&
        Math.abs(square.piece?.curSquare?.column - this.curSquare.column) ===
          1 &&
        square?.piece?.en_passant_status === true
      );
    });
    // console.log(en_passant_pieces);
    for (const en_passant_piece of en_passant_pieces) {
      allAvailableSquares.push(
        allSquares.find(
          (square) =>
            square.row === en_passant_piece.row + 1 * upOrDown &&
            square.column === en_passant_piece.column
        )
      );
    }
    return allAvailableSquares;
  }
  has_caused_en_passant(squareTo, chessboard) {
    const allSquares = chessboard.getSquares().flat();
    // console.error("Hello");
    // console.log(allSquares.some((square) => square.row === squareTo.row));
    return allSquares.some(
      (square) =>
        square.row === squareTo.row &&
        Math.abs(squareTo.column - square.column) === 1 &&
        square.isOccupied &&
        !square.pieceOccupyingName.startsWith(`${this.color}`) &&
        square.pieceOccupyingName.endsWith("pawn")
    );
  }
  getLineToKingSquares() {
    return [this.curSquare.square];
  }
  isCheckingKing(availableSquares, square = undefined, chessboard) {
    // console.log(availableSquares, this);
    if (!square) {
      return availableSquares.some(
        (square) =>
          square.pieceOccupyingName.endsWith("king") &&
          square.column !== this.curSquare.column &&
          square.row !== this.curSquare.row
      );
    } else {
      const isOccupied = square.isOccupied;
      const pieceOccupyingName = square.pieceOccupyingName;
      square.isOccupied = true;
      square.pieceOccupyingName = `${
        this.color === "white" ? "black" : "white"
      } king`;
      //METHOD 1

      // console.log(square, this, this.getAvailableSquares(chessboard));
      // const status = this.canGoTo(square, this.getAvailableSquares(chessboard));
      // square.isOccupied = isOccupied;
      // square.pieceOccupyingName = pieceOccupyingName;
      // return status;
      // METHOD 2
      const blackWhiteMultiplier = this.color == "white" ? 1 : -1;
      const status = chessboard
        .getSquares()
        .flat()
        .filter(
          (square) =>
            square.row === this.curSquare.row + 1 * blackWhiteMultiplier &&
            Math.abs(square.column - this.curSquare.column) === 1
        )
        .some(
          (square) =>
            square.isOccupied &&
            square.pieceOccupyingName ===
              `${this.color === "white" ? "black" : "white"} king`
        );
      // console.log(status);
      square.isOccupied = isOccupied;
      square.pieceOccupyingName = pieceOccupyingName;
      return status;
    }
  }
  promoteTo(piece, square, group, chessboard) {
    this.delete(group, chessboard);
    piece.init(square, chessboard);
    group.push(piece);
  }
  is_enpassaning(chessboard) {
    return this.getOpposingPieces(chessboard).find(
      (piece) =>
        piece.curSquare?.square?.row ===
          this.curSquare?.square?.row + 1 * (this.color === "white" ? -1 : 1) &&
        piece.en_passant_status === true
    );
  }
}
export default Pawn;
