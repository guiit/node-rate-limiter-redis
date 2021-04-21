"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var celebrate_1 = require("celebrate");
var UserController_1 = __importDefault(require("@modules/users/infra/http/controllers/UserController"));
exports.default = (function (router) {
    var _a, _b, _c, _d, _e, _f;
    var userRouter = express_1.Router();
    router.use('/users', userRouter);
    userRouter
        .route('/')
        .post(celebrate_1.celebrate((_a = {},
        _a[celebrate_1.Segments.BODY] = {
            name: celebrate_1.Joi.string().required(),
            phone: celebrate_1.Joi.string(),
            cpf: celebrate_1.Joi.string().length(14),
            email: celebrate_1.Joi.string().email().required(),
            password: celebrate_1.Joi.string().required().min(5).max(12),
            confirmPassword: celebrate_1.Joi.valid(celebrate_1.Joi.ref('password')).required(),
            is_active: celebrate_1.Joi.boolean()
        },
        _a)), UserController_1.default.create)
        .get(celebrate_1.celebrate((_b = {},
        _b[celebrate_1.Segments.QUERY] = {
            take: celebrate_1.Joi.number().integer().positive(),
            skip: celebrate_1.Joi.number().integer().positive()
        },
        _b)), UserController_1.default.list);
    userRouter.post('/sign-in', celebrate_1.celebrate((_c = {},
        _c[celebrate_1.Segments.BODY] = {
            email: celebrate_1.Joi.string().email(),
            password: celebrate_1.Joi.string().min(5).max(12)
        },
        _c)), UserController_1.default.signIn);
    userRouter
        .route('/:user_id')
        .put(celebrate_1.celebrate((_d = {},
        _d[celebrate_1.Segments.PARAMS] = {
            user_id: celebrate_1.Joi.string().uuid({ version: 'uuidv4' }).required()
        },
        _d[celebrate_1.Segments.BODY] = celebrate_1.Joi.object()
            .keys({
            name: celebrate_1.Joi.string(),
            phone: celebrate_1.Joi.string(),
            cpf: celebrate_1.Joi.string().length(14),
            email: celebrate_1.Joi.string().email(),
            password: celebrate_1.Joi.string().min(5).max(12),
            confirmPassword: celebrate_1.Joi.valid(celebrate_1.Joi.ref('password')).when('password', {
                is: celebrate_1.Joi.exist(),
                then: celebrate_1.Joi.required()
            }),
            is_active: celebrate_1.Joi.boolean()
        })
            .min(1),
        _d)), UserController_1.default.update)
        .delete(celebrate_1.celebrate((_e = {},
        _e[celebrate_1.Segments.PARAMS] = {
            user_id: celebrate_1.Joi.string().uuid({ version: 'uuidv4' }).required()
        },
        _e)), UserController_1.default.delete)
        .get(celebrate_1.celebrate((_f = {},
        _f[celebrate_1.Segments.PARAMS] = {
            user_id: celebrate_1.Joi.string().uuid({ version: 'uuidv4' }).required()
        },
        _f)), UserController_1.default.get);
});
