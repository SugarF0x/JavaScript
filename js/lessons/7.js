"use strict";

/*
        TODO - cleanup
    as all my objects are within one and the same file, i believe that i can remove many <this.> parameters from function calls
    have to try and see what happens
    it probably should work as i have already forgot to insert <this.> on many occasions and everything was fine
 */

//- objects and shit -\\ ---------------------------------------------------------------------------------------------\\

const
    MAX_MAP_SIZE   = 30,
    MIN_MAP_SIZE   = 10,
    MAX_SPEED_SIZE = 10,
    MIN_SPEED_SIZE = 1,
    MAX_WIN_SIZE   = 50,
    MIN_WIN_SIZE   = 5;

let config = {
    rowsCount: 21,
    colsCount: 21,
    speed: 2,
    winLength: 25,

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
    },

    inc(set) {
        switch(set) {
            case 0: if (this.rowsCount+1 <= MAX_MAP_SIZE)   this.rowsCount++; return true;
            case 1: if (this.colsCount+1 <= MAX_MAP_SIZE)   this.colsCount++; return true;
            case 2: if (this.speed+1     <= MAX_SPEED_SIZE) this.speed++    ; return true;
            case 3: if (this.winLength+1 <= MAX_WIN_SIZE)   this.winLength++; return true;
        }
    },

    dec(set) {
        switch(set) {
            case 0: if (this.rowsCount-1 >= MIN_MAP_SIZE)   this.rowsCount--; return true;
            case 1: if (this.colsCount-1 >= MIN_MAP_SIZE)   this.colsCount--; return true;
            case 2: if (this.speed-1     >= MIN_SPEED_SIZE) this.speed--    ; return true;
            case 3: if (this.winLength-1 >= MIN_WIN_SIZE)   this.winLength--; return true;
        }
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

    walls(point = walls.body) {
        point.forEach((point) => {
            this.cells[`x${point.x}_y${point.y}`].classList.add('wall');
        })
    },

    clear() {
        for (let key of Object.getOwnPropertyNames(this.cells)) {
            this.cells[key].className = 'cell';
        }
    },

    objects(snakePoint, foodPoint, walls) {
        this.clear();
        this.snake(snakePoint);
        this.food(foodPoint);
        this.walls(walls);
    },

    settings() {
        let table = document.getElementById('settings');
        table.innerHTML = '';
        let settings = [
            {name: 'Number of rows',    value: game.config.rowsCount},
            {name: 'Number of columns', value: game.config.colsCount},
            {name: 'Speed',             value: game.config.speed    },
            {name: 'Winning length',    value: game.config.winLength}
        ];

        settings.forEach(function(i, idx) {
            let row = document.createElement('tr');
                let col = document.createElement('td');
                    col.innerText = i.name;
                    row.appendChild(col);
                col = document.createElement('td');
                    col.setAttribute('onclick','game.config.inc(' + idx + '); game.render.settings()');
                    col.className = 'button';
                    col.innerText = '+';
                    row.appendChild(col);
                col = document.createElement('td');
                    col.setAttribute('onclick','game.config.dec(' + idx + '); game.render.settings()');
                    col.className = 'button';
                    col.innerText = '-';
                    row.appendChild(col);
                col = document.createElement('td');
                    col.innerText = i.value;
                    row.appendChild(col);
            table.appendChild(row);
        });
    },

    score(len = snake.body.length) {
        let table = document.getElementById('score');
        table.innerHTML = '';

        let tr = document.createElement('tr');
            let td = document.createElement('td');
                td.innerText = 'Snake length:';
            tr.appendChild(td);
                td = document.createElement('td');
                td.innerText = len + `/${config.winLength}`;
            tr.appendChild(td);
        table.appendChild(tr);
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
            render.score();
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

    isMovePossible(point = this.body[0]) {
        let x = this.getMovePoint(point).x;
        let y = this.getMovePoint(point).y;

        return (
                // checking for grid borders
            x <= game.config.colsCount-1 &&
            y <= game.config.rowsCount-1 &&
            x >= 0                       &&
            y >= 0                       &&

                // checking for walls
            render.cells[`x${x}_y${y}`].getAttribute('class').indexOf('wall') < 0 &&

                // checking for snake body
            render.cells[`x${x}_y${y}`].getAttribute('class').indexOf('snakeBody') < 0
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
        let exclude = [...snake.body, this.point, ...walls.body];
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

let walls = {
    body: [],

    buildWall(point) {
        this.body.push(point);
    },

    buildLine(point1, point2) {
        if (point1.x !== point2.x && point1.y !== point2.y) {
            console.log('This function only builds in straight lines because Im a dumbass who cant figure diagonals out');
            return false;
        }

        if (point1.x < point2.x) {
            for (let i = 0; i < point2.x - point1.x; i++) {
                this.buildWall({x:point1.x+i, y:point1.y})
            }
        }
        if (point1.x > point2.x) {
            for (let i = 0; i < point1.x - point2.x; i++) {
                this.buildWall({x:point2.x+i, y:point2.y})
            }
        }
        if (point1.y < point2.y) {
            for (let i = 0; i < point2.y - point1.y; i++) {
                this.buildWall({x:point1.x, y:point1.y+i})
            }
        }
        if (point1.y > point2.y) {
            for (let i = 0; i < point1.y - point2.y; i++) {
                this.buildWall({x:point2.x, y:point2.y+i})
            }
        }
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
    },

    isFinished() {
        return this.condition === 'finished';
    }
};

/*
        TODO - Object multiCell
    add multi-cell object as a final goal for the snake to draw
    drawing is performed when the snake's tail reaches a cell, required for completion
    the tail is cut off, but it stays in that cell, coloring it gray as walled off and no longer accessible
 */

/*
        TODO - Object settings
    add a settings window to the left of snake grid
    it is placed in #game-wrap before #game
    one will see there all the options with <+> and <-> by them
    pressing the buttons will change the values displayed for each configuration field
    at the bottom there should be an <Apply> button that triggers <game.init()> with user-selected arguments
    main init() function renders and should be called in game.init()
    the buttons are disabled while the game is running or paused
    (only enabled when state.condition === 'finished', which it is by default after game.init())
 */

/*
        TODO - Object score
    add score table to the right of snake grid
    it is placed in #game-wrap after #game
    this one is pretty much self-explanatory
    main init() function renders and should be called in game.init()
 */

let game = {
    config,
    render,
    snake,
    food,
    state,
    walls,

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
        if (game.state.isPlaying()) {
            this.stop();
        } else if (game.state.isStopped()) {
            this.play();
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
                    '<table id="settings" class="popup-window"></table>' +
                    '<div id="game-div">' +
                        '<table id="game"></table>' +
                        '<div id="menu">' +
                            '<div id="playButton" class="menuButton" onclick="game.playButton()">Старт</div>' +
                            '<div id="newGame"    class="menuButton" onclick="game.stop(); game.init()">Новая игра</div>' +
                        '</div>' +
                    '</div>' +
                    '<table id="score" class="popup-window"></table>' +
                '</div>';
            document.body.insertAdjacentHTML('beforeend', gameDivs);
        }

        this.snake.init(this.getSnakeStartPoint(),"up");
        this.food.generate();
        this.state.set.stop();
        document.addEventListener('keydown', () => this.keyDownHandler(event));

        this.render.settings();
        this.render.score();
        this.render.map();
        this.render.objects();
    },

    play() {
        this.state.set.play();
        this.tick = setInterval(function() {
            game.snake.move();
            game.render.objects();
        }, Math.floor(1000/this.config.speed));
        let playText = document.getElementById('playButton');
        playText.innerText = 'Стоп';
    },

    stop() {
        this.state.set.stop();
        clearInterval(this.tick);
        let playText = document.getElementById('playButton');
        playText.innerText = 'Начать';
    },

    finish() {
        this.state.set.finish();
        clearInterval(this.tick);
        let playText = document.getElementById('playButton');
        playText.innerText = 'Конец';
    }
};

//- main -\\ ---------------------------------------------------------------------------------------------------------\\

addCss("styles/lessons/7.css");
window.onload = function () {
    game.init({speed: 4});
};
