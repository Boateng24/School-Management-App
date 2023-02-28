import express, {Application, Request, Response} from 'express';
import cluster from 'cluster';
import os from 'os';
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
import studentRouter from './routes/student.route';
import scoreRouter from './routes/score.route';
import guardianRouter from './routes/guardian.route';
import stageRouter from './routes/stage.route';
import addressRouter from './routes/address.route';
import announceRouter from './routes/announcement.route';



// Inititializing express app
const app:Application = express();


// OS number of cpu present
const numberCpu = os.cpus().length;

// Configuring our environmental variables
config()
const PORT = process.env.PORT_NUMBER

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
app.use('/api/v1', studentRouter)
app.use('/api/v1', scoreRouter)
app.use('/api/v1', guardianRouter)
app.use('/api/v1', stageRouter)
app.use('/api/v1', addressRouter)
app.use('/api/v1', announceRouter)


app.get('/', (req:Request, res:Response) => {
    res.send(`ok ${process.pid}`)
})

if(cluster.isPrimary){
    for(let i=0; i<numberCpu; i++){
        cluster.fork()
    }
    cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`)
        cluster.fork()
    })
}
else{
app.listen(PORT || 5000, () => {
  console.log(`Server ${process.pid} successfully listening on port ${PORT}`);
});
}


