class ChessBoard {
  el = document.querySelector(".chess-board");
  #color_odd_squares;
  #color_even_squares = "#fff";
  #sqaures = [];

  constructor(color_black) {
    this.#color_odd_squares = color_black;
  }
  create_board() {
    for (let row = 8; row >= 1; row--) {
      let html;
      const row_squares = [];
      for (let square = 1; square <= 8; square++) {
        if (row % 2 !== 0) {
          html = `<div class="square ${
            square % 2 == 0 ? "white-square" : "black-square"
          }" data-column = ${square} data-row = ${row}></div>`;
        } else {
          html = `<div class="square ${
            square % 2 != 0 ? "white-square" : "black-square"
          }" data-column = ${square} data-row =${row}></div>`;
        }

        this.el.insertAdjacentHTML("beforeend", html);
        // console.log(this.el);
        const latest_square =
          document.querySelectorAll(`.square`)[
            document.querySelectorAll(`.square`).length - 1
          ];
        row_squares.push({
          column: square,
          row: square,
          xCor:
            latest_square.getBoundingClientRect().x +
            latest_square.getBoundingClientRect().width / 2,
          //NOTE - This is the center of the square - this means that if a piece is rendered here, the top will be at the center, so the piece will need to be translated 50% and -50% in order to be centered

          yCor:
            latest_square.getBoundingClientRect().y +
            latest_square.getBoundingClientRect().height / 2,
          //NOTE - This is the center of the square - this means that if a piece is rendered here, the top will be at the center, so the piece will need to be translated 50% and -50% in order to be centered
          element: latest_square,
          isOccupied: false,
          pieceOccupying: "",
        });
      }
      this.#sqaures.unshift(row_squares);
    }
  }
  getSquares() {
    // console.log(this.#sqaures);
    return this.#sqaures;
  }
}

export default ChessBoard;
