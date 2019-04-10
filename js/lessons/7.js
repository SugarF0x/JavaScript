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
    rowsCount: 21,
    colsCount: 21,
    speed: 7,
    winLength: 25,
    eatWall: false,
    nazi: false,

    validate() {
        if (this.rowsCount < MIN_MAP_SIZE   || this.rowsCount > MAX_MAP_SIZE) {
            console.error("10 < rowsCount < 30");
            return false;
        }

        if (this.colsCount < MIN_MAP_SIZE   || this.colsCount > MAX_MAP_SIZE) {
            console.error("10 < colsCount < 30");
            return false;
        }

        if (this.speed     < MIN_SPEED_SIZE || this.speed     > MAX_SPEED_SIZE) {
            console.error("1 <= speed <= 10");
            return false;
        }

        if (this.winLength < MIN_WIN_SIZE   || this.winLength > MAX_WIN_SIZE) {
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
    },

    swapBool(bool) {
        return !bool;
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

    walls(point = wall.body) {
        point.forEach((point) => {
            this.cells[`x${point.x}_y${point.y}`].classList.add('wall');
        })
    },

    nazi(point = nazi.body) {
        if (config.nazi) point.forEach((point) => {
            this.cells[`x${point.x}_y${point.y}`].classList.add('nazi');
        })
    },

    clear() {
        for (let key of Object.getOwnPropertyNames(this.cells)) {
            this.cells[key].className = 'cell';
        }
    },

    objects(snakePoint, foodPoint, walls, nazi) {
        this.clear();
        this.snake(snakePoint);
        this.food(foodPoint);
        this.walls(walls);
        this.nazi(nazi);
    },

    settings() {
        let table = document.getElementById('settings');
        table.innerHTML = '';
        let settings = [
            {name: 'Количество рядов',  value: config.rowsCount},
            {name: 'Количество колонн', value: config.colsCount},
            {name: 'Скорость',          value: config.speed    },
            {name: 'Необходимая длина', value: config.winLength}
        ];

            // Main config variables
        settings.forEach(function(i, idx) {
            let row = document.createElement('tr');
                let col = document.createElement('td');
                    col.innerText = i.name;
                    row.appendChild(col);
                col = document.createElement('td');
                    let but = document.createElement('button');
                        but.setAttribute('onclick','config.inc(' + idx + '); render.settings()');
                        but.className = 'button';
                        but.innerText = '+';
                        col.appendChild(but);
                    row.appendChild(col);
                col = document.createElement('td');
                        but = document.createElement('button');
                        but.setAttribute('onclick','config.dec(' + idx + '); render.settings()');
                        but.className = 'button';
                        but.innerText = '-';
                        col.appendChild(but);
                    row.appendChild(col);

                col = document.createElement('td');
                    col.innerText = i.value;
                    row.appendChild(col);
            table.appendChild(row);
        });

            // eatWall checkbox
        let row = document.createElement("tr");
            let col = document.createElement('td');
                col.innerText = 'Стены на еде';
            row.appendChild(col);
            col = document.createElement('td');
            row.appendChild(col);
            col = document.createElement('td');
            row.appendChild(col);
            col = document.createElement('td');
                let isChecked = '';
                if (config.eatWall) isChecked = "checked";
                col.innerHTML = `<input type="checkbox" onclick="config.eatWall = config.swapBool(config.eatWall);" ${isChecked}>`;
            row.appendChild(col);
        table.appendChild(row);

            // nazi checkbox
        row = document.createElement("tr");
            col = document.createElement('td');
                col.innerText = '卐';
                row.appendChild(col);
            col = document.createElement('td');
            row.appendChild(col);
            col = document.createElement('td');
            row.appendChild(col);
            col = document.createElement('td');
                isChecked = '';
                if (config.nazi) isChecked = "checked";
                col.innerHTML = `<input type="checkbox" onclick="config.nazi = config.swapBool(config.nazi);" ${isChecked}>`;
            row.appendChild(col);
        table.appendChild(row);

            // Apply button
        row = document.createElement("tr");
            col = document.createElement('td');
                col.setAttribute('colspan', "4");
                col.innerHTML = '<button class="button" onclick="game.init()" style="width: 100%;">Применить</button>';
            row.appendChild(col);
        table.appendChild(row);
    },

    score(len = snake.body.length) {
        let table = document.getElementById('score');
        table.innerHTML = '';

        let tr = document.createElement('tr');
            let td = document.createElement('td');
                td.innerText = 'Длина змейки:';
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
            state.set.finish();
            game.finish();
            return false;
        }

        if (this.eat()) {
            food.generate();
            this.body.unshift(this.getMovePoint());
            render.score();
            if (config.eatWall) wall.buildWall(this.body[1])
        } else {
            this.body.unshift(this.getMovePoint());
            this.body.pop();
        }

        if (config.nazi && snake.body.length > 1) {
            let point = snake.body[snake.body.length-1];
            let isNaziCrossed = nazi.body.some(function(elem) {
                return point.x === elem.x && point.y === elem.y;
            });
            if (isNaziCrossed) {
                wall.buildWall(point);
                snake.body.shift();
                render.score();
            }
        }
    },

    eat() {
        return JSON.stringify(snake.body[0]) === JSON.stringify(food.point);
    },

    changeDirection(direct) {
        if (['up','right','down','left'].includes(direct)) this.direction = direct;
    },

    isMovePossible(point = this.body[0]) {
        let x = this.getMovePoint(point).x;
        let y = this.getMovePoint(point).y;

        return (
                // checking for grid borders
            x <= config.colsCount-1 &&
            y <= config.rowsCount-1 &&
            x >= 0                  &&
            y >= 0                  &&

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
        let exclude = [...snake.body, this.point, ...wall.body];
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

let wall = {
    body: [],

    clear() {
        this.body = [];
    },

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

let nazi = {
    center: null,
    body: [],

    generate() {
        this.center = {x: random(3,config.colsCount-4), y: random(3,config.rowsCount-4)};
        this.body = [
            {x: this.center.x-2, y: this.center.y-2},                                           {x: this.center.x, y: this.center.y-2}, {x: this.center.x+1, y: this.center.y-2}, {x: this.center.x+2, y: this.center.y-2},
            {x: this.center.x-2, y: this.center.y-1},                                           {x: this.center.x, y: this.center.y-1},
            {x: this.center.x-2, y: this.center.y  }, {x: this.center.x-1, y: this.center.y  }, {x: this.center.x, y: this.center.y  }, {x: this.center.x+1, y: this.center.y  }, {x: this.center.x+2, y: this.center.y  },
                                                                                                {x: this.center.x, y: this.center.y+1},                                           {x: this.center.x+2, y: this.center.y+1},
            {x: this.center.x-2, y: this.center.y+2}, {x: this.center.x-1, y: this.center.y+2}, {x: this.center.x, y: this.center.y+2},                                           {x: this.center.x+2, y: this.center.y+2}
        ];
    },

    clear() {
        this.body = [];
    },

    isFilled() {
        let filled = 0;
        for (let i = 0; i < this.body.length; i++) {
            if (render.cells[`x${this.body[i].x}_y${this.body[i].y}`].classList.contains('wall')) {
                filled++;
            }
        }
        return filled === this.body.length;
    }
};

let game = {
    tick: null,

    getSnakeStartPoint() {
        return {
            x: Math.floor(config.colsCount / 2),
            y: Math.floor(config.rowsCount / 2)
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
        if (direction !== "NaD" && snake.isDirChangeable(direction)) {
            snake.changeDirection(direction);
        }
    },

    playButton() {
        if (state.isPlaying()) {
            this.stop();
        } else if (state.isStopped()) {
            this.play();
        }
    },

    init(userConfig = {}) {
        Object.assign(config, userConfig);
        if (!config.validate()) {
           return false;
        }

        if (document.getElementById('game-wrap') === null) {
            let gameDivs =
                '<div id="game-wrap">' +
                    '<table id="settings" class="popup-window"></table>' +
                    '<div id="game-div">' +
                        '<table id="game"></table>' +
                        '<div id="menu">' +
                        '<div id="playButton" class="menuButton" onclick="game.playButton()"       >Начать    </div>' +
                        '<div id="newGame"    class="menuButton" onclick="game.stop(); game.init()">Новая игра</div>' +
                    '</div>' +
                    '</div>' +
                    '<div id="game-div-ghost">' +
                        '<table id="game"></table>' +
                        '<div id="menu">' +
                            '<div id="playButton" class="menuButton" style="cursor:default">Начать    </div>' +
                            '<div id="newGame"    class="menuButton" style="cursor:default">Новая игра</div>' +
                        '</div>' +
                    '</div>' +
                    '<table id="score" class="popup-window"></table>' +
                '</div>';
            document.body.insertAdjacentHTML('beforeend', gameDivs);
        }

        snake.init(this.getSnakeStartPoint(),"up");
        wall.clear();
        if (config.nazi) {
            nazi.clear();
            nazi.generate();
        }
        food.generate();
        state.set.stop();
        document.addEventListener('keydown', () => this.keyDownHandler(event));

        render.settings();
        render.score();
        render.map();
        render.objects();
    },

    play() {
        state.set.play();
        this.tick = setInterval(function() {
            snake.move();
            render.objects();
            if (snake.body.length === config.winLength) {
                render.objects();
                game.finish();
                alert('gg wp');
            }
            if (config.nazi && nazi.isFilled()) {
                render.objects();
                game.finish();
                let audio = new Audio('src/music/Ukraine.mp3');
                audio.play();
            }
        }, Math.floor(1000/config.speed));
        let playText = document.getElementById('playButton');
        playText.innerText = 'Стоп';
    },

    stop() {
        state.set.stop();
        clearInterval(this.tick);
        let playText = document.getElementById('playButton');
        playText.innerText = 'Начать';
    },

    finish() {
        state.set.finish();
        clearInterval(this.tick);
        let playText = document.getElementById('playButton');
        playText.innerText = 'Конец';
    }
};

//- main -\\ ---------------------------------------------------------------------------------------------------------\\

addCss("styles/lessons/7.css");
window.onload = function () {
    game.init();
};
