import { prisma } from '../config/prismaInit';

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
       return
    } catch (error) {
        return error.message
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

export const deleteUserService = async(id) => {
  try {
    const userDeleteService = await prisma.user.delete({
      where:{
        id
      }
    })
    return userDeleteService
  } catch (error) {
    return error.message
  }
}