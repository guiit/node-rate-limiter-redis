import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import UserController from '@modules/users/infra/http/controllers/UserController';

export default (router: Router): void => {
  const userRouter = Router();

  router.use('/users', userRouter);

  userRouter
    .route('/')
    .post(
      celebrate({
        [Segments.BODY]: {
          name: Joi.string().required(),
          phone: Joi.string(),
          cpf: Joi.string().length(14),
          email: Joi.string().email().required(),
          password: Joi.string().required().min(5).max(12),
          confirmPassword: Joi.valid(Joi.ref('password')).required(),
          is_active: Joi.boolean()
        }
      }),
      UserController.create
    )
    .get(
      celebrate({
        [Segments.QUERY]: {
          take: Joi.number().integer().positive(),
          skip: Joi.number().integer().positive()
        }
      }),
      UserController.list
    );

  userRouter.post(
    '/sign-in',
    celebrate({
      [Segments.BODY]: {
        email: Joi.string().email(),
        password: Joi.string().min(5).max(12)
      }
    }),
    UserController.signIn
  );

  userRouter
    .route('/:user_id')
    .put(
      celebrate({
        [Segments.PARAMS]: {
          user_id: Joi.string().uuid({ version: 'uuidv4' }).required()
        },
        [Segments.BODY]: Joi.object()
          .keys({
            name: Joi.string(),
            phone: Joi.string(),
            cpf: Joi.string().length(14),
            email: Joi.string().email(),
            password: Joi.string().min(5).max(12),
            confirmPassword: Joi.valid(Joi.ref('password')).when('password', {
              is: Joi.exist(),
              then: Joi.required()
            }),
            is_active: Joi.boolean()
          })
          .min(1)
      }),
      UserController.update
    )
    .delete(
      celebrate({
        [Segments.PARAMS]: {
          user_id: Joi.string().uuid({ version: 'uuidv4' }).required()
        }
      }),
      UserController.delete
    )
    .get(
      celebrate({
        [Segments.PARAMS]: {
          user_id: Joi.string().uuid({ version: 'uuidv4' }).required()
        }
      }),
      UserController.get
    );
};
