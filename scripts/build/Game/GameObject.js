/**
 * Интерфейс для игровых объектов, которые будут рендериться
 */
define(["require", "exports"], function (require, exports) {
    "use strict";
    /**
     * Класс прямоугольника : дочерними классами будут кирпичики, платформа, стены
     */
    var Rectangle = (function () {
        //конструктор по основным параметрам
        function Rectangle(x, y, h, w) {
            this.active = true;
            this.x = x;
            this.y = y;
            this.width = w;
            this.height = h;
            this.hittable = false;
        }
        //геттеры и сеттеры
        Rectangle.prototype.getW = function () { return this.width; };
        Rectangle.prototype.getH = function () { return this.height; };
        Rectangle.prototype.getX = function () { return this.x; };
        Rectangle.prototype.getY = function () { return this.y; };
        Rectangle.prototype.isActive = function () { return this.active; };
        Rectangle.prototype.hit = function () { return false; };
        Rectangle.prototype.setX = function (newX) { this.x = newX; };
        Rectangle.prototype.setY = function (newY) { this.y = newY; };
        //ф-я обновления на очередной итерации
        Rectangle.prototype.update = function () {
        };
        //ф-я рендеринга
        Rectangle.prototype.draw = function (context) { };
        ;
        return Rectangle;
    }());
    exports.Rectangle = Rectangle;
});
//# sourceMappingURL=GameObject.js.map