"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authExceptions = void 0;
function authExceptions(auth) {
    return function (request, response, next) {
        var signInEndPoint = request.path === '/users/sign-in' && request.method === 'POST';
        if (signInEndPoint) {
            next();
        }
        else {
            auth(request, response, next);
        }
    };
}
exports.authExceptions = authExceptions;
