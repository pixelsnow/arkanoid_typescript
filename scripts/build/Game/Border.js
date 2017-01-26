/**
 * Модуль элемента стенок-преград
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "./GameObject"], function (require, exports, GameObject_1) {
    "use strict";
    var Border = (function (_super) {
        __extends(Border, _super);
        function Border(x, y, h, w) {
            var _this = _super.call(this, x, y, h, w) || this;
            _this.reset();
            return _this;
        }
        Border.prototype.reset = function () {
        };
        Border.prototype.update = function () {
        };
        Border.prototype.draw = function (context) {
            context.beginPath();
            context.moveTo(this.x - this.width / 2, this.y);
            context.strokeStyle = '#333333';
            context.lineWidth = this.height;
            context.lineTo(this.x + this.width / 2, this.y);
            context.stroke();
        };
        return Border;
    }(GameObject_1.Rectangle));
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = Border;
});
//# sourceMappingURL=Border.js.map