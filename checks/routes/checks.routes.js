import { Router } from "express";

export const checksRouter = Router();

checksRouter.get('/', (req, res) => { res.send("this is get all routes"); });
checksRouter.post('/', (req, res) => { res.send("this is get all routes"); });

checksRouter.get('/:id', (req, res) => { res.send("this is id of target check " + req.params.id); });
checksRouter.put('/:id', (req, res) => { res.send("this is id of target check " + req.params.id); });
checksRouter.delete('/:id', (req, res) => { res.send("this is id of target check " + req.params.id); });

