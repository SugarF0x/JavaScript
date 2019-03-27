"use strict";

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Task 1 \\ -----------------------------------------------------------------------------------------------------------
console.log(' > Task 1 < ');

let chessBoard = {
    render(rows, columns) {
        let table = this.generate(rows, columns);
        document.body.insertAdjacentHTML('beforeend', table);
    },

    generate(rows, columns) {
        let board = '';

        for (let y = 1; y <= rows; y++) {
            board += '<tr>';
            for (let x = 1; x <= columns; x++) {
                board += '<td style="height: 32px; width: 32px; text-align: center; background-color: ';
                if (y % 2 === 1) {
                    if (x % 2 === 1) {
                        board += 'black; color: white;"';
                    } else {
                        board += 'white;"';
                    }
                } else {
                    if (x % 2 === 0) {
                        board += 'black; color: white;"';
                    } else {
                        board += 'white;"';
                    }
                }
                board += '>' + this.getCharByDigit(y) + x + '</td>';
            }
            board += '</tr>';
        }
        return '<table style="border: 1px solid black;"><tbody>' + board + '</tbody></table>';
    },

    getCharByDigit(digit) {
        switch(digit) {
            case 1:  return 'A';
            case 2:  return 'B';
            case 3:  return 'C';
            case 4:  return 'D';
            case 5:  return 'E';
            case 6:  return 'F';
            case 7:  return 'G';
            case 8:  return 'H';
            case 9:  return 'I';
            case 10: return 'J';
            case 11: return 'K';
            case 12: return 'L';
            case 13: return 'M';
            case 14: return 'N';
            case 15: return 'O';
            case 16: return 'P';
            case 17: return 'Q';
            case 18: return 'R';
            case 19: return 'S';
            case 20: return 'T';
            case 21: return 'U';
            case 22: return 'V';
            case 23: return 'W';
            case 24: return 'X';
            case 25: return 'Y';
            case 26: return 'Z';
        }
    }
};

chessBoard.render(8,8);
//chessBoard.render(getRandomInt(1,26),getRandomInt(1,26));

// Task 2 \\ -----------------------------------------------------------------------------------------------------------
console.log(' > Task 2 < ');

