import * as nodemailer from 'nodemailer';
import { User, School } from '@prisma/client';

export const newUserEmailService = async (email:string, newUser:User, password:string, token:unknown) => {
 try {
    const transporter = nodemailer.createTransport({
      host: process.env.NODEMAILER_HOST,
      port: (<unknown>process.env.NODEMAILER_PORT) as number,
      secure: true,
      auth: {
        user: process.env.SENDER_EMAIL,
        pass: process.env.GOOGLE_APP_PASSWORD,
      },
    });

    transporter.verify(function (error) {
      if (error) {
        console.log(error);
      } else {
        console.log('Server is ready to take our messages');
      }
    });

    const mailDetails = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: 'Confirmation of sign up',
      html: `<a href="http://localhost:3000/usersLogin/" + ${newUser.id} + '/' + ${token}>Your account has been created click this link to update your details</a>
                <p>This is your password <b>${password}</b> </p>
          `,
    };

  const sendUserMail = transporter.sendMail(mailDetails, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log('email sent successfully');
      }
    });
    return sendUserMail
 } catch (error) {
    return error.message
 }
};


export const resetUserPassEmailService = async(email:string, currentUser:User, token:unknown) => {
    try {
        const transporter = nodemailer.createTransport({
          host: process.env.NODEMAILER_HOST,
          port: (<unknown>process.env.NODEMAILER_PORT) as number,
          auth: {
            user: process.env.SENDER_EMAIL,
            pass: process.env.GOOGLE_APP_PASSWORD,
          },
        });

        transporter.verify(function (error, success) {
          if (error) {
            console.log(error);
          } else {
            console.log('Server is ready to take our messages');
          }
        });

        const mailDetails = {
          from: process.env.SENDER_EMAIL,
          to: email,
          subject: 'Password reset link',
          html: `<a href="/forgotPassword/" + ${currentUser.id} + '/' + ${token}>click this link to confirm password reset</a>`,
        };

        const resetPasswordMail = transporter.sendMail(mailDetails, (err) => {
          if (err) {
            console.log(err);
          } else {
            console.log('email sent successfully');
          }
        });
        return resetPasswordMail
    } catch (error) {
        return error.message
    }
}


export const resetSchoolPassService = async(email:string, currentSchool:School, token:unknown) => {
    try {
         const transporter = nodemailer.createTransport({
           host: process.env.NODEMAILER_HOST,
           port: (<unknown>process.env.NODEMAILER_PORT) as number,
           auth: {
             user: process.env.SENDER_EMAIL,
             pass: process.env.GOOGLE_APP_PASSWORD,
           },
         });

         transporter.verify(function (error, success) {
           if (error) {
             console.log(error);
           } else {
             console.log('Server is ready to take our messages');
           }
         });

         const mailDetails = {
           from: process.env.SENDER_EMAIL,
           to: email,
           subject: 'Password reset link',
           html: `<a href="http://localhost:3000/resetPassword" + ${currentSchool.id} + '/' + ${token}>click this link to confirm password reset</a>`,
         };

         const resetschoolPass = transporter.sendMail(mailDetails, (err) => {
           if (err) {
             console.log(err);
           } else {
             console.log('email sent successfully');
           }
         });
         return resetschoolPass

    } catch (error) {
        return error.message
    }
}