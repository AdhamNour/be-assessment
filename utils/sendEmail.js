import nodemailer from 'nodemailer'

const sendEmail = (to, subject, content) => {
    console.log( process.env.EMAIL)
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

export const sendVerificationEmail = ( user, token) => {
    sendEmail(user.email, `Verification Code for ${user.name}`, `<h3>Hey there! </h3><br> 
    <p>click the following link to acctivate <a href=${process.env.BASE_LINK}/users/${user.id}/${token} >click me</a></p>`)
}