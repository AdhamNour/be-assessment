import { Router } from 'express'
import { firstNameExist } from '../controllers/signUpValidator.js';
import { emailExist } from '../controllers/signUpValidator.js';
import { passwordExist } from '../controllers/signUpValidator.js';
import { signup ,verify} from '../controllers/userController.js';
import { isEmailDublicate } from '../controllers/signUpValidator.js';

export const UserRouter = Router();

UserRouter.post('/signup', firstNameExist, emailExist, passwordExist, isEmailDublicate, signup);
UserRouter.get('/:id/:token',verify);


