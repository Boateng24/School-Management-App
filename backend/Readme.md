# School Management System

The server side code of a School Management System, a secured school-management web application developed primarily to facilitate the administration and management of schools.

To run the School Management Web App API locally,

clone this repo
``` zsh
git clone https://github.com/Boateng24/School-Management-Api.git
```

Go to the project directory and install dependencies
Make sure you are i the APISCHOOLMGT directory

``` zsh
cd apischoolmgt
cd src
npm install
```

You will need to add the following environment variables to your .env file

`PORT`

`DATABASE_URL`



Refer to [.env.sample](.env.sample) for example environment variables.

Run the development server

```zsh
npm run start
```

Open [http://localhost:5000](http://localhost:5000) with your browser to a message that the Server is listening at port 6000 and a database connection message DB connected successfully.


### DEFAULT COMMAND FOR THIS WEB APP
<!-- Database migration -->
npx prisma generate
npx prisma migrate dev

<!-- Build -->
npm run build

<!-- starting the server -->
npm run start

<!-- DB seed -->
npm run db_seed

<!-- view db in prisma gui -->
npm run studio

## Authors

This project was developed by **TUFFOUR**

- [Tuffour Boateng](https://github.com/tuffourboateng-amalitech)

## License



## END POINTS

To create a new user or sign up a user;
- sign up link [http://localhost:6000/api/v1/signup]
- login link [http://localhost:6000/api/v1/login]