import { Request, Response, NextFunction } from 'express';
import { prisma } from '../config/prismaInit';
import { userGuardian } from '../@types';

export const createGuardian = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { father, mother, other, studentId } = req.body as userGuardian;
    const studentGuardian = await prisma.guardian.create({
      data: {
        father,
        mother,
        other,
        studentId
      },
    });
    res.status(200).json({ studentGuardian, success: true });
  } catch (error) {
    next(error);
  }
};

export const updateGuardian = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { father, mother, other } = req.body as userGuardian;
    const guardianUpdate = await prisma.guardian.update({
      where: {
        studentId: req.params.id
      },
      data: {
        father,
        mother,
        other,
      },
    });
    res.status(200).json({ guardianUpdate, success: true });
  } catch (error) {
    next(error);
  }
};
