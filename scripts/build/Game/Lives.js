/**
 * Класс, хранящий кол-во жизней игрока
 */
define(["require", "exports"], function (require, exports) {
    "use strict";
    var Lives = (function () {
        /**
         * Конструктор
         */
        function Lives(n, tagName) {
            this.res = ''; //строка, которая будет отображаться
            this.num = n; //устанавливаем кол-во
            this.block = document.getElementById(tagName); //устанавливаем блок
            this.updateElement(); //обновляем текст
        }
        /**
         * Возвращает кол-во жизней
         */
        Lives.prototype.getNum = function () {
            return this.num;
        };
        /**
         * Уменьшает кол-во жизней на 1
         */
        Lives.prototype.minus = function () {
            this.num = this.num - 1; //изменяет число
            this.res = this.res.slice(1, this.res.length); //изменяет строку-результат, отрезая одно сердечко
            this.updateElement(); //обновляет веб-страницу
        };
        /**
         * Обновляет блок на веб-странице в соответствии со счётом
         */
        Lives.prototype.updateElement = function () {
            this.res = '';
            for (var i = 0; i < this.num; i++) {
                this.res = this.res.concat(String.fromCharCode(10084)); //присоединить к строке по сердечку
            }
            this.block.innerHTML = this.res; //записать строку в блок
        };
        return Lives;
    }());
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = Lives;
});
//# sourceMappingURL=Lives.js.map