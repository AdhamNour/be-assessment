import { DataTypes } from 'sequelize';
import { sequelize } from '../../utils/db.js';
export const CheckAssertion = sequelize.define('assertion', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4, primaryKey: true
    }, statusCode: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    timestamps: true,
    createdAt: false,
    updatedAt: false,
});