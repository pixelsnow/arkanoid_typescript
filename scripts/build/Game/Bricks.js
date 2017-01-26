define(["require", "exports", "./Brick", "./Constants"], function (require, exports, Brick_1, Constants_1) {
    "use strict";
    /**
     * Класс массива кирпичиков
     */
    var Bricks = (function () {
        /**
         * Конструктор
         */
        function Bricks(levelNum) {
            this.pattern = new Array; //объявить массив
            if (levelNum == 1) {
                this.init1(); //заполнить в порядке, соотв. уровню
            }
            else if (levelNum == 2) {
                this.init2();
            }
        }
        /**
         * Уровень 1
         */
        Bricks.prototype.init1 = function () {
            var brickW = (Constants_1.WIDTH - Constants_1.PADDING * 2) / 6;
            var brickH = Constants_1.PADDING * 2;
            var i;
            for (i = 0; i < 3; i++) {
                this.pattern[i] = new Brick_1.default(Constants_1.PADDING + (i % 6) * brickW + brickW / 2, Constants_1.PADDING + (Math.floor(i / 6)) * brickH + brickH / 2, brickH - 8, brickW - 8, 4 - Math.floor(i / 6));
            }
        };
        /**
         * Уровень 2
         */
        Bricks.prototype.init2 = function () {
            var brickW = (Constants_1.WIDTH - Constants_1.PADDING * 2) / 8;
            var brickH = brickW / 2;
            var i;
            for (i = 0; i < 24; i++) {
                this.pattern[i] = new Brick_1.default(Constants_1.PADDING + (i % 8) * brickW + brickW / 2, Constants_1.PADDING + (Math.floor(i / 8)) * brickH + brickH / 2, brickH - 8, brickW - 8, 3 - Math.floor(i / 8));
            }
        };
        /**
         * Функция рендера кирпичиков
         */
        Bricks.prototype.draw = function (context) {
            this.pattern.forEach(function (b) { return b.draw(context); } //вызов ф-и рендера для каждого элемента массива
            );
        };
        return Bricks;
    }());
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = Bricks;
});
//# sourceMappingURL=Bricks.js.map