import { prisma } from '../src/config/prismaInit';
import { faker } from '@faker-js/faker';
import { hashedPassword } from '../src/helpers/bcryptConfig';
import { Role, classCategory, coreSubjects, electiveSubjects } from '@prisma/client';

const userMain = async () => {
  try {
    const deletedUsers = await prisma.user.deleteMany({});

    for (let i = 0; i < 100; i++) {
      const createRole = Math.floor(Math.random() * Object.keys(Role).length);
      const category = Math.floor(
        Math.random() * Object.keys(classCategory).length
      );
      await prisma.user.create({
        data: {
          fullname: faker.name.fullName(),
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
              location: faker.address.street(),
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

const studentScoresMain = async () => {
  try {
       const createCoreSub = Math.floor(Math.random() * Object.keys(coreSubjects).length);
       const createElectiveSub = Math.floor(Math.random() * Object.keys(electiveSubjects).length);
    await prisma.scores.deleteMany({});
    // find students from users and filter out their Id
    const findStudents = await prisma.user.findMany({
      where: {
        role: {
          equals: 'student',
        },
      },
    });

    findStudents.filter((student) => {
      return student.id;
    });

    // create students scores with the relevant info needed
    findStudents.forEach(async (student) => {
      await prisma.scores.create({
        data: {
          examScore: faker.datatype.float({ max: 100, precision: 0.1 }),
          testScore: faker.datatype.float({ max: 100, precision: 0.1 }),
          studentId: student.id,
          coreSub: coreSubjects[Object.keys(coreSubjects)[createCoreSub]],
          electiveSub: electiveSubjects[Object.keys(electiveSubjects)[createElectiveSub]],   
        },
      });
    });
  } catch (error: any) {
    return error;
  }
};

const announcementMain = async () => {
  try {
    await prisma.announcement.deleteMany({})

    const findSchool = await prisma.school.findMany({})

     const findAdmins = await prisma.user.findMany({
       where: {
         role: {
           equals: 'admin',
         },
       },
     });
     console.log(findAdmins.length);

     findAdmins.filter((admin) => {
      return admin.id
     })

     findAdmins.forEach(async (admin) => {
      let index=0
      await prisma.announcement.create({
        data:{
          message: faker.lorem.sentence(),
          adminId: admin.id,
          schoolId: findSchool[index].id
        }
      })
      index++
     })

  } catch (error) {
    return error
  }
}


const Main = async () => {
  try {
    await userMain();
    await studentScoresMain();
    await schoolMain();
    await announcementMain()
  } catch (error) {
    return error;
  }
};
Main();
