import nodemailer from 'nodemailer'

const sendEmail = (to, subject, content) => {
    console.log(process.env.EMAIL)
    var transporter = nodemailer.createTransport({
        service: 'outlook365',
        secure: true,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD,
        },
    });
    var mailOptions = {
        from: process.env.EMAIL,
        to,
        subject,
        html: content,
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

export const sendVerificationEmail = (user, token) => {
    sendEmail(user.email, `Verification Code for ${user.name}`, `<h3>Hey there! </h3><br> 
    <p>click the following link to acctivate <a href=${process.env.BASE_LINK}/users/${user.id}/${token} >click me</a></p>`)
}
export const sendNotificationEmail = async (check) => {
    const [lastReport] = await check.getReports({
        order: [['createdAt', 'DESC']],
        limit: 1
    })
    const user = await check.getUser();
    console.log(user.toJSON());
    console.log(lastReport.toJSON());
    sendEmail(user.email, `${check.name} service is ${lastReport.status ? "Up" : "Down"} now`, `<h3>Hey there! </h3><br> 
    <p>
    Kindly be informed that ${check.name} service  that is located at ${check.protocol}://${check.url}:${check.port || "80"} is now ${lastReport.status ? "Up" : "Down"}
    </p>`)
}