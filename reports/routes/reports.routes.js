import { Router } from 'express';

import { sequelize } from '../../utils/db.js';
import { report } from '../model/report.model.js'

export const reportRouter = Router();

reportRouter.get('/', async (req, res) => {
    const { user } = req;
    const checks = await user.getChecks({ raw: true,attributes:['url','port','name','protocol','id'] });
    let resultArray = []
    for (let index = 0; index < checks.length; index++) {
        const check = checks[index];
        let result = await report.findOne({
            attributes: [[sequelize.fn("SUM", sequelize.col("Status")), 'sumOfStatus'], [sequelize.fn("COUNT", sequelize.col("Status")), 'countOfStatus']],
            where: {
                CheckId: check.id
            },
            raw: true
        })
        const { sumOfStatus, countOfStatus } = result;
        let finalResult = { ...check, availability: sumOfStatus / countOfStatus };
        result = await report.findOne({
            attributes: [[sequelize.fn("COUNT", sequelize.col("Status")), 'countOfFailure']],
            where: {
                CheckId: check.id,
                status: 0
            },
            raw: true
        })
        const { countOfFailure } = result
        finalResult = { ...finalResult, outage: countOfFailure }
        
        result = await report.findOne({
            attributes: [ [sequelize.literal('Sum(finishTime-startTime)'), 'downtime']],
            where: {
                CheckId: check.id,
                status: 0
            },
            raw: true
        })
        //console.log(result);
        const { downtime } = result
        finalResult = { ...finalResult, downtime:downtime||0}
        result = await report.findOne({
            attributes: [ [sequelize.literal('Sum(finishTime-startTime)'), 'uptime']],
            where: {
                CheckId: check.id,
                status: 1
            },
            raw: true
        })
        //console.log(result);
        const { uptime } = result
        finalResult = { ...finalResult, uptime:uptime||0}
        result = await report.findOne({
            attributes: [ [sequelize.literal('avg(finishTime-startTime)'), 'avrg_response']],
            where: {
                CheckId: check.id,
                status: 1
            },
            raw: true
        })
        //console.log(result);
        const { avrg_response } = result
        finalResult = { ...finalResult, avrg_response:avrg_response||0}
        result = await report.findAll({
            where: {
                CheckId: check.id,
            },attributes:['startTime','finishTime','status'],
            raw: true
        })
        finalResult = { ...finalResult, history:result}
        resultArray = [...resultArray, finalResult];
    }
    res.json(resultArray)
});
