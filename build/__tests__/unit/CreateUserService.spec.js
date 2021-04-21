"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
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
var AppError_1 = __importDefault(require("@shared/errors/AppError"));
var index_1 = require("../index");
var CreateUserService_1 = require("@modules/users/services/user/CreateUserService");
var UserRepository_1 = __importDefault(require("@modules/users/infra/typeorm/repositories/UserRepository"));
var userRepository, createUserService;
var userSchema = {
    name: 'any_name',
    password: 'any_password',
    confirmPassword: 'any_password',
    email: 'any_email@email.com',
    cpf: '501.841.201-99'
};
describe('Should validate create user service', function () {
    beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, index_1.connection.create()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    userRepository = new UserRepository_1.default();
                    createUserService = new CreateUserService_1.CreateUserService(userRepository);
                    return [4 /*yield*/, userRepository.create(userSchema)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    afterEach(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, index_1.connection.clear()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    afterAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, index_1.connection.close()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    test('Should throws if e-mail already exists', function () { return __awaiter(void 0, void 0, void 0, function () {
        var promise;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    promise = createUserService.execute(__assign({}, userSchema));
                    return [4 /*yield*/, expect(promise).rejects.toEqual(new AppError_1.default('E-mail already belongs to another user!'))];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    test('Should throws if cpf already exists', function () { return __awaiter(void 0, void 0, void 0, function () {
        var promise;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    promise = createUserService.execute(Object.assign({}, userSchema, { email: 'another_email' }));
                    return [4 /*yield*/, expect(promise).rejects.toEqual(new AppError_1.default('CPF already belongs to another user!'))];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    test('Should not call findByCpf method if cpf is not informed', function () { return __awaiter(void 0, void 0, void 0, function () {
        var findByCpfSpy, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    findByCpfSpy = jest.spyOn(userRepository, 'findByCpf');
                    data = Object.assign({}, userSchema, {
                        email: 'another_email',
                        cpf: undefined
                    });
                    return [4 /*yield*/, createUserService.execute(data)];
                case 1:
                    _a.sent();
                    expect(findByCpfSpy).not.toHaveBeenCalled();
                    return [2 /*return*/];
            }
        });
    }); });
    test('Should return user with correct values', function () { return __awaiter(void 0, void 0, void 0, function () {
        var createSpyOn, data, user, result, _a, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    createSpyOn = jest.spyOn(userRepository, 'create');
                    data = Object.assign({}, userSchema, {
                        email: 'another_email',
                        cpf: '12345678912345'
                    });
                    return [4 /*yield*/, createUserService.execute(data)];
                case 1:
                    user = _d.sent();
                    _b = (_a = Object).assign;
                    _c = [{}];
                    return [4 /*yield*/, createSpyOn.mock.results[0].value];
                case 2:
                    result = _b.apply(_a, _c.concat([_d.sent(), {
                            email: 'another_email',
                            cpf: '12345678912345',
                            name: 'any_name',
                            password: expect.anything()
                        }]));
                    expect(user).toEqual(result);
                    return [2 /*return*/];
            }
        });
    }); });
});
