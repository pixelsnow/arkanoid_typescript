/**
 *
 * Класс обработчиков управления
 *
 */
define(["require", "exports"], function (require, exports) {
    "use strict";
    var Controllers = (function () {
        //добавляем слушатели событий
        function Controllers(canvas) {
            var _this = this;
            this.cursorX = 0; //координата х курсора
            this.canvas = canvas;
            canvas.addEventListener("mousemove", function (event) {
                _this.handleMouseMove(event);
            });
        }
        /**
         * Геттеры
         */
        //геттер для курсора
        Controllers.prototype.getMousePosition = function () {
            return this.cursorX;
        };
        /**
         * Обработчики событий
         */
        Controllers.prototype.handleMouseMove = function (event) {
            this.cursorX = event.clientX - this.canvas.offsetLeft;
        };
        return Controllers;
    }());
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = Controllers;
});
//# sourceMappingURL=Controllers.js.map