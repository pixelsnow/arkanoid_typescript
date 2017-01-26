define(["require", "exports", "./Bricks", "./Ball", "./Paddle", "./Controllers", "./Score", "./Borders", "./Lives", "./Constants"], function (require, exports, Bricks_1, Ball_1, Paddle_1, Controllers_1, Score_1, Borders_1, Lives_1, Constants_1) {
    "use strict";
    /**
     * Модуль инициализации игры
     */
    ;
    /**
     * Возможные состояния игры
     */
    var GameState;
    (function (GameState) {
        GameState[GameState["Reset"] = 0] = "Reset";
        GameState[GameState["Ready"] = 1] = "Ready";
        GameState[GameState["Playing"] = 2] = "Playing";
        GameState[GameState["Lost"] = 3] = "Lost";
        GameState[GameState["Win"] = 4] = "Win";
    })(GameState || (GameState = {}));
    /**
     * Класс игры
     */
    var Game = (function () {
        /**
         * Конструктор: что происходит при создании новой игры
         */
        function Game() {
            //устанавливаем холст
            this.state = GameState.Reset; //текущее состояние игры
            this.gameObjects = []; //массив, хранящий все физические объекты игры
            this.ballBounce = []; //массив, хранящиц все объекты игры, от которых отскакивает мяч
            this.canvas = document.getElementById('draw-canvas');
            if (!this.canvas) {
                return;
            }
            //инициализирует управление на канвасе
            this.controls = new Controllers_1.default(this.canvas);
            //инициализируем счёт и передаём туда имя HTML элемента, куда ходим отображать его
            this.score = new Score_1.default("score");
            //инициализируем счёт жизней и передаём туда имя HTML элемента, куда ходим отображать его
            this.playerLives = new Lives_1.default(3, "lives");
            //инициализируем основные параметры
            this.paddle = new Paddle_1.default();
            this.bricks = new Bricks_1.default(1);
            this.borders = new Borders_1.default(1);
            //создаём мяч и массив объектов, от которых он будет отскакивать
            this.ballBounce = this.ballBounce.concat(this.bricks.pattern, this.borders.pattern);
            this.ball = new Ball_1.default(this.paddle, this.ballBounce, this.ballOut.bind(this), this.brickHit.bind(this));
            //создаём массив всех объектов на поле
            this.gameObjects = this.gameObjects.concat(this.ball, this.paddle, this.bricks.pattern, this.borders.pattern);
            //инициализируем контекст
            this.context = this.canvas.getContext('2d');
            console.log('created');
            //игра в готовом состоянии
        }
        /**
         * начинаем новую игру
         */
        Game.prototype.reset = function () {
            this.ball.reset();
            this.paddle.reset();
            this.state = GameState.Ready;
        };
        Game.prototype.play = function () {
            console.log('started play');
            this.reset();
            console.log('first reset');
            this.gameLoop();
            console.log('after loop');
        };
        Game.prototype.startGame = function () {
            this.ball.launch();
            this.state = GameState.Playing;
            console.log('startGame()');
        };
        Game.prototype.bricksLeft = function () {
            var i = 0;
            var lim = this.bricks.pattern.length;
            for (i = 0; i < lim; i++) {
                if (this.bricks.pattern[i].isActive()) {
                    return true;
                }
            }
            return false;
        };
        Game.prototype.gameLoop = function () {
            var _this = this;
            switch (this.state) {
                case GameState.Playing:
                    {
                        /**
                         * считываем позицию мышки
                         */
                        this.paddle.setX(this.controls.getMousePosition());
                        /**
                         * проверяем на наличие столкновений шарика с чем-либо
                         */
                        this.gameObjects.forEach(function (obj) { return obj.update(); });
                        /**
                         * рендерим всё на холст
                         */
                        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
                        this.gameObjects.forEach(function (obj) { return obj.draw(_this.context); });
                        this.context.restore();
                        if (!this.bricksLeft()) {
                            this.state = GameState.Win;
                        }
                        break;
                    }
                case GameState.Lost:
                    {
                        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
                        this.context.font = "50px Helvetica";
                        this.context.fillStyle = "#e04f35";
                        this.context.textAlign = "center";
                        this.context.fillText("GAME OVER :(", Constants_1.WIDTH / 2, Constants_1.HEIGHT / 2);
                        this.context.font = "20px Helvetica";
                        this.context.fillStyle = "#25afea";
                        this.context.fillText("you got " + this.score.getN().toString() + " points!", Constants_1.WIDTH / 2, Constants_1.HEIGHT / 2 + 50);
                        this.context.restore();
                        break;
                    }
                case GameState.Ready:
                    {
                        this.startGame();
                        break;
                    }
                case GameState.Reset:
                    {
                        this.reset();
                        break;
                    }
                case GameState.Win:
                    {
                        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
                        this.context.font = "50px Helvetica";
                        this.context.fillStyle = "#9ae21d";
                        this.context.textAlign = "center";
                        this.context.fillText("WOW! YOU WIN:)", Constants_1.WIDTH / 2, Constants_1.HEIGHT / 2);
                        this.context.font = "20px Helvetica";
                        this.context.fillStyle = "#25afea";
                        this.context.fillText("you got " + this.score.getN().toString() + " points!", Constants_1.WIDTH / 2, Constants_1.HEIGHT / 2 + 50);
                        this.context.restore();
                        break;
                    }
                default:
                    {
                        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
                        this.context.font = "30px Helvetica";
                        this.context.fillStyle = "red";
                        this.context.textAlign = "center";
                        this.context.fillText("ERROR", Constants_1.WIDTH / 2, Constants_1.HEIGHT / 2);
                        this.context.restore();
                        break;
                    }
            }
            requestAnimationFrame(function () { return _this.gameLoop(); });
        };
        /**
         * выполняется, когда мяч вылетает за пределы поля
         */
        Game.prototype.ballOut = function () {
            this.ball.disable(); //перестать отображать мяч
            this.playerLives.minus(); //отнять одну жизнь
            if (this.playerLives.getNum() == 0) {
                this.state = GameState.Lost;
            }
            else {
                this.reset(); //начать игру заново
            }
        };
        Game.prototype.brickHit = function () {
            this.score.add();
        };
        return Game;
    }());
    /**
     * Модуль
     */
    function main() {
        var myGame = new Game();
        myGame.play();
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = main;
});
//# sourceMappingURL=index.js.map