"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var tsyringe_1 = require("tsyringe");
var jsonwebtoken_1 = require("jsonwebtoken");
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var AppError_1 = __importDefault(require("@shared/errors/AppError"));
var UserService = /** @class */ (function () {
    function UserService(userRepository) {
        this.userRepository = userRepository;
    }
    UserService.prototype.create = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var emailExists, cpfExists;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userRepository.findByEmail(data.email)];
                    case 1:
                        emailExists = _a.sent();
                        if (emailExists)
                            throw new AppError_1.default('E-mail already belongs to another user!');
                        if (!data.cpf) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.userRepository.findByCpf(data.cpf)];
                    case 2:
                        cpfExists = _a.sent();
                        if (cpfExists)
                            throw new AppError_1.default('CPF already belongs to another user!');
                        _a.label = 3;
                    case 3:
                        data.password = bcryptjs_1.default.hashSync(data.password, 8);
                        return [4 /*yield*/, this.userRepository.create(data)];
                    case 4: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserService.prototype.get = function (user_id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userRepository.findOneOrFail(user_id)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserService.prototype.list = function (query) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userRepository.find(query)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserService.prototype.update = function (user_id, data) {
        return __awaiter(this, void 0, void 0, function () {
            var userExists, emailExists, cpfExists;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userRepository.findOneOrFail(user_id)];
                    case 1:
                        userExists = _a.sent();
                        if (!data.email) return [3 /*break*/, 3];
                        if (!(data.email !== userExists.email)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.userRepository.findByEmail(data.email)];
                    case 2:
                        emailExists = _a.sent();
                        if (emailExists)
                            throw new AppError_1.default('This email already belongs to another user!');
                        _a.label = 3;
                    case 3:
                        if (!data.cpf) return [3 /*break*/, 5];
                        if (!(data.cpf !== userExists.cpf)) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.userRepository.findByCpf(data.cpf)];
                    case 4:
                        cpfExists = _a.sent();
                        if (cpfExists)
                            throw new AppError_1.default('This cpf already belongs to another user!');
                        _a.label = 5;
                    case 5:
                        if (data.password) {
                            data.password = bcryptjs_1.default.hashSync(data.password, 8);
                        }
                        delete data.confirmPassword;
                        return [4 /*yield*/, this.userRepository.update(Object.assign({}, userExists, data))];
                    case 6: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserService.prototype.delete = function (user_id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userRepository.findOneOrFail(user_id)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.userRepository.delete(user_id)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserService.prototype.signIn = function (credentials) {
        return __awaiter(this, void 0, void 0, function () {
            var email, password, user, isCorrectPassword, token;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        email = credentials.email, password = credentials.password;
                        return [4 /*yield*/, this.userRepository.findByEmail(email)];
                    case 1:
                        user = _a.sent();
                        if (!user)
                            throw new AppError_1.default('Email or password is incorrect!');
                        isCorrectPassword = bcryptjs_1.default.compareSync(password, user.password);
                        if (!isCorrectPassword)
                            throw new AppError_1.default('Email or password is incorrect!');
                        token = jsonwebtoken_1.sign({ id: user.user_id }, "" + process.env.JWT_SECRET, {
                            expiresIn: 86400
                        });
                        return [2 /*return*/, { token: token }];
                }
            });
        });
    };
    UserService = __decorate([
        tsyringe_1.injectable(),
        __param(0, tsyringe_1.inject('UserRepository')),
        __metadata("design:paramtypes", [Object])
    ], UserService);
    return UserService;
}());
exports.default = UserService;
