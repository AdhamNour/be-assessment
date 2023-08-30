import { DataTypes } from 'sequelize';
import { sequelize } from '../../utils/db.js';
export const CheckHttpHeader = sequelize.define('CheckHttpHeader', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4, primaryKey: true
    }, key: {
        type: DataTypes.STRING,
        allowNull: false
    },
    value: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: true,
    createdAt: false,
    updatedAt: false,
});