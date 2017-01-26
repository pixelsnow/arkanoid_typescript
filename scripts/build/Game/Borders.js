/**
 * Модуль стенок
 */
define(["require", "exports", "./Border", "./Constants"], function (require, exports, Border_1, Constants_1) {
    "use strict";
    var Borders = (function () {
        function Borders(levelNum) {
            this.pattern = new Array;
            this.initWalls();
            if (levelNum == 1) {
                this.init1();
            }
            else if (levelNum == 2) {
                this.init2();
            }
        }
        Borders.prototype.initWalls = function () {
            this.pattern[0] = new Border_1.default(Constants_1.WIDTH - Constants_1.PADDING / 2, Constants_1.HEIGHT / 2, Constants_1.HEIGHT, Constants_1.PADDING);
            this.pattern[1] = new Border_1.default(Constants_1.PADDING / 2, Constants_1.HEIGHT / 2, Constants_1.HEIGHT, Constants_1.PADDING);
            this.pattern[2] = new Border_1.default(Constants_1.WIDTH / 2, Constants_1.PADDING / 2, Constants_1.PADDING, Constants_1.WIDTH - Constants_1.PADDING * 2);
        };
        Borders.prototype.init1 = function () {
            //        let brickW = ( WIDTH - PADDING * 2) / 6;
            //    let brickH = PADDING;
            //      this.pattern[3] = new Border( PADDING + brickW / 2, PADDING + brickH * 8.5, brickH, brickW);
            //       this.pattern[4] = new Border( WIDTH - PADDING - brickW / 2, PADDING + brickH * 8.5 , brickH, brickW);
        };
        Borders.prototype.init2 = function () {
            var brickW = (Constants_1.WIDTH - Constants_1.PADDING * 2) / 8;
            var brickH = brickW / 2;
            this.pattern[3] = new Border_1.default(Constants_1.PADDING + brickW / 2, Constants_1.PADDING + brickH * 3.5, brickH - 8, brickW - 8);
            this.pattern[4] = new Border_1.default(Constants_1.WIDTH - Constants_1.PADDING - brickW / 2, Constants_1.PADDING + brickH * 3.5, brickH - 8, brickW - 8);
        };
        Borders.prototype.draw = function (context) {
            this.pattern.forEach(function (b) { return b.draw(context); });
        };
        return Borders;
    }());
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = Borders;
});
//# sourceMappingURL=Borders.js.map