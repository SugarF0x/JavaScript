"use strict";

//- objects and shit -\\ ---------------------------------------------------------------------------------------------\\

const
    MAX_MAP_SIZE   = 30,
    MIN_MAP_SIZE   = 10,
    MAX_SPEED_SIZE = 10,
    MIN_SPEED_SIZE = 1,
    MAX_WIN_SIZE   = 50,
    MIN_WIN_SIZE   = 5;

let config = {
    rowsCount:  21,
    colsCount:  21,
    speed:      2,
    winLength:  50,

    validate() {
        if (this.rowsCount <= MIN_MAP_SIZE || this.rowsCount >= MAX_MAP_SIZE) {
            console.error("10 < rowsCount < 30");
            return false;
        }

        if (this.colsCount <= MIN_MAP_SIZE || this.colsCount >= MAX_MAP_SIZE) {
            console.error("10 < colsCount < 30");
            return false;
        }

        if (this.speed < MIN_SPEED_SIZE || this.speed > MAX_SPEED_SIZE) {
            console.error("1 <= speed <= 10");
            return false;
        }

        if (this.winLength < MIN_WIN_SIZE || this.winLength > MAX_WIN_SIZE) {
            console.error("5 <= winLength <= 50");
            return false;
        }

        return true;
    }
};

let render = {
    cells: {},

    map(rowsCount, colsCount) {
        let table = document.getElementById('game');
        table.innerText = '';

        for (let row = 0; row < rowsCount; row++) {
            let tr = document.createElement('tr');
            tr.classList.add('row');
            table.appendChild(tr);

            for (let col = 0; col < colsCount; col++) {
                let td = document.createElement('td');
                td.classList.add('cell');
                tr.appendChild(td);
                this.cells[`x${col}_y${row}`] = td;
            }
        }
    },

    snake(point = snake.body) {
        point.forEach((point,idx) => {
            this.cells[`x${point.x}_y${point.y}`].classList.add(idx === 0 ? 'snakeHead' : 'snakeBody');
        })
    },

    food(point = food.point) {
        this.cells[`x${point.x}_y${point.y}`].classList.add('food');
    },

    clear() {
        for (let key of Object.getOwnPropertyNames(this.cells)) {
            this.cells[key].className = 'cell';
        }
    },

    objects(snakePoint = snake.body, foodPoint = food.point) {
        this.clear();
        this.snake(snakePoint);
        this.food(foodPoint);
    }
};

let snake = {
    body: null,
    direction: null,

    init(startPoint, direction) {
        this.body = [startPoint];
        this.direction = direction;
    },

    move() {

    },

    grow() {

    }
};

let food = {
    point: {
        x: null,
        y: null,
    },


    set(point) {
        this.point.x = point.x;
        this.point.y = point.y;
    },

    generate() {
        let exclude = [...snake.body, this.point];
        let point = {x: null, y: null};

        do {
            point.x = random(0,config.colsCount-1);
            point.y = random(0,config.rowsCount-1);
        } while (
        exclude.some(function(elem) {
            return point.x === elem.x && point.y === elem.y;
        }));

        this.set(point);
    }
};

let game = {
    config,
    render,
    snake,
    food,

    getSnakeStartPoint() {
        return {
            x: Math.floor(this.config.colsCount / 2),
            y: Math.floor(this.config.rowsCount / 2)
        }
    },

    init(userConfig = {}) {
        Object.assign(this.config, userConfig);
        if (!this.config.validate()) {
           return false;
        }

        let gameDivs =
            '<div id="game-wrap">' +
                '<table id="game"></table>' +
                    '</div>' +
                    '<div id="menu">' +
                    '<div id="playButton" class="menuButton">Старт</div>' +
                    '<div id="newGameButton" class="menuButton">Новая игра</div>' +
                '</div>';
        document.body.insertAdjacentHTML('beforeend', gameDivs);

        this.snake.init(this.getSnakeStartPoint(),"up");
        this.food.generate();

        this.render.map(this.config.rowsCount,this.config.colsCount);
        this.render.objects(this.snake.body, this.food.point);
    }
};

//- main -\\ ---------------------------------------------------------------------------------------------------------\\

addCss("styles/lessons/7.css");
window.onload = function () {
    game.init();
};
