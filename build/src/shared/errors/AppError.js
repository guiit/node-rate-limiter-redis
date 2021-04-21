"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AppError = /** @class */ (function () {
    function AppError(description, status) {
        if (status === void 0) { status = 400; }
        this.status = status;
        this.description = description;
    }
    return AppError;
}());
exports.default = AppError;
