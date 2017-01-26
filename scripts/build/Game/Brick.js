var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "./GameObject"], function (require, exports, GameObject_1) {
    "use strict";
    /**
     * Класс кирпичика
     */
    var Brick = (function (_super) {
        __extends(Brick, _super);
        function Brick(x, y, h, w, lives) {
            var _this = _super.call(this, x, y, h, w) || this;
            if (lives == 0) {
                _this.active = false;
            }
            _this.lives = lives;
            return _this;
        }
        /**
         * возвращает правду, если у кирпичика была отнята жизнь
         */
        Brick.prototype.hit = function () {
            this.lives = this.lives - 1;
            return true;
        };
        /**
         * функция обновления кирпичиков
         */
        Brick.prototype.update = function () {
            if (this.lives == 0) {
                this.active = false;
            }
        };
        /**
         * функция рендера кирпичиков
         */
        Brick.prototype.draw = function (context) {
            if (!this.active)
                return;
            context.beginPath();
            context.moveTo(this.x - this.width / 2, this.y);
            //в зависимости от кол-ва жизней выбрать цвет
            switch (this.lives) {
                case 1: {
                    context.strokeStyle = '#9ae21d';
                    break;
                }
                case 2: {
                    context.strokeStyle = '#e8e129';
                    break;
                }
                case 3: {
                    context.strokeStyle = '#ed9d1c';
                    break;
                }
                case 4: {
                    context.strokeStyle = '#e04f35';
                    break;
                }
                default: {
                    context.strokeStyle = '#666666';
                }
            }
            ;
            context.lineWidth = this.height;
            context.lineTo(this.x + this.width / 2, this.y);
            context.stroke();
        };
        return Brick;
    }(GameObject_1.Rectangle));
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = Brick;
});
//# sourceMappingURL=Brick.js.map