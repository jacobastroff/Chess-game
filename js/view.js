class ChessGame {
  #el = document.querySelector(".chess-board");
  active_square_piece = null;
  prevSquareEl = null;
  constructor(color_to_start, white_pieces, black_pieces, chessboard) {
    this.curColor = color_to_start;
    this.white_pieces = white_pieces;
    this.black_pieces = black_pieces;
    this.curColorPieces =
      this.curColor === "white" ? this.white_pieces : this.black_pieces;
    this.chessboard = chessboard;
  }
  setup() {
    this.#el.addEventListener("click", this.activateTurnSequence.bind(this));
  }
  activateTurnSequence(e) {
    try {
      // console.log(e.target);
      if (e.target.closest(".square")) {
        // console.log("you clicked on square");
        // console.log(this.active_square_piece);
        if (!this.active_square_piece) {
          this.active_square_piece = this.curColorPieces.find(
            (piece) => piece.curSquare.square.element === e.target
          );
          if (this.active_square_piece === undefined)
            throw new Error("No available piece on that square");
          // console.log(`THIS IS ${this.prevSquareEl}`);
          this.prevSquareEl?.classList?.remove("active-square");
          this.prevAvailableSquares?.forEach((square) =>
            square.element.classList.remove("potential-square")
          );
          // console.log(this.active_square_piece);
          e.target.classList.add("active-square");
          // console.log(e.target.classList);
          const king = this.curColorPieces.find(
            (piece) => piece.type === "king"
          );
          // console.log(
          //   king.isBehindPinnedPiece(this.active_square_piece, this.chessboard)
          // );
          this.active_square_piece
            .getAvailableSquares(
              this.chessboard,
              undefined,
              king.isBehindPinnedPiece(
                this.active_square_piece,
                this.chessboard
              ),
              king.piecePinning(this.active_square_piece, this.chessboard)
            )
            .forEach((square) =>
              square.element.classList.add("potential-square")
            );
          this.prevSquareEl = this.active_square_piece.curSquare.square.element;
        } else {
          const king = this.curColorPieces.find(
            (piece) => piece.type === "king"
          );
          const square = this.chessboard
            .getSquares()
            .flat()
            .find((square) => square.element === e.target);
          let availableSquares;
          if (this.active_square_piece.type !== "king") {
            // console.log("GRR");
            availableSquares = this.prevAvailableSquares =
              this.active_square_piece.getAvailableSquares(
                this.chessboard,
                undefined,
                king.isBehindPinnedPiece(
                  this.active_square_piece,
                  this.chessboard
                ),
                king.piecePinning(this.active_square_piece, this.chessboard)
              );
          } else {
            // console.log("LOVE U");
            availableSquares = this.prevAvailableSquares =
              this.active_square_piece.getAvailableSquares(this.chessboard);
          }
          // console.log(square);
          if (
            this.active_square_piece.type !== "king" ||
            Math.abs(
              square.column - this.active_square_piece.curSquare.column
            ) !== 2
          ) {
            // console.log("HELLO WORLD");
            const canGoStatus = this.active_square_piece.canGoTo(
              square,
              this.active_square_piece.getAvailableSquares(
                this.chessboard,
                undefined,
                king.isBehindPinnedPiece(
                  this.active_square_piece,
                  this.chessboard
                ),
                king.piecePinning(this.active_square_piece, this.chessboard)
              )
            );
            if (canGoStatus) {
              this.active_square_piece.moveTo(square, this.chessboard);
              // this.active_square_piece.getSameColorPieces.forEach(piece=>piece.disabled === true)
              availableSquares.forEach((square) =>
                square.element.classList.remove("potential-square")
              );
              this.active_square_piece = null;
              // prevSquareEl.classList.remove("active-square");
            } else {
              // console.log("Piece cannot go there. Please try again ");
              this.active_square_piece = null;
              // console.log(this.prevSquareEl, "HELLO");
            }
          } else {
            if (availableSquares.includes(square)) {
              this.active_square_piece.castle(
                this.active_square_piece
                  .getSameColorPieces(this.chessboard)
                  .find(
                    (piece) =>
                      piece.type === "rook" &&
                      piece.curSquare.column === (square.column === 7 ? 8 : 1)
                  ),
                this.chessboard
              );
              availableSquares.forEach((square) =>
                square.element.classList.remove("potential-square")
              );
              this.active_square_piece = null;
            } else {
              console.log("Piece cannot go there. Please try again ");
              this.active_square_piece = null;
            }
          }
        }
      }
    } catch (err) {
      console.error(err.message);
    }
  }
  switchTurn() {}
}
export default ChessGame;
