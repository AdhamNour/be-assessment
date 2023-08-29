import express from 'express';
import { sequelize } from './utils/db.js'
import dotenv from 'dotenv'

import { User } from './user/model/user.model.js';
import { Token } from './user/model/token.model.js';
import { UserRouter } from './user/routes/user.route.js';

User.hasOne(Token);
Token.belongsTo(User);

dotenv.config();

const app = express();
app.use(express.json());

app.use("/users",UserRouter)

sequelize.authenticate().then(async () => {
    await sequelize.sync();
    app.listen(3000, () => { console.log("App is Running") })
}).catch(err => { console.log(err) });