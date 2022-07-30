const nodeMailer = require('../config/nodemailer');

exports.newComment = (comment) => {
  let htmlString = nodeMailer.renderTemplate(
    { comment: comment },
    'comments/new_comment.ejs'
  );
  return nodeMailer.transporter.sendMail(
    {
      from: 'ranjanatul93@gmail.com',
      to: comment.user.email,
      subject: 'Comment published',
      // body: `Hey ${comment.user.name}, your comment is published.`,
      html: htmlString,
    },
    (err, info) => {
      if (err) {
        console.log(err);
        return;
      }
      // console.log('Message sent', info);
      return;
    }
  );
};
