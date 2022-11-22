import { prisma } from '../src/config/prismaInit';
import { faker } from '@faker-js/faker';
import { hashedPassword } from '../src/helpers/bcryptConfig';
import { Role, classCategory } from '@prisma/client';

const userMain = async () => {
  try {
    await prisma.user.deleteMany({});

    for (let i = 0; i < 100; i++) {
      const createRole = Math.floor(Math.random() * Object.keys(Role).length);
      const category = Math.floor(
        Math.random() * Object.keys(classCategory).length
      );
      await prisma.user.create({
        data: {
          firstname: faker.name.firstName(),
          email: faker.helpers.unique(faker.internet.email),
          password: await hashedPassword(faker.internet.password()),
          role: Role[Object.keys(Role)[createRole]],
          age: faker.datatype.number({ min: 3, max: 60 }),
          gender: faker.name.sex(),
          profilePic: faker.image.imageUrl(),
          address: {
            create: {
              phoneNumber: faker.phone.number(),
              GPS: faker.address.buildingNumber(),
              NearestLandMark: faker.address.street(),
            },
          },
          isPrefect: faker.datatype.boolean(),
          guardian: {
            create: {
              father: faker.name.fullName({ sex: 'male' }),
              mother: faker.name.fullName({ sex: 'female' }),
              other: faker.name.fullName(),
            },
          },
          stage: {
            create: {
              classType: classCategory[Object.keys(classCategory)[category]],
              teacher: faker.name.firstName(),
            },
          },
        },
      });
    }
  } catch (error: any) {
    return error;
  }
};

const schoolMain = async () => {
  try {
    await prisma.school.deleteMany({});
    for (let i = 0; i < 100; i++) {
      await prisma.school.create({
        data: {
          schoolName: faker.company.name(),
          email: faker.helpers.unique(faker.internet.email),
          password: await hashedPassword(faker.internet.password()),
          phoneNumber: faker.phone.number(),
          dateOfestablishment: (<unknown>faker.date.past()) as string,
          address: {
            create: {
              GPS: faker.address.buildingNumber(),
              POBox: faker.address.secondaryAddress(),
              location: faker.address.direction(),
              website: faker.internet.domainName(),
            },
          },
        },
      });
    }
  } catch (error: any) {
    return error;
  }
};

const Main = async () => {
  try {
    await userMain();
    await schoolMain();
  } catch (error) {
    return error;
  }
};
Main();
