const nodemailer = require('../config/nodemailer');

exports.newComment = (comment) => {
    console.log('inside newComment mailer',comment);
    nodemailer.transporter.sendMail({
        from : 'thefarazkhan78699@gmail.com',
        to : comment.user.email,
        subject : "New Comment published!",
        html : '<h1>Yup your Comment is now published!</h1>'
    },(err,info)=>{
        if(err){
            console.log('Error in Sending mail',err);
            return;
        }
        console.log('Message sent',info);
        return;
    })
}