import express from 'express';
import { sequelize } from './utils/db.js'
import dotenv from 'dotenv'


import { UserRouter } from './user/routes/user.route.js';
import {manageRelationship} from './utils/relationshipManagement.js';
import {checksRouter} from './checks/routes/checks.routes.js';
import {authorize} from './middleware/Authrize.js';

dotenv.config()


const app = express();
app.use(express.json());

app.use("/users",UserRouter)
app.use("/checks",authorize,checksRouter)

sequelize.authenticate().then(async () => {
    manageRelationship();
    await sequelize.sync();
    app.listen(3000, () => { console.log("App is Running") })
});