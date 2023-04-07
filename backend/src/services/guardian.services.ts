import { prisma } from '../config/prismaInit';

export const createGuardianService = async (
  father: string,
  mother: string,
  other: string,
  studentId: string
) => {
  try {
    const newGuardian = await prisma.guardian.create({
      data: {
        father,
        mother,
        other,
        studentId,
      },
    });
    return newGuardian;
  } catch (error) {
    return error.message;
  }
};



export const updateGuardianService = async (
  father: string,
  mother: string,
  other: string,
  studentId: string
) => {
  try {
    const updateStudentGuardian = await prisma.guardian.update({
      where: {
        studentId,
      },
      data: {
        father,
        mother,
        other,
      },
    });
    return updateStudentGuardian;
  } catch (error) {
    return error.message;
  }
};