import { describe, it } from 'mocha';
import { expect } from 'chai';
import request from 'supertest';
import {app} from '../../src/index';
import cluster from 'cluster';
import os from 'os'
// import { config } from 'dotenv';
// import { Worker } from 'worker_threads';
// import express from 'express';
// import { prisma } from '../config/prismaInit';


// const userId = 'clf5r7z720000ufycmt4k3fdv';
// const baseUrl = 'http://localhost:5000/api/v1';
// 

// OS number of cpu present
// const numberCpu = os.cpus().length;

// // Configuring our environmental variables
// const PORT = process.env.PORT_NUM;

// Db connection configuration
// connection();
 


describe('Users api unit test', () => {
    
  it('returns a data for a specified user', () => {
     request('http://localhost:5000/api/v1')
      .get('/user/clf5r7z720000ufycmt4k3fdv')
      .then((res) => {
        expect(res.status).to.eq(200);
        expect(res.body.success).to.eql(true);
      });
  });
});


//  

// if (cluster.isWorker) {
//   if (cluster.worker && cluster.worker.id === 1) {
//     describe('API tests', () => {
//       it('returns a data for a specified user', () => {
//         request('http://localhost:5000/api/v1')
//           .get('/user/clf5r7z720000ufycmt4k3fdv')
//           .then((res) => {
//             expect(res.status).to.eq(200);
//             expect(res.body.success).to.eql(true);
//           });
//       });
//     });
//   }
// }






