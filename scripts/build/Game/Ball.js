/**
 * класс мяч
 */
define(["require", "exports", "./Constants"], function (require, exports, Constants_1) {
    "use strict";
    //import Velocity from './Velocity';
    var Ball = (function () {
        /**
         *
         */
        function Ball(racket, bounceFrom, onOut, brickHit) {
            this.racket = racket;
            this.bounceFrom = bounceFrom;
            this.onOut = onOut;
            this.brickHit = brickHit;
            this.x = 0;
            this.y = 0;
            this.dx = 0;
            this.dy = 0;
            this.speed = 8;
            this.radius = 15;
            this.active = true;
            this.reset();
        }
        Ball.prototype.reset = function () {
            this.x = Constants_1.WIDTH / 2;
            this.y = Constants_1.HEIGHT / 2;
            this.dx = 0;
            this.dy = 0;
            this.active = true;
            this.launch();
        };
        /**
         * запускает мяч
         */
        Ball.prototype.launch = function () {
            var angle = Math.random() * Math.PI * 2;
            this.dx = Math.cos(angle);
            this.dy = Math.sin(angle);
        };
        Ball.prototype.disable = function () {
            this.active = false;
        };
        Ball.prototype.isActive = function () {
            return this.active;
        };
        /**
         *
         */
        Ball.prototype.setPosition = function (newX, newY) {
            this.x = newX;
            this.y = newY;
        };
        Ball.prototype.flipX = function () {
            this.dx *= -1;
        };
        Ball.prototype.flipY = function () {
            this.dy *= -1;
        };
        Ball.prototype.getX = function () {
            return this.x;
        };
        Ball.prototype.getY = function () {
            return this.y;
        };
        Ball.prototype.getR = function () {
            return this.radius;
        };
        Ball.prototype.getnextX = function () {
            return (this.x + this.dx * this.speed);
        };
        Ball.prototype.getnextY = function () {
            return (this.y + this.dy * this.speed);
        };
        Ball.prototype.modulate = function () {
            if (Math.abs(this.dx) <= 0.8) {
                return;
            }
            else {
                if (this.dx >= 0) {
                    this.dx = 0.8;
                }
                else {
                    this.dx = -0.8;
                }
                this.scaleD();
            }
        };
        Ball.prototype.scaleD = function () {
            var supposed1 = this.dx * this.dx + this.dy * this.dy;
            var coeffD = Math.sqrt(1 / supposed1);
            this.dx = this.dx * coeffD;
            this.dy = this.dy * coeffD;
        };
        Ball.prototype.update = function () {
            var _this = this;
            this.modulate();
            var nextX = this.x + this.dx * this.speed;
            var nextY = this.y + this.dy * this.speed;
            /**
             * Обработать удары по кирпичикам и стенкам
             */
            this.bounceFrom.forEach(function (rect) {
                if (rect.isActive() == false) {
                    return;
                }
                //обработка ударов блока слева или справа
                if ((Math.abs(nextX - rect.getX()) <= (_this.radius + rect.getW() / 2)) &&
                    (Math.abs(nextX - rect.getX()) > (rect.getW() / 2)) &&
                    (Math.abs(nextY - rect.getY()) < (_this.radius + rect.getH() / 2))) {
                    console.log('side hit', rect.getX(), rect.getY());
                    _this.flipX();
                    if (rect.hit()) {
                        _this.brickHit();
                    }
                }
                else if ((Math.abs(nextY - rect.getY()) <= (_this.radius + rect.getH() / 2)) &&
                    (Math.abs(nextY - rect.getY()) > (rect.getH() / 2)) &&
                    (Math.abs(nextX - rect.getX()) < (_this.radius + rect.getW() / 2))) {
                    console.log('top/bottom hit', rect.getX(), rect.getY());
                    _this.flipY();
                    if (rect.hit()) {
                        _this.brickHit();
                    }
                }
            });
            /**
             * Обработать удары по ракетке
             */
            var xDiff = (nextX - this.racket.getX());
            var xDiffMax = (this.radius + this.racket.getW() / 2);
            if (((this.racket.getY() - nextY) < (this.racket.getH() / 2 + this.radius)) &&
                (Math.abs(xDiff) < xDiffMax)) {
                var coeff = 1 / xDiffMax; //коэффициент, на который домножим xDiff, чтобы он был меньше 1
                this.dx = xDiff * coeff + this.dx; //новый dx, но он может быть немного больше 1
                this.scaleD();
                this.flipY();
            }
            /**
             * установить новые координаты мячу
             */
            this.x = nextX;
            this.y = nextY;
            /**
             * Если мяч вылетел за пределы поля, вызвать соотв ф-ю
             */
            if (this.y > (Constants_1.HEIGHT)) {
                this.onOut();
            }
        };
        Ball.prototype.draw = function (context) {
            if (!this.active)
                return;
            context.strokeStyle = '#25afea';
            context.lineWidth = 1;
            context.beginPath();
            context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            context.fillStyle = '#25afea';
            context.fill();
            //        context.stroke();
        };
        return Ball;
    }());
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = Ball;
});
//# sourceMappingURL=Ball.js.map