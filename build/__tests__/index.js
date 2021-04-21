"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connection = exports.app = exports.request = void 0;
require("dotenv/config");
var supertest_1 = __importDefault(require("supertest"));
exports.request = supertest_1.default;
var app_1 = __importDefault(require("@shared/infra/config/app"));
exports.app = app_1.default;
var connection_1 = __importDefault(require("./connection"));
exports.connection = connection_1.default;
