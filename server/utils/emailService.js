const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SENDER_EMAIL,
    pass: process.env.SENDER_PASSWORD
  }
});

exports.sendDonationNotification = async (donorName, receiverEmail, postTitle, amount) => {
  try {
    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: receiverEmail,
      subject: `New Donation Received - ${postTitle}`,
      html: `
        <h2>Great News!</h2>
        <p>You received a donation for your cause: <strong>${postTitle}</strong></p>
        <p><strong>Donor:</strong> ${donorName}</p>
        <p><strong>Amount:</strong> $${amount}</p>
        <p>Thank you for using HelpingHands!</p>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log('Donation notification email sent');
  } catch (error) {
    console.log('Error sending email:', error);
  }
};

exports.sendWelcomeEmail = async (userName, userEmail) => {
  try {
    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: userEmail,
      subject: 'Welcome to HelpingHands',
      html: `
        <h2>Welcome to HelpingHands, ${userName}!</h2>
        <p>Thank you for joining our donation community.</p>
        <p>Whether you want to help others or receive support for your cause, we're here to help.</p>
        <p>Start exploring causes or create your own post today!</p>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log('Welcome email sent');
  } catch (error) {
    console.log('Error sending email:', error);
  }
};

exports.sendPasswordResetEmail = async (email, resetLink) => {
  try {
    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: 'Password Reset Request - HelpingHands',
      html: `
        <h2>Password Reset</h2>
        <p>Click the link below to reset your password:</p>
        <a href="${resetLink}">${resetLink}</a>
        <p>This link will expire in 30 minutes.</p>
        <p>If you didn't request this, please ignore this email.</p>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log('Password reset email sent');
  } catch (error) {
    console.log('Error sending email:', error);
  }
};

exports.sendContactReplyEmail = async (email, replyMessage) => {
  try {
    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: 'Reply to Your Contact Message - HelpingHands',
      html: `
        <h2>We've Received Your Message</h2>
        <p>Thank you for contacting HelpingHands!</p>
        <p><strong>Admin Reply:</strong></p>
        <p>${replyMessage}</p>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log('Contact reply email sent');
  } catch (error) {
    console.log('Error sending email:', error);
  }
};
