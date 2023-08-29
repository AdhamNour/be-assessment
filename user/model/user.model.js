import { DataTypes } from 'sequelize'
import { sequelize } from '../../utils/db.js'
//FIXME: DONT FORGET TO CHANGE PASSWORD TO HASH AND SALT
export const User = sequelize.define('User', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4, primaryKey: true
    }, name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false, unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    isVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    // don't forget to enable timestamps!
    timestamps: true,

    // I don't want createdAt
    createdAt: false,
    updatedAt: false,
});