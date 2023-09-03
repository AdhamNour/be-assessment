import cron from 'node-cron'
import axios from 'axios'
import { Check } from './checks/model/check.model.js';
import { sendNotificationEmail } from './utils/sendEmail.js';

export default cron.schedule('* * * * * *', async () => {
    const checks = await Check.findAll();
    checks.forEach(async check => {
        const start = Date.now();
        const [lastReport] = await check.getReports({
            order: [ [ 'createdAt', 'DESC' ]],
            limit:1
        })
        axios.get(`${check.protocol}://${check.url}:${check.port||""}`,{timeout:500}).then(async () => {
        try {
            await check.createReport({startTime:start,finishTime:Date.now(),status:true})
            if( lastReport.status==false){
                sendNotificationEmail(check);
                
            }
        } catch (error) {
            console.log(error)
        } 
    }).catch(async () => { 
        try {
                await check.createReport({startTime:start,finishTime:Date.now(),status:false})
                if( lastReport.status==true){
                    sendNotificationEmail(check);
                }
            } catch (error) {
                console.log(error)
            } 

         });
    })
});