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

    map(rowsCount = config.rowsCount, colsCount = config.colsCount) {
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
    body:      null,
    direction: null,

    init(startPoint = {x:0,y:0}, direction = "right") {
        this.body = [startPoint];
        this.direction = direction;
    },

    getMovePoint(head = this.body[0], dir = this.direction) {
        switch (dir) {
            case 'up'   : return {x: head.x  , y: head.y-1};
            case 'right': return {x: head.x+1, y: head.y  };
            case 'down' : return {x: head.x  , y: head.y+1};
            case 'left' : return {x: head.x-1, y: head.y  };
        }
    },

    move() {
        if (!this.isMovePossible()) {
            game.state.set.finish();
            game.finish();
            return false;
        }

        this.body.unshift(this.getMovePoint());

        if (this.eat()) {
            game.food.generate();
        } else {
            this.body.pop();
        }
    },

    eat() {
        return JSON.stringify(game.snake.body[0]) === JSON.stringify(game.food.point);
    },

    changeDirection(direct) {
        if (['up','right','down','left'].includes(direct)) this.direction = direct;
    },

    isMovePossible(point) {
        return (
            this.getMovePoint(point).x <= game.config.colsCount-1 &&
            this.getMovePoint(point).y <= game.config.rowsCount-1 &&
            this.getMovePoint(point).x >= 0                       &&
            this.getMovePoint(point).y >= 0
        );
    },

    isDirChangeable(dir) {
        return JSON.stringify(this.getMovePoint(this.body[0], dir)) !== JSON.stringify(this.body[1]);
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

let state = {
    condition: null,

    set: {
        play()   {state.condition = 'playing' ;},
        stop()   {state.condition = 'stopped' ;},
        finish() {state.condition = 'finished';}
    },

    isPlaying() {
        return this.condition === 'playing';
    },

    isStopped() {
        return this.condition === 'stopped';
    }
};

let game = {
    config,
    render,
    snake,
    food,
    state,

    tick: null,

    getSnakeStartPoint() {
        return {
            x: Math.floor(this.config.colsCount / 2),
            y: Math.floor(this.config.rowsCount / 2)
        }
    },

    getDirectionByCode(code) {
        switch(code) {
            case 'KeyW':
            case 'ArrowUp':
                return 'up';

            case 'KeyD':
            case 'ArrowRight':
                return 'right';

            case 'KeyS':
            case 'ArrowDown':
                return 'down';

            case 'KeyA':
            case 'ArrowLeft':
                return 'left';

            default:
                return 'NaD';
        }
    },

    keyDownHandler(event) {
        let direction = this.getDirectionByCode(event.code);
        if (direction !== "NaD" && this.snake.isDirChangeable(direction)) {
            this.snake.changeDirection(direction);
        }
    },

    playButton() {
    let playText = document.getElementById('playButton');

    if (game.state.isPlaying()) {
        this.stop();
        playText.innerText = 'Старт';
    } else if (game.state.isStopped()) {
        this.play();
        playText.innerText = 'Стоп';
    }
},

    init(userConfig = {}) {
        Object.assign(this.config, userConfig);
        if (!this.config.validate()) {
           return false;
        }

        if (document.getElementById('game-wrap') === null) {
            let gameDivs =
                '<div id="game-wrap">' +
                    '<table id="game"></table>' +
                '</div>' +
                '<div id="menu">' +
                    '<div id="playButton" class="menuButton" onclick="game.playButton()">Старт</div>' +
                    '<div id="newGameButton" class="menuButton" onclick="game.init()">Новая игра</div>' +
                '</div>';
            document.body.insertAdjacentHTML('beforeend', gameDivs);
        }

        this.snake.init(this.getSnakeStartPoint(),"up");
        this.food.generate();
        this.state.set.stop();
        document.addEventListener('keydown', () => this.keyDownHandler(event));

        this.render.map();
        this.render.objects();
    },

    play() {
        this.state.set.play();
        this.tick = setInterval(function() {
            game.snake.move();
            game.render.objects();
        }, Math.floor(1000/this.config.speed));
    },

    stop() {
        this.state.set.stop();
        clearInterval(this.tick);
    },

    finish() {
        this.state.set.finish();
        clearInterval(this.tick);
        let playText = document.getElementById('playButton');
        playText.innerText = 'Конец';
        playText.removeAttribute('onclick');
    }
};

//- main -\\ ---------------------------------------------------------------------------------------------------------\\

addCss("styles/lessons/7.css");
window.onload = function () {
    game.init();
};
