/**
 * Класс, хранящий счёт
 */
define(["require", "exports"], function (require, exports) {
    "use strict";
    var Score = (function () {
        /**
         * конструктор
         */
        function Score(tagName) {
            this.num = 0; //счёт
            this.block = document.getElementById(tagName); //специфицируем блок страницы
            this.updateElement(); //обновляем счёт на странице
        }
        Score.prototype.getN = function () {
            return this.num;
        };
        /**
         * функция прибавления счёта на 1
         */
        Score.prototype.add = function () {
            this.num += 1; //обновить номер
            this.updateElement(); //обновить текст на веб-странице
        };
        /**
         * функция одновления текста на веб-странице
         */
        Score.prototype.updateElement = function () {
            this.block.innerHTML = this.num.toString(); //записываем в параграф счёт в виде строки
        };
        return Score;
    }());
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = Score;
});
//# sourceMappingURL=Score.js.map