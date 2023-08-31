import { DataTypes } from 'sequelize';
import { sequelize } from '../../utils/db.js';
export const CheckAuthentication = sequelize.define('authentication', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4, primaryKey: true
    }, username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    // don't forget to enable timestamps!
    timestamps: true,

    // I don't want createdAt
    createdAt: false,
    updatedAt: false,
});