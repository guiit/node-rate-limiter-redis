"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandling = void 0;
/* eslint-disable no-console */
var AppError_1 = __importDefault(require("@shared/errors/AppError"));
var celebrate_1 = require("celebrate");
var jsonwebtoken_1 = require("jsonwebtoken");
var typeorm_1 = require("typeorm");
function errorHandling(error, request, response, next) {
    console.error(error);
    if (error instanceof AppError_1.default) {
        return response
            .status(error.status)
            .json({ status: 'Client error', message: error.description });
    }
    else if (error instanceof typeorm_1.QueryFailedError) {
        return response.status(500).json({
            status: error.name,
            message: "Unexpected error: " + error.message
        });
    }
    else if (error instanceof jsonwebtoken_1.JsonWebTokenError) {
        return response.status(401).json({
            status: error.name,
            message: "Unexpected error: " + error.message
        });
    }
    else if (celebrate_1.isCelebrateError(error)) {
        next(error);
    }
    else {
        return response.status(500).json({
            status: 'Server error',
            message: 'Internal server error'
        });
    }
}
exports.errorHandling = errorHandling;
