import { DataTypes } from 'sequelize'
import { sequelize } from '../../utils/db.js'
export const Token = sequelize.define('token', {
    user_id: {
        type: DataTypes.STRING,
        allowNull: false,primaryKey:true
    },
    token:{
        type:DataTypes.STRING,
        allowNull: false
    }
}, {


});