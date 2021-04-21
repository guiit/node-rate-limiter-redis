"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
require("shared/container");
var cors_1 = __importDefault(require("cors"));
var express_1 = __importDefault(require("express"));
var celebrate_1 = require("celebrate");
var middlewares_1 = require("@shared/infra/middlewares");
var routes_1 = __importDefault(require("@shared/infra/routes/routes"));
var app = express_1.default();
app.use(cors_1.default(), express_1.default.json(), middlewares_1.authExceptions(middlewares_1.authentication), middlewares_1.rateLimiter);
routes_1.default(app);
app.use(middlewares_1.errorHandling, celebrate_1.errors());
exports.default = app;
