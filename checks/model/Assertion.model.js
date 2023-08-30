import { DataTypes } from 'sequelize';
import { sequelize } from '../../utils/db.js';
export const CheckAssertion = sequelize.define('CheckAssertion', {
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
    timestamps: true,
    createdAt: false,
    updatedAt: false,
});