"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authentication = void 0;
var jsonwebtoken_1 = require("jsonwebtoken");
var AppError_1 = __importDefault(require("@shared/errors/AppError"));
function authentication(request, response, next) {
    var bearerToken = request.header('Authorization');
    if (!bearerToken)
        throw new AppError_1.default('Access denied! It is required to have a token!');
    var secret = "" + process.env.JWT_SECRET;
    var token = bearerToken.replace('Bearer ', '');
    var isValidToken = jsonwebtoken_1.verify(token, secret);
    if (!isValidToken)
        throw new AppError_1.default('Invalid token!');
    var obj = jsonwebtoken_1.decode(token);
    if (obj) {
        request.user = {
            role: obj['role'],
            user_id: obj['user_id']
        };
    }
    next();
}
exports.authentication = authentication;
