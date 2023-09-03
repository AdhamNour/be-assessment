import {DataTypes} from 'sequelize';
import {sequelize} from '../../utils/db.js';
export const Check = sequelize.define('Check', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    }, name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    protocol: {
        type: DataTypes.STRING,
        allowNull: false
    },
    port: {
        type: DataTypes.INTEGER,
    },
    webhook:{
        type: DataTypes.STRING,
    },
    path:{
        type: DataTypes.STRING,
    },
    timeout:{
        type: DataTypes.INTEGER,
        defaultValue:5
    },
    interval:{
        type:DataTypes.INTEGER,
        defaultValue:10
    },
    threshold:{
        type:DataTypes.INTEGER,
        defaultValue:1
    },
    tages:{
        type:DataTypes.STRING
    },
    ignoreSSL:{
        type:DataTypes.BOOLEAN,
        allowNull:false
    },httpHeaders:{
        type:DataTypes.STRING,allowNull:true
    }
}, {
    // don't forget to enable timestamps!
    timestamps: true,

    // I don't want createdAt
    createdAt: false,
    updatedAt: false,indexes:[
        {
            unique:true,
            fields:['url','UserId','port']
        }
    ]
});