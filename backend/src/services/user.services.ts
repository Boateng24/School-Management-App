import { prisma } from '../config/prismaInit';
import * as nodemailer from 'nodemailer';


export const registerErrorsService = async (email:string, password:string, confirmPassword:string) => {
    try {
        // check if user already exists
       const userExists = await prisma.user.findFirst({
         where: {
           email: email,
         },
       });

       if (userExists) {
         return { status: 409, message: 'User already exists' };
       }

       if (password !== confirmPassword) {
         return { status: 401, message: 'Password mismatch' };
       }
    } catch (error) {
        return error.message
    }
}


export const sendUserEmailService = async (email, newUser, password, token) => {
  const transporter = nodemailer.createTransport({
    host: process.env.NODEMAILER_HOST,
    port: Number(process.env.NODEMAILER_PORT),
    secure: true,
    auth: {
      user: process.env.SENDER_EMAIL,
      pass: process.env.GOOGLE_APP_PASSWORD,
    },
  });

  await transporter.verify();

  const mailDetails = {
    from: process.env.SENDER_EMAIL,
    to: email,
    subject: 'Confirmation of sign up',
    html: `<a href="http://localhost:3000/usersLogin/${newUser.id}/${token}">Your account has been created click this link to update your details</a>
           <p>This is your password <b>${password}</b> </p>
    `,
  };

  try {
    await transporter.sendMail(mailDetails);
    console.log('email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send email');
  }
}

export const findUserService = async(id:string) => {
  try {
    const fetchUser = await prisma.user.findFirst({
      where: {
        id
      },
      select: {
        fullname: true,
        email: true,
        stage: true,
        address: true,
        gender: true,
        profilePic: true,
        guardian: true,
        score: true,
        role: true,
      },
    });
    return fetchUser
  } catch (error) {
    return error.message
  }
}


export const fetchAllUsersService = async () => {
  try {
    const fetchUsers = await prisma.user.findMany({
          select:{
            id: true,
            fullname:true,
            email:true,
            role: true
          }
        })
        return fetchUsers
  } catch (error) {
    return error.message
  }
}

type UpdateType = {
  fullname:string,
  email:string, 
  age:number, 
  gender:string,
  profilePic:string
  id:string
}
export const updateUserService = async({id, fullname, email, age, gender, profilePic}: UpdateType) => {
  try {
    
    const userupdateService = await prisma.user.update({
      where: {
        id
      },
      data: {
        fullname,
        email,
        age,
        gender,
        profilePic,
      },
    });
    return userupdateService
  } catch (error) {
    return error.message
  }
}