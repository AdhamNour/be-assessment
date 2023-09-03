import { DataTypes } from 'sequelize';
import { sequelize } from '../../utils/db.js';
export const report =  sequelize.define('reports',{
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    startTime: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    finishTime: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    status:{
        type: DataTypes.BOOLEAN,
        allowNull:false
    }
})