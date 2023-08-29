import { Sequelize } from 'sequelize'

export const sequelize = new Sequelize({
    dialect:'mysql',
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_DATABASE_NAME,
    logging: process.env.DATABASE_LOGGING,
    host: process.env.DATABASE_HOST,
    logging: console.log,
})