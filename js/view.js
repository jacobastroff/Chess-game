import Bishop from "../js/pieces/bishop.js";
import Knight from "../js/pieces/knight.js";
import Rook from "../js/pieces/rook.js";
import Queen from "../js/pieces/queen.js";
class ChessGame {
  #el = document.querySelector(".chess-board");
  active_square_piece = null;
  prevSquareEl = null;
  prevActiveSquarePiece = null;
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
    document
      .querySelectorAll(".promotion-container-container")
      .forEach((el) =>
        el.addEventListener("click", this.selectPromotionPiece.bind(this))
      );
    document
      .querySelector(".message-box-container")
      .addEventListener("click", function () {
        location.reload();
      });
  }
  activateTurnSequence(e) {
    // this.disableBoard();
    // try {
    // console.log(e.target);
    if (e.target.closest(".square")) {
      // console.log("you clicked on square");
      // console.log(this.active_square_piece);
      if (!this.active_square_piece) {
        this.active_square_piece = this.curColorPieces.find(
          (piece) => piece.curSquare.square.element === e.target
        );
        if (
          this.active_square_piece === undefined ||
          this.active_square_piece.color !== this.curColor
        )
          this.enableMessagePopup("No available piece on that square", true);
        // console.log(`THIS IS ${this.prevSquareEl}`);
        this.prevSquareEl?.classList?.remove("active-square");
        this.prevAvailableSquares?.forEach((square) =>
          square.element.classList.remove("potential-square")
        );
        // console.log(this.active_square_piece);
        this.chessboard
          .getSquares()
          .flat()
          .forEach((square) =>
            square.element.classList.remove("active-square")
          );
        e.target.classList.add("active-square");
        // console.log(e.target.classList);
        const king = this.curColorPieces.find((piece) => piece.type === "king");
        // console.log(
        //   king.isBehindPinnedPiece(this.active_square_piece, this.chessboard)
        // );
        this.active_square_piece
          .filterOutDisabledSquares(
            this.active_square_piece.getAvailableSquares(
              this.chessboard,
              undefined,
              king.isBehindPinnedPiece(
                this.active_square_piece,
                this.chessboard
              ),
              king.piecePinning(this.active_square_piece, this.chessboard)
            ),
            this.chessboard
          )
          .forEach((square) =>
            square.element.classList.add("potential-square")
          );
        this.prevSquareEl = this.active_square_piece.curSquare.square.element;
      } else {
        const king = this.curColorPieces.find((piece) => piece.type === "king");
        const square = this.chessboard
          .getSquares()
          .flat()
          .find((square) => square.element === e.target);
        let availableSquares;
        if (this.active_square_piece.type !== "king") {
          // console.log("GRR");
          console.log(this);
          availableSquares = this.prevAvailableSquares =
            this.active_square_piece.filterOutDisabledSquares(
              this.active_square_piece.getAvailableSquares(
                this.chessboard,
                undefined,
                king.isBehindPinnedPiece(
                  this.active_square_piece,
                  this.chessboard
                ),
                king.piecePinning(this.active_square_piece, this.chessboard)
              ),
              this.chessboard
            );
        } else {
          // console.log("LOVE U");
          availableSquares = this.prevAvailableSquares =
            this.active_square_piece.filterOutDisabledSquares(
              this.active_square_piece.getAvailableSquares(this.chessboard),
              this.chessboard
            );
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
            this.active_square_piece.filterOutDisabledSquares(
              this.active_square_piece.getAvailableSquares(
                this.chessboard,
                undefined,
                king.isBehindPinnedPiece(
                  this.active_square_piece,
                  this.chessboard
                ),
                king.piecePinning(this.active_square_piece, this.chessboard)
              ),
              this.chessboard
            )
          );
          if (canGoStatus) {
            this.active_square_piece.moveTo(square, this.chessboard);
            console.log(
              this.active_square_piece.curSquare.row,
              this.active_square_piece.type
            );
            if (
              this.active_square_piece.type === "pawn" &&
              this.active_square_piece.curSquare.square.row ===
                (this.active_square_piece.color === "white" ? 8 : 1)
            ) {
              console.log(this.active_square_piece?.curSquare?.square);
              this.initiatePromotionSequence();
              // this.active_square_piece.promoteTo(
              //   new Bishop(this.active_square_piece.color),
              //   this.active_square_piece?.curSquare?.square,
              //   this.active_square_piece.getSameColorPieces(this.chessboard),
              //   this.chessboard
              // );
            }
            this.switchTurn();
            // this.active_square_piece.getSameColorPieces.forEach(piece=>piece.disabled === true)
            availableSquares.forEach((square) =>
              square.element.classList.remove("potential-square")
            );
            this.prevActiveSquarePiece = this.active_square_piece;
            this.active_square_piece = null;
            // this.switchTurn();

            // prevSquareEl.classList.remove("active-square");
          } else {
            this.enableMessagePopup(
              "Piece cannot go there. Please try again",
              true
            );
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
            this.switchTurn();

            this.active_square_piece = null;
            // this.switchTurn();
          } else {
            this.enableMessagePopup(
              "Piece cannot go there. Please try again",
              true
            );
            this.active_square_piece = null;
          }
        }
      }
    }
    // } catch (err) {
    //   //   console.error(err.message);
    //   if (
    //     err.message === "No available piece on that square" ||
    //     err.message === "Piece cannot go there. Please try again"
    //   ) {
    //     this.enableMessagePopup(err.message, true);
    //   } else {
    //     this.enableMessagePopup("Error. Please try again.", true);
    //   }

    // }
  }
  switchTurn() {
    // this.curColorPieces.forEach((piece) => (piece.disabled = true));
    console.log(
      this.active_square_piece
        .getOpposingPieces(this.chessboard)
        .find((piece) => piece.type === "king")
        .isInCheck(this.chessboard)
    );
    console.log(
      this.active_square_piece
        .getOpposingPieces(this.chessboard)
        .find((piece) => piece.type === "king")
        .hasBeenCheckmated(this.chessboard)
    );

    this.curColor = this.curColor === "white" ? "black" : "white";
    this.curColorPieces =
      this.curColor === "white" ? this.white_pieces : this.black_pieces;
    if (
      this.curColorPieces
        .find((piece) => piece.type === "king")
        .hasBeenCheckmated(this.chessboard)
    ) {
      this.disableBoard();

      console.log(
        `Game over! ${this.curColor === "white" ? "Black" : "White"} won!`
      );
      this.enableMessagePopup(
        `Game over! ${this.curColor === "white" ? "Black" : "White"} won! `,
        false
      );
    }
    if (
      this.curColorPieces
        .find((piece) => piece.type === "king")
        .hasDrawOccured(this.chessboard)
    ) {
      this.disableBoard();

      console.log(`Game over! Draw!`);
      this.enableMessagePopup(`Game over! Draw!`, false);
    }
    // USE MARKER TO VISUALLY SHOW WHO'S TURN IT IS
    //ALSO SCHOLARS MATE DOESNT WORK
  }
  disableBoard() {
    this.#el.style.pointerEvents = "none";
  }
  enableBoard() {
    this.#el.style.pointerEvents = "all";
  }
  disablePromotionModule(color) {
    document.querySelector(`.promotion-${color}`).classList.add("disabled");
  }
  enablePromotionModule(color) {
    document.querySelector(`.promotion-${color}`).classList.remove("disabled");
  }
  initiatePromotionSequence() {
    this.disableBoard();
    this.disableMessagePopup();
    this.enablePromotionModule(this.active_square_piece.color);
  }
  selectPromotionPiece(e) {
    const group =
      this.curColor === "white" ? this.white_pieces : this.black_pieces;
    console.log(group);
    const imageSelected = e.target.closest("img");
    if (imageSelected) {
      const pieceName = imageSelected.alt.split(" ")[1];
      console.log(this.active_square_piece);
      let piece;
      if (pieceName === "bishop") {
        piece = new Bishop(this.prevActiveSquarePiece.color);
      } else if (pieceName === "knight") {
        piece = new Knight(this.prevActiveSquarePiece.color);
      } else if (pieceName === "rook") {
        piece = new Rook(this.prevActiveSquarePiece.color);
      } else {
        piece = new Queen(this.prevActiveSquarePiece.color);
      }
      this.prevActiveSquarePiece.promoteTo(
        piece,
        this.prevActiveSquarePiece.curSquare.square,
        this.prevActiveSquarePiece.getSameColorPieces(this.chessboard),
        this.chessboard
      );
      this.enableBoard();
      this.disablePromotionModule(this.prevActiveSquarePiece.color);
    }
  }
  enableMessagePopup(message, isError) {
    const messageBoxContainer = document.querySelector(
      ".message-box-container"
    );
    const messageBox = messageBoxContainer.querySelector(".message-box");
    messageBoxContainer.classList.remove("hidden");
    if (isError) {
      messageBox.classList.remove("end-of-game");
      messageBox.classList.add("error");
      messageBoxContainer.dataset.status = "error";
    } else {
      messageBox.classList.remove("error");
      messageBox.classList.add("end-of-game");
      messageBoxContainer.dataset.status = "end-of-game";
    }
    messageBox.querySelector(".message").textContent = message;
    setTimeout(
      function () {
        this.disableMessagePopup();
      }.bind(this),
      2000
    );
  }
  disableMessagePopup() {
    document.querySelector(".message-box-container").classList.add("hidden");
  }
}
export default ChessGame;
