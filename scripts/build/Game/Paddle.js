var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "./GameObject", "./Constants"], function (require, exports, GameObject_1, Constants_1) {
    "use strict";
    /**
     * Класс платформы
     */
    var Paddle = (function (_super) {
        __extends(Paddle, _super);
        /**
         * Конструктор :  используем конструктор родительского класса
         */
        function Paddle() {
            return _super.call(this, 0, 0, Constants_1.PADDING, Constants_1.WIDTH / 6) || this;
        }
        Paddle.prototype.reset = function () {
            this.x = Constants_1.WIDTH / 2;
            this.y = Constants_1.HEIGHT - this.height / 2;
        };
        /**
         * Функция обновления. Возвращаемая ложь означает, что столкновение никак не повлияло на этот объект
         */
        Paddle.prototype.update = function () {
        };
        /**
         * Функция рендеринга
         */
        Paddle.prototype.draw = function (context) {
            context.strokeStyle = '#333333';
            context.beginPath();
            context.moveTo(this.x - this.width / 2, this.y);
            context.lineWidth = this.height;
            context.lineTo(this.x + this.width / 2, this.y);
            context.stroke();
            context.restore();
        };
        return Paddle;
    }(GameObject_1.Rectangle));
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = Paddle;
});
//# sourceMappingURL=Paddle.js.map