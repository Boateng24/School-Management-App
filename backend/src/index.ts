import express, {Application} from 'express';
import { config } from 'dotenv';
import cookieParser from 'cookie-parser';
import { credentials } from './middlewares/credentials';
import cors from 'cors'
import { corsOptions } from './helpers/corsOptions';
import connection from './config/dbConnection';
import helmet from 'helmet';
import authRouter from './routes/auth.route';
import userRouter from './routes/users.route';
import refreshRouter from './routes/refreshToken.route';
import schoolRouter from './routes/school.route';



// Inititializing express app
const app:Application = express();

// Configuring our environmental variables
config()
const PORT = process.env.PORT_NUM

// Db connection configuration
connection()


// Global middlewares
app.use(helmet())
app.use(credentials)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(cors(corsOptions))


// Routes
app.use('/api/v1', authRouter)
app.use('/api/v1', userRouter)
app.use('/api/v1', refreshRouter)
app.use('/api/v1', schoolRouter)


app.listen(PORT || 5000, () => {
    console.log(`Server successfully listening on port ${PORT}`)
})