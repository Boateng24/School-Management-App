import { prisma } from "../config/prismaInit";
export const userAddressService = async (userId:string, GPS:string, location:string, phoneNumber:string) => {
    try {
        const updateAddress = await prisma.userAddress.update({
          where: {
            userId
          },
          data: {
            GPS,
            location,
            phoneNumber,
          },
        });
        return updateAddress
    } catch (error) {
        return error.message
    }
}