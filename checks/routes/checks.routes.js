import { Router } from "express";
import {getAllChecks,createCheck,getCheckById,deleteCheck} from '../controller/checksController.js';
import {notNullValidator }from '../controller/checkValidator.js' 
import {authenticationValidator} from '../controller/checkValidator.js';
import {assertionValidator} from '../controller/checkValidator.js';

export const checksRouter = Router();

checksRouter.get('/', getAllChecks);
checksRouter.post('/',notNullValidator,authenticationValidator,assertionValidator,createCheck);

checksRouter.get('/:id', getCheckById);
checksRouter.put('/:id', (req, res) => { res.send("this is id of target check " + req.params.id); });
checksRouter.delete('/:id',deleteCheck);

